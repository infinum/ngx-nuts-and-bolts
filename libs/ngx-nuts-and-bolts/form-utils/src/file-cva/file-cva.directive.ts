import { Directive, ElementRef, forwardRef, HostBinding, HostListener, inject, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type ChangeFn = (value: FileList | null) => void;
type TouchFn = () => void;

@Directive({
	// eslint-disable-next-line @angular-eslint/directive-selector
	selector: 'input[type="file"]',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => FileControlValueAccessorDirective),
			multi: true,
		},
	],
	exportAs: 'fileControlValueAccessor',
	standalone: true,
})
export class FileControlValueAccessorDirective implements ControlValueAccessor {
	public readonly hostInputElement = inject<ElementRef<HTMLInputElement>>(ElementRef);

	@Input()
	public set accept(accept: Array<string> | string | null | undefined) {
		if (!accept) {
			this.hostInputElement.nativeElement.removeAttribute('accept');
		} else if (typeof accept === 'string') {
			this.hostInputElement.nativeElement.setAttribute('accept', accept);
		} else {
			this.hostInputElement.nativeElement.setAttribute('accept', accept.join(','));
		}
	}

	@HostBinding('disabled') public isDisabled = false;

	private touched = false;
	private changeHandler?: ChangeFn;
	private touchHandler?: TouchFn;

	@HostListener('change', ['$event.target.files'])
	public onFileChange(files: FileList | null): void {
		if (!this.touched) {
			this.touched = true;
			this.touchHandler?.();
		}

		this.changeHandler?.(files);
	}

	public writeValue(file: File | null): void {
		if (!file) {
			this.hostInputElement.nativeElement.value = '';
			return;
		}

		// TODO: what to do when the file is set programatically?
	}

	public registerOnChange(fn: ChangeFn): void {
		this.changeHandler = fn;
	}

	public registerOnTouched(fn: TouchFn): void {
		this.touchHandler = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}
}
