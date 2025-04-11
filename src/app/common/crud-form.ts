import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormGroup,
  UntypedFormGroup,
  ValidatorFn,
} from "@angular/forms";
import { MessageService, ToastMessageOptions } from "primeng/api";
import { Observable, Subject, Subscription } from "rxjs";
import cloneDeep from "lodash/cloneDeep";

import { CrudService } from "../services/crud.service";

export class CrudForm extends UntypedFormGroup {
  constructor(crudForm: {
    controls: Record<string, AbstractControl>;
    onSuccess?: () => void;
    onError?: () => void;
    onInvalid?: () => void;
    id?: string | null;
    messageService?: MessageService;
    crudService: CrudService;
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
  }) {
    super(crudForm.controls, crudForm.validatorOrOpts, crudForm.asyncValidator);

    this.id = crudForm.id;
    this.crudService = crudForm.crudService;
    this.messageService = crudForm.messageService;
    this.onSuccess = crudForm.onSuccess;
    this.onError = crudForm.onError;
    this.onInvalid = crudForm.onInvalid;
    this.initialState = cloneDeep(this.value);

    this._setForm();
  }

  readonly initialState: Record<string, AbstractControl>;
  messageService?: MessageService;
  id?: string | null;

  readonly crudService: CrudService;
  private _subscriptions: Subscription[] = [];

  onSuccess?: () => void;
  onError?: () => void;
  onInvalid?: () => void;

  submitionStatus$ = new Subject<"submitting" | "success" | "error">();

  get isCreate(): boolean {
    return !this.id;
  }

  get save$(): Observable<any> {
    return this.isCreate ? this.crudService.create(this.value) : this.crudService.updateById(this.id, this.value);
  }

  submit(): void {
    if (this.valid) {
      this.submitionStatus$.next("submitting");
      const subs = this.save$.subscribe({
        next: () => {
          this.submitionStatus$.next("success");
          this.onSuccess?.();
        },
        error: () => {
          this.submitionStatus$.next("error");
          this.onError?.();
        },
      });

      this._subscriptions.push(subs);
    } else {
      this._markAllFieldsAsTouchedAndDirty(this);
      this.onInvalid?.();
    }
  }

  private _setForm(): void {
    const subs = this.submitionStatus$.subscribe(status => {
      const isSubmitting = status === "submitting";

      if (isSubmitting) return;

      const message: ToastMessageOptions = {
        severity: status,
        life: 3000,
      };

      if (status === "success") {
        message.summary = "Sucesso";

        if (this.id) {
          message.detail = "Registro atualizado";
        } else {
          message.detail = "Registro adicionado";
          this.reset();
        }
      } else {
        message.summary = "Erro";
        message.detail = "Houve um erro ao salvar novo gasto";
      }

      this.messageService?.add(message);
    });

    this._subscriptions.push(subs);
  }

  private _markAllFieldsAsTouchedAndDirty(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      if ((control as any).controls) {
        this._markAllFieldsAsTouchedAndDirty(control as FormGroup);
      } else {
        control.markAsTouched();
        control.markAsDirty();
      }
    });
  }

  onInit(options?: { id?: string | null; messageService?: MessageService }): void {
    this.id = options?.id;
    this.messageService = options?.messageService;

    if (this.id) {
      const subs = this.crudService.getById(this.id).subscribe(value => {
        this.patchValue(value);
      });

      this._subscriptions.push(subs);
    }
  }

  onDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
    this.submitionStatus$.complete();
  }

  override reset() {
    super.reset();
    this.patchValue(this.initialState);
  }
}
