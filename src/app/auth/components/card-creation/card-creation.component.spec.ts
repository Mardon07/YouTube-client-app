import { CardCreationComponent } from './card-creation.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { reducers } from '../../../redux/reducers';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

describe('CardCreationComponent', () => {
  let component: CardCreationComponent;
  let fixture: ComponentFixture<CardCreationComponent>;
  let store: Store;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot(reducers),
        CommonModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
      ],
      declarations: [CardCreationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCreationComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the card creation component', () => {
    expect(component).toBeTruthy();
  });

  it('check form initial', () => {
    const form = component.cardForm;
    expect(form).toBeDefined();
    expect(form.controls['title'].value).toBe('');
    expect(form.controls['imageUrl'].value).toBe('');
    expect(form.controls['videoUrl'].value).toBe('');
    expect(form.controls['creationDate'].value).toBe('');
    expect(component.tags.length).toBe(1);
  });

  it('check function addTag', () => {
    expect(component.tags.length).toBe(1);

    component.addTag();
    component.addTag();
    component.addTag();

    expect(component.tags.length).toBe(4);

    component.addTag();
    expect(component.tags.length).toBe(5);

    component.addTag();
    expect(component.tags.length).toBe(5);
  });

  it('should return FormArray from the cardForm', () => {
    const tagsArray = component.tags;

    expect(tagsArray).toBeInstanceOf(FormArray);

    expect(tagsArray.length).toBe(component.cardForm.get('tags')?.value.length);
  });
  it('check removeTag', () => {
    component.addTag();
    component.addTag();
    component.addTag();

    expect(component.tags.length).toBe(4);

    component.removeTag(1);

    expect(component.tags.length).toBe(3);
  });

  it('check createCard', () => {
    const card = {
      id: uuidv4(),
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'http://example.com/image.png',
      videoUrl: 'http://example.com/video.mp4',
      creationDate: '2024-08-19',
    };

    const dispatchSpy = jest.spyOn(component['store'], 'dispatch');

    component.createCard();

    expect(dispatchSpy).toHaveBeenCalled();

    const dispatchAction = dispatchSpy.mock.calls[0][0];
    expect(dispatchAction.type).toBe('[Admin Page] Add Custom Card');
  });
  it('check resetForm ', () => {
    component.cardForm.patchValue({
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'http://example.com/image.png',
      videoUrl: 'http://example.com/video.mp4',
      creationDate: '2024-08-19',
      tags: ['tag1', 'tag2', 'tag3'],
    });

    component.resetForm();

    expect(component.cardForm.value).toEqual({
      title: '',
      description: '',
      imageUrl: '',
      videoUrl: '',
      creationDate: '',
      tags: [''],
    });
    expect(component.tags.length).toBe(1);
    expect(component.tags.at(0).value).toBe('');
  });

  it('should navigate to the home page on valid form submission', () => {
    component.cardForm.setValue({
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'http://example.com/image.png',
      videoUrl: 'http://example.com/video.mp4',
      creationDate: '2024-08-19',
      tags: ['tag1'],
    });

    const navigateSpy = jest.spyOn(router, 'navigate');

    component.submitForm();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('check submit Form', () => {
    component.cardForm.setValue({
      title: '',
      description: '',
      imageUrl: '',
      videoUrl: '',
      creationDate: '',
      tags: [''],
    });

    const navigateSpy = jest.spyOn(router, 'navigate');
    component.submitForm();

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
