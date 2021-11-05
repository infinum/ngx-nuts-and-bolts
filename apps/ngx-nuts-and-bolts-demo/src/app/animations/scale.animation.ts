import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

export const SCALE_DEFAULT_DURATION = 400;
export const SCALE_DEFAULT_TRIGGER_NAME = 'scale';

const scale0Style = style({
	transform: 'scale(0)',
});

const size0Style = style({
	width: 0,
	height: 0,
});

const scale1Style = style({
	transform: 'scale(1)',
});

const sizeAutoStyle = style({
	width: '*',
	height: '*',
});

interface IScaleAnimationOptions {
	duration: number;
	triggerName: string;
}

export function scaleAnimation(
	options: IScaleAnimationOptions = {
		duration: SCALE_DEFAULT_DURATION,
		triggerName: SCALE_DEFAULT_TRIGGER_NAME,
	}
): AnimationTriggerMetadata {
	return trigger(options.triggerName, [
		transition(':enter', [
			size0Style,
			scale0Style,
			animate(`${options.duration / 2}ms ease-in`, sizeAutoStyle),
			animate(`${options.duration / 2}ms ease-in`, scale1Style),
		]),
		transition(':leave', [
			sizeAutoStyle,
			scale1Style,
			animate(`${options.duration / 2}ms ease-in-out`, scale0Style),
			animate(`${options.duration / 2}ms ease-in-out`, size0Style),
		]),
	]);
}
