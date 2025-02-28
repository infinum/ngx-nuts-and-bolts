import { AbstractControl, ValidationErrors } from '@angular/forms';

export type FileExtension = `.${string}`;

/**
 *
 * @param allowedExtensions Array of allowed file extensions. Include the dot in the extension. Example: ['.jpg', '.png']
 * @returns A validator function that checks if the file extension of the files in the control value is in the allowedExtensions array.
 *
 * @example
 * Example of how the error object value looks like:
 * ```js
 * {
 *   fileExtension: {
 *     allowedExtensions: ['.jpg', '.png'],
 *     failingFileNames: ['file1.txt', 'file2.pdf']
 *   }
 * }
 * ```
 */
export function fileExtensionValidator(
	allowedExtensions: Array<FileExtension>
): (control: AbstractControl) => ValidationErrors | null {
	return (control: AbstractControl) => {
		if (!allowedExtensions.length) {
			console.warn(
				'fileExtensionValidator is being used with an empty array of allowed extensions. The validator will always pass. Please provide an array of allowed extensions or remove the validator.'
			);
			return null;
		}

		const files = control.value as unknown;

		if (!files) {
			return null;
		}

		let allFileNames: Array<string> = [];

		if (files instanceof FileList) {
			allFileNames = Array.from(files).map((file) => file.name);
		} else {
			console.warn(
				'fileExtensionValidator is being used with a non-FileList value. The validator will not work correctly if multiple files are selected. Please use the FileControlValueAccessorDirective to ensure correct validation in all cases.'
			);

			if (typeof files === 'string') {
				allFileNames = [files];
			}
		}

		const failingFileNames: Array<string> = [];

		for (const fileName of allFileNames) {
			const fileExtension = fileName.split('.').pop();

			if (!fileExtension) {
				failingFileNames.push(fileName);
				continue;
			}

			if (!allowedExtensions.includes(`.${fileExtension}`)) {
				failingFileNames.push(fileName);
			}
		}

		if (!failingFileNames.length) {
			return null;
		}

		return {
			fileExtension: {
				allowedExtensions,
				failingFileNames,
			},
		};
	};
}
