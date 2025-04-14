import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {mockedAuthorsList} from "@shared/mocks/mocks";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit{
  availableAuthors = mockedAuthorsList;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      author: new FormControl('', [Validators.pattern('^[a-zA-Z0-9 ]*$')]),
      authors: this.fb.array([]),
      duration: new FormControl('', [Validators.required, Validators.min(0)]),
    });
  }

  get authorsArray(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  createAuthor() {
    const author = this.courseForm.get('author')!;
    if (author.invalid) {
      author.markAsTouched();
      return;
    }

    const newAuthor = {
      id: Math.random().toString(36).substring(2, 15),
      name: author.value,
    };

    this.availableAuthors.push(newAuthor);
    author.reset();
  }

  addAuthorToCourse(author: {id: string, name: string}) {
    const index = this.availableAuthors.findIndex((a) => a.id === author.id);
    if (index > -1) {
      this.availableAuthors.splice(index, 1);
      this.authorsArray.push(
          this.fb.group({
            id: [author.id],
            name: [author.name],
          })
      );
    }
  }

  removeAuthorFromCourse(index: number) {
    const authorGroup = this.authorsArray.at(index);
    const author = {
      id: authorGroup.get('id')!.value,
      name: authorGroup.get('name')!.value,
    };
    this.availableAuthors.push(author);
    this.authorsArray.removeAt(index);
  }
}
