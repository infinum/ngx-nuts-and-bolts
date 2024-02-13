import { AbstractControl } from '@angular/forms';

export type RawFormValue<T extends AbstractControl> = ReturnType<T['getRawValue']>;
