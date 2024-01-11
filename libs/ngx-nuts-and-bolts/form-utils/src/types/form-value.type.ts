import { AbstractControl } from '@angular/forms';

export type FormValue<T extends AbstractControl> = T['value'];
