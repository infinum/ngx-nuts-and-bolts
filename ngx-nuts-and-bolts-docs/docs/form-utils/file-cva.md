---
id: file-cva
title: File Control Value Accessor
sidebar_label: File Control Value Accessor
---

## 1. Features

Out-of-the-box, if you want to bind a file input element to an Angular form control, the value of the Angular form control will be the a "fake path" to the file (e.g. `C:\\fakepath\\some-image.png`) and it does not work at all if you select multiple files (the value will be a "fake path" of just one of the files).

This is not very useful and you often have to write custom code to read [`HTMLInputElement` `files` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files) property directly, which gives you access to the [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList).

That is why we have implemented a [Control Value Accessor](https://angular.dev/api/forms/ControlValueAccessor) for `input[type="file"]` elements. It makes the value of the bound Angular Form Control the same value as the [`HTMLInputElement` `files` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/files), which is [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList).

## 2. Usage

First, define your FormControl and expect the value to be `FileList | null`:

<!-- prettier-ignore-start -->
```ts
class MyComponent {
  protected readonly allowedExtensions = [
    '.jpg',
    '.png',
    '.xlsx',
    '.csv'
  ];

  protected readonly fileFormControl = new FormControl<FileList | null>(
    null,
    [
      Validators.required,
      fileExtensionValidator(this.allowedExtensions),
    ]
  );
}
```
<!-- prettier-ignore-end -->

:::tip
Use of `fileExtensionValidator` is optional and the validator works even if the File CVA directive is not used, but it is recommended to use them in conjunction.
:::

Next, Make sure to import `FileControlValueAccessorDirective` in your component or module where you want to use the File CVA. You can then bind the form control to the `input[type="file"]` element:

<!-- prettier-ignore-start -->
```html
<input
  type="file"
  [formControl]="fileFormControl"
  [accept]="allowedExtensions"
  [multiple]="true"
/>
```
<!-- prettier-ignore-end -->

:::tip
Remember to set the `accept` attribute to the allowed file extensions so that the file picker only shows files with the allowed extensions.

Accepted values are `Array<string>` and `string`. For example, `'.jpg,.png'` or `['.jpg', '.png']`.

This makes it easy to re-use the same list of allowed extensions in both the `accept` attribute and the `fileExtensionValidator`.
:::

If no file is selected, the value of the form control will be `null`. If some file(s) are selected, the value of the form control will be a `FileList` object. No matter if `multiple` is set to `true` or `false`, the value of the form control will always be `FileList`, with one or more files in the `FileList`.

See storybook for the full example.

## 3. Unit testing quirks

If using `jest`, you might have issues unit testing components that use this directive. This is because `jest` does not run the tests inside a real browser, it uses `jsdom` instead.

`jsdom` does not support the `DataTransfer` API, which makes it impossible to mock the selection of files for the input element. It is also not possible to create an instance of `FileList` in order to assign it as file input element's value.

Currently, we are not aware of any easy workarounds, but will update this documentation if/when we do.

This is not a concern if using Karma, Web Test Runner or other browser-based test runners.

Unit tests in this repo have been manually checked in a Karma+Jasmine environment and are passing.
