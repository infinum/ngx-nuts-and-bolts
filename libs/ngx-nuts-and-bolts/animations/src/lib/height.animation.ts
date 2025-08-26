import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

export const HEIGHT_DEFAULT_DURATION = 250;
export const HEIGHT_DEFAULT_TRIGGER_NAME = 'height';

const hiddenStyle = style({
	height: 0,
	'padding-top': 0,
	'padding-bottom': 0,
	'margin-top': 0,
	'margin-bottom': 0,
});

const visibleStyle = style({
	height: '*',
	'padding-top': '*',
	'padding-bottom': '*',
	'margin-top': '*',
	'margin-bottom': '*',
});

type FadeHeightAnimationOptions = {
	duration: number;
	triggerName: string;
};

export function heightAnimation(
	options: FadeHeightAnimationOptions = {
		duration: HEIGHT_DEFAULT_DURATION,
		triggerName: HEIGHT_DEFAULT_TRIGGER_NAME,
	}
): AnimationTriggerMetadata {
	return trigger(options.triggerName, [
		state('true', visibleStyle),
		state('false', hiddenStyle),
		transition('true => false', [animate(`${options.duration}ms ease-in-out`)]),
		transition(':enter', [hiddenStyle, animate(`${options.duration}ms ease-in-out`), visibleStyle]),
		transition(':leave', [visibleStyle, animate(`${options.duration}ms ease-in-out`, hiddenStyle)]),
	]);
}
