// base-edit.component.ts
import { Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';


@Directive()
export abstract class BaseEditComponent<T> {
  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    protected fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    protected service: {
      findAll: () => any;
      findById: (id: number) => any;
      save: (data: T) => any;
      update: (id: number, data: T) => any;
      setGenericChange?: any;
      setMessageChange?: any;
    },
    protected model: new (...args: any[]) => T,
    protected navigateTo: string
  ) {}

  ngOnInit(): void {
    this.service
      .findAll()
      .toPromise()
      .then(() => {
        const modelInstance = new this.model();
        const formControlsConfig: { [key: string]: any } = {};

        for (const key of Object.keys(modelInstance)) {
          formControlsConfig[key] = [''];
        }

        this.form = this.fb.group(formControlsConfig);

        this.route.params.subscribe((params) => {
          this.id = params['id'];
          this.isEdit = !!this.id;
          this.initForm();
        });
      })
      .catch((error) => {
        console.error('Error cargando datos:', error);
      });
  }

  initForm() {
    if (this.isEdit) {
      this.service.findById(this.id).subscribe((data: T) => {
        this.form.patchValue(data);
      });
    }
  }

  operate() {
    const modelInstance = new this.model(this.form.value);

    const operation = this.isEdit
      ? this.service.update(this.id, modelInstance)
      : this.service.save(modelInstance);

    operation
      .pipe?.(switchMap(() => this.service.findAll()))
      .subscribe((data) => {
        this.service.setGenericChange?.(data);
        this.service.setMessageChange?.(this.isEdit ? 'UPDATED!' : 'CREATED!');
        this.router.navigate([this.navigateTo]);
      });
  }
}
