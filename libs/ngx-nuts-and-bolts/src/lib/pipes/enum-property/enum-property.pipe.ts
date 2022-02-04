import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'enumProperty',
})
export class EnumPropertyPipe<TEnum extends string, TEnumDataObject extends Record<string, TReturnValue>, TReturnValue>
	implements PipeTransform
{
	public transform(
		value: TEnum,
		enumData: Record<TEnum, TEnumDataObject>,
		key: keyof TEnumDataObject = 'translationKey',
		showWarning = true
	): TReturnValue | TEnum | null {
		if (enumData[value]?.[key] === undefined) {
			if (showWarning) {
				console.warn(`No property for key "${key}" for enum value "${value}" `, enumData);
			}
			return null;
		}
		return enumData[value][key];
	}
}
