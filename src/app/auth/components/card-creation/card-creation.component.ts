import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomCard } from '../../../redux/models/custom-card.model';
import { v4 as uuidv4 } from 'uuid';
import { addCustomCard } from '../../../redux/actions/custom-card.actions';
@Component({
  selector: 'app-card-creation',
  templateUrl: './card-creation.component.html',
  styleUrls: ['./card-creation.component.scss'],
})
export class CardCreationComponent {
  cardForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
    this.cardForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      description: ['', [Validators.maxLength(255)]],
      imageUrl: ['', [Validators.required]],
      videoUrl: ['', [Validators.required]],
      creationDate: ['', [Validators.required, this.futureDateValidator]],
      tags: this.fb.array([this.fb.control('', Validators.required)]),
    });
  }

  get tags(): FormArray {
    return this.cardForm.get('tags') as FormArray;
  }
  createCard() {
    const card: CustomCard = {
      id: uuidv4(),
      title: this.cardForm.value.title,
      description: this.cardForm.value.description,
      imageUrl: this.cardForm.value.imageUrl,
      videoUrl: this.cardForm.value.videoUrl,
      creationDate: new Date(),
    };
    this.store.dispatch(addCustomCard({card}))
  }
  addTag(): void {
    if (this.tags.length < 5) {
      this.tags.push(this.fb.control('', Validators.required));
    }
  }

  removeTag(index: number): void {
    if (this.tags.length > 1) {
      this.tags.removeAt(index);
    }
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    return selectedDate > currentDate ? { futureDate: true } : null;
  }

  submitForm(): void {
    if (this.cardForm.valid) {
      this.router.navigate(['/']);
    }
  }

  resetForm(): void {
    this.cardForm.reset({
      title: '',
      description: '',
      imageUrl: '',
      videoUrl: '',
      creationDate: '',
      tags: [''],
    });
    while (this.tags.length > 1) {
      this.tags.removeAt(1);
    }
  }
}
