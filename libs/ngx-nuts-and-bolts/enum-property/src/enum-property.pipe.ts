import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'enumProperty',
	standalone: true,
})
export class EnumPropertyPipe<
	TEnum extends string,
	TEnumDataObject extends Record<string, unknown>,
	TKey extends keyof TEnumDataObject
> implements PipeTransform
{
	public transform(
		value: TEnum,
		enumData: Record<TEnum, TEnumDataObject>,
		key: TKey = 'translationKey' as TKey,
		showWarning = true
	) {
		try {
			return getEnumPropertyValue(value, enumData, key);
		} catch (e) {
			if (showWarning) {
				console.warn(e);
			}
			return null;
		}
	}
}

export function getEnumPropertyValue<
	TEnum extends string,
	TEnumDataObject extends Record<string, unknown>,
	TKey extends keyof TEnumDataObject
>(value: TEnum, enumData: Record<TEnum, TEnumDataObject>, key: TKey = 'translationKey' as TKey) {
	if (enumData[value]?.[key] === undefined) {
		throw new Error(`No property for key "${String(key)}" for enum value "${value}" `);
	}

	return enumData[value][key];
}
