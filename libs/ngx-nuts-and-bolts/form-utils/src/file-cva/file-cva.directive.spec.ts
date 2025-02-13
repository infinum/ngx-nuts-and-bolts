import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FileControlValueAccessorDirective } from './file-cva.directive';
import { FileExtension, fileExtensionValidator } from './file-extension-validator';

@Component({
	selector: 'inf-file-cva-host',
	template: `
		<input
			#directive="fileControlValueAccessor"
			type="file"
			[formControl]="formControl"
			[accept]="accept"
			[multiple]="multiple"
		/>
	`,
	standalone: true,
	imports: [ReactiveFormsModule, FileControlValueAccessorDirective],
})
class FileCvaHostComponent {
	private readonly fileTypes: Array<FileExtension> = ['.xlsx', '.xls', '.csv'];
	public readonly accept = this.fileTypes.map((ext) => `.${ext}`).join(',');
	public readonly formControl = new UntypedFormControl(null, fileExtensionValidator(this.fileTypes));
	public multiple = true;

	@ViewChild('directive', { static: true })
	public directive!: FileControlValueAccessorDirective;
}

/*
  TODO: these tests have been verified to be working ok in Karma + Jasmine.
  However, they do not work with jest, as jest doesn't execute tests in a real browser
  and instead uses jsdom, which does not support the DataTransfer API.

  I tried working around it and creating a FileList object manually, but there
  are a couple of issues with that as well, so I am leaving these tests for now:
  - can not do new FileList(); fileList[0]=file1; fileList[1]=file2;
  - can not do FileList.from([file1, file2])
  - if you just pass a plain array to inputElement.files, you get a runtime TypeError
  because it expects an instance of FileList.

  Hopefully we migrate to Web Test Runner + Jasmine soon, which should make these tests work.
*/
xdescribe('FileControlValueAccessorDirective', () => {
	let fixture: ComponentFixture<FileCvaHostComponent>;
	let hostComponent: FileCvaHostComponent;
	let directive: FileControlValueAccessorDirective;
	let inputElement: HTMLInputElement;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [FileCvaHostComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(FileCvaHostComponent);
		hostComponent = fixture.componentInstance;
		fixture.detectChanges();

		directive = hostComponent.directive;
		inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
	});

	it('should create an instance', () => {
		expect(hostComponent).toBeTruthy();
		expect(inputElement).toBeTruthy();
		expect(directive).toBeTruthy();
	});

	it('should set form control value on file change', () => {
		expect(hostComponent.formControl.value).toBe(null);

		const file1 = new File([], 'test1.xlsx');
		const file2 = new File([], 'test2.xlsx');
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file1);
		dataTransfer.items.add(file2);

		inputElement.files = dataTransfer.files;
		inputElement.dispatchEvent(new Event('change'));

		expect(hostComponent.formControl.value).toBeInstanceOf(FileList);
		const fileList = hostComponent.formControl.value as FileList;
		expect(fileList.length).toBe(2);
		expect(fileList[0]).toBe(file1);
		expect(fileList[1]).toBe(file2);
	});

	it('should disable the input element when the form control is disabled', () => {
		expect(inputElement.disabled).toBe(false);

		hostComponent.formControl.disable();
		fixture.detectChanges();

		expect(inputElement.disabled).toBe(true);
	});

	it('should work with single file', () => {
		hostComponent.multiple = false;
		fixture.detectChanges();

		expect(hostComponent.formControl.value).toBe(null);

		const file1 = new File([], 'test1.xlsx');
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file1);

		inputElement.files = dataTransfer.files;
		inputElement.dispatchEvent(new Event('change'));

		expect(hostComponent.formControl.value).toBeInstanceOf(FileList);
		const fileList = hostComponent.formControl.value as FileList;
		expect(fileList.length).toBe(1);
		expect(fileList[0]).toBe(file1);
	});

	it('should validate file extension and list any failing files', () => {
		hostComponent.multiple = false;
		fixture.detectChanges();

		expect(hostComponent.formControl.errors).toBe(null);

		const file1 = new File([], 'test1.xlsx');
		const file2 = new File([], 'test2.jpg');
		const file3 = new File([], 'test3.csv');
		const file4 = new File([], 'test4.mp4');
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file1);
		dataTransfer.items.add(file2);
		dataTransfer.items.add(file3);
		dataTransfer.items.add(file4);

		inputElement.files = dataTransfer.files;
		inputElement.dispatchEvent(new Event('change'));

		expect(hostComponent.formControl.errors).toEqual({
			fileExtension: {
				acceptedExtensions: ['xlsx', 'xls', 'csv'],
				failingFiles: ['test2.jpg', 'test4.mp4'],
			},
		});
	});

	it('should validate file extension and pass if all files are valid', () => {
		hostComponent.multiple = false;
		fixture.detectChanges();

		expect(hostComponent.formControl.errors).toBe(null);

		const file1 = new File([], 'test1.xlsx');
		const file3 = new File([], 'test3.csv');
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file1);
		dataTransfer.items.add(file3);

		inputElement.files = dataTransfer.files;
		inputElement.dispatchEvent(new Event('change'));

		expect(hostComponent.formControl.errors).toEqual(null);
	});

	it('should catch files that have no extension', () => {
		hostComponent.multiple = false;
		fixture.detectChanges();

		expect(hostComponent.formControl.errors).toBe(null);

		const file1 = new File([], 'test1.xlsx');
		const file3 = new File([], 'test3');
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file1);
		dataTransfer.items.add(file3);

		inputElement.files = dataTransfer.files;
		inputElement.dispatchEvent(new Event('change'));

		expect(hostComponent.formControl.errors).toEqual({
			fileExtension: {
				acceptedExtensions: ['xlsx', 'xls', 'csv'],
				failingFiles: ['test3'],
			},
		});
	});
});
