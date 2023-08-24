import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const FADE_DEFAULT_DURATION = 250;
export const FADE_DEFAULT_TRIGGER_NAME = 'fade';

const hiddenStyle = style({
	opacity: 0,
});

const visibleStyle = style({
	opacity: 1,
});

interface IFadeAnimationOptions {
	duration: number;
	triggerName: string;
}

export function fadeAnimation(
	options: IFadeAnimationOptions = {
		duration: FADE_DEFAULT_DURATION,
		triggerName: FADE_DEFAULT_TRIGGER_NAME,
	}
): AnimationTriggerMetadata {
	return trigger(options.triggerName, [
		transition(':enter', [hiddenStyle, animate(`${options.duration}ms ease-in-out`, visibleStyle)]),
		transition(':leave', [visibleStyle, animate(`${options.duration}ms ease-in-out`, hiddenStyle)]),
	]);
}
