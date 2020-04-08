import { FormControl } from '@angular/forms';

export default function dateValidator(formControl: FormControl): { [key: string]: any } | null {
  return formControl.value && isNaN(formControl.value.getTime()) ? { invalid: true } : null;
}
