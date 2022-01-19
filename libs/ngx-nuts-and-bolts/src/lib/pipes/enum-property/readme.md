# Enum property pipe

Common practice of working with enums often runs into a need to define separate metadata for each value of a given enum type. See [Infinum Handbook - Enumerations](https://infinum.com/handbook/frontend/angular/angular-guidelines-and-best-practices/file-and-module-organization-and-naming#enumerations)

## 1. Features

`enumProperty` pipe gives you an easy way to access given enum's value metadata in template.

## 2. Usage

Asssuming that you keep your enum definitions somewhat similar to what is defined in handbook like so:

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
	template: ` {{ enumValue | enumProperty: directionsData }} `,
})
export class ExampleComponent {
	public enumValue = Directions.NORTH;
	// store reference to metadata so that its accessible from a template
	public directionsData = directionsData;
}
```

By convention `enumProperty` looks for `translationKey` on the metadata object (in this example `directionsData`), but takes an argument allowing you to look for different key.

```ts
@Component({
	selector: 'app-example',
	template: ` {{ enumValue | enumProperty: directionsData:'differentKey' }} `,
})
export class ExampleComponent {
	public enumValue = Directions.NORTH;
	// store reference to metadata so that its accessible from a template
	public directionsData = directionsData;
}
```

Here, since `directionsData` doesn't have `differentKey` property for any of the enum values, `undefined` would be returned.
