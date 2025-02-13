import { Injectable, NgZone, OnDestroy, Signal, WritableSignal, computed, inject, signal } from '@angular/core';

@Injectable()
export class ResizeObserverService implements OnDestroy {
	readonly #resizeObserver = this.#createResizeObserver();
	readonly #overflowSignalsStore = new WeakMap<Element, WritableSignal<boolean>>();
	readonly #zone = inject(NgZone);

	public register(element: Element): Signal<boolean> {
		let $isOverflowing = this.#overflowSignalsStore.get(element);

		if (!$isOverflowing) {
			$isOverflowing = signal(false);
			this.#overflowSignalsStore.set(element, $isOverflowing);
		}

		this.#resizeObserver.observe(element);

		return $isOverflowing;
	}

	public unregister(element: Element): void {
		if (!this.#overflowSignalsStore.has(element)) {
			return;
		}

		this.#overflowSignalsStore.delete(element);
		this.#resizeObserver.unobserve(element);
		this.#overflowSignalsStore.delete(element);
	}

	public isOverflowing(element: Element): Signal<boolean> {
		return this.#overflowSignalsStore.get(element) ?? computed(() => false);
	}

	public ngOnDestroy(): void {
		this.#resizeObserver.disconnect();
	}

	#createResizeObserver(): ResizeObserver {
		return new ResizeObserver((entries) => {
			for (const entry of entries) {
				const element = entry.target;
				const $isOverflowing = this.#overflowSignalsStore.get(element);

				if (!$isOverflowing) {
					continue;
				}

				// Resize observer is not running inside of Angular zone by default.
				// Even though we set the signal value, it's not picked up by CD
				// inside components.
				// That's why we need to explicitly run within Angular zone.
				this.#zone.run(() => {
					// This check is not ideal. There are some alternatives that are a bit more hacky but they also have
					// some edge cases where they don't work correctly, so I am sticking with this "simple" check.
					// See https://github.com/w3c/csswg-drafts/issues/4123 for more details.
					$isOverflowing.set(element.scrollWidth > element.clientWidth);
				});
			}
		});
	}
}
