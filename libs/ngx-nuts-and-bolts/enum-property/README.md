# @infinum/ngx-nuts-and-bolts/enum-property

Secondary entry point of `@infinum/ngx-nuts-and-bolts`. It can be used by importing from `@infinum/ngx-nuts-and-bolts/enum-property`.

## 1. Features

Common practice of working with enums often runs into a need to define separate metadata for each value of a given enum type. See [Infinum Handbook - Enumerations](https://infinum.com/handbook/frontend/angular/angular-guidelines-and-best-practices/file-and-module-organization-and-naming#enumerations)

`enumProperty` pipe gives you an easy way to access given enum's value metadata in the template.

## 2. Usage

```ts
export enum Directions {
	NORTH,
	EAST,
	SOUTH,
	WEST,
}

export interface ITranslatableEnum {
	translationKey: string;
}

export const directionsData: Record<Directions, ITranslatableEnum> = {
	[Directions.NORTH]: {
		translationKey: 'directions.north',
	},
	[Directions.EAST]: {
		translationKey: 'directions.east',
	},
	[Directions.SOUTH]: {
		translationKey: 'directions.south',
	},
	[Directions.WEST]: {
		translationKey: 'directions.west',
	},
};
```

You can bring both of these into a component and use them together as such:

```ts
@Component({
	selector: 'app-example',
	template: ` {{ enumValue | enumProperty : directionsData }} `,
})
export class ExampleComponent {
	public enumValue = Directions.NORTH;
	// store reference to metadata so that its accessible from a template
	public directionsData = directionsData;
}
```

By default `enumProperty` looks for `translationKey` on the metadata object (in this example `directionsData`), but takes an argument allowing you to look for different key.

```ts
@Component({
	selector: 'app-example',
	template: ` {{ enumValue | enumProperty : directionsData : 'differentKey' }} `,
})
export class ExampleComponent {
	public enumValue = Directions.NORTH;
	// store reference to metadata so that its accessible from a template
	public directionsData = directionsData;
}
```

Here, since `directionsData` doesn't have `differentKey` property for any of the enum values, `undefined` would be returned.

If the need for fetching translation keys in the .ts files arises `getTranslationKey()` function is at your disposal, result of which you can pass into transloco service to get the actual translated value for passed in translation key. With this approach we are avoiding need for instantiating `EnumPropertyPipe` class and accessing the `transform` method.

```ts
import { getTranslationKey } from '@infinum/ngx-nuts-and-bolts';

@Component({
	selector: 'app-example',
	template: ``,
})
export class ExampleComponent {
	public enumValue = Directions.NORTH;
	public directionsData = directionsData;

	private readonly transloco = inject(TranslocoService);

	private translationDemoMethod(): void {
		const translationKey = getTranslationKey(Directions.NORTH, directionsData);
		const translation = this.transloco.translate(translationKey as string);
	}
}
```
