import { inject, Injectable } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators
} from '@angular/forms';
type optForm = { validators?: ValidatorFn[]; disabled?: boolean };
@Injectable()
export class BaseFormService {
  isSubmit=false
  #fb = inject(FormBuilder);
  formGroup = this.#fb.group({});
  addControl(key: string, value: any, opt: optForm) {
    this.formGroup.addControl(
      key,
      new FormControl(
        { value: value, disabled: !!opt.disabled },
        { validators: opt.validators ?? null }
      )
    );
  }
  removeControl(key: string) {
    this.formGroup.removeControl(key);
  }
  
  hasRequired(key: string) {
    this.formGroup.get(key)?.hasValidator(Validators.required)
  }

  hasRequiredOther(fg:FormGroup,key: string) {
    return fg.hasValidator(Validators.required)
  }
}
