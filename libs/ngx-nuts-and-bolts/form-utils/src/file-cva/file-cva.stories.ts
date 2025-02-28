import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Meta, StoryObj } from '@storybook/angular';
import { Subscription } from 'rxjs';
import { FileControlValueAccessorDirective } from './file-cva.directive';
import { FileExtension, fileExtensionValidator } from './file-extension-validator';

@Component({
	selector: 'inf-file-cva-context',
	standalone: true,
	imports: [CommonModule, FileControlValueAccessorDirective, ReactiveFormsModule],
	template: `
		<ng-container *ngIf="formControl">
			<p>
				Try selecting some files and see the form control value change. Check console log, as FileList does not
				stringify very nice so it's not rendered too well in the template
			</p>
			<p>
				You can also try changing the accepted file extensions and see the custom form validator at work (try forcing
				the OS file picker to select some file that is not in the accepted list)
			</p>
			<input type="file" [formControl]="formControl" [accept]="allowedExtensions" [multiple]="true" />
			<hr />
			Value:
			<pre>{{ formControl.value | json }}</pre>
			<hr />
			Errors:
			<pre>{{ formControl.errors | json }}</pre>
		</ng-container>
	`,
})
class FileCvaContextComponent implements OnChanges {
	@Input() public allowedExtensions: Array<FileExtension> | null = null;
	public formControl: FormControl<FileList | null> | null = null;
	private valueChangesSubscription?: Subscription;

	public ngOnChanges(): void {
		this.formControl = new FormControl<FileList | null>(null, [
			// eslint-disable-next-line @typescript-eslint/unbound-method
			Validators.required,
			fileExtensionValidator(this.allowedExtensions ?? []),
		]);

		this.valueChangesSubscription?.unsubscribe();
		this.valueChangesSubscription = this.formControl.valueChanges.subscribe(console.log);
	}
}

export default {
	title: 'File Control Value Accessor',
	component: FileCvaContextComponent,
} as Meta;

export const FileControlValueAccessor: StoryObj<FileCvaContextComponent> = {
	args: {
		allowedExtensions: ['.jpg', '.png', '.xlsx', '.csv'],
	},
};
