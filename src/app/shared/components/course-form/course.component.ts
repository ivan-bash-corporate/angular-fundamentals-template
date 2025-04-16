import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  FormArray,
  FormBuilder, FormGroup, Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {Course} from "@shared/intarfaces/course.interface";
import {Author} from "@shared/intarfaces/author.interface";
import {CoursesStoreService} from "@app/services/courses-store.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit{
  @Input() course?: Course;
  @Output() onSubmitForm = new EventEmitter<Course>();
  @Output() onCancelForm = new EventEmitter<void>();

  availableAuthors: Author[] = [];

  constructor(public fb: FormBuilder,
              public library: FaIconLibrary,
              private store: CoursesStoreService) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      author: ['', [Validators.pattern(/^[A-Za-z0-9\s]+$/)]],
      authors: this.fb.array([], [Validators.required]),
    });


    this.store.authors$.subscribe((authors: Author[]) => {
      this.availableAuthors = authors;
    });

    if (this.course) {
      this.courseForm.patchValue({
        title: this.course.title,
        description: this.course.description,
        duration: this.course.duration,
      });

      this.course.authors.forEach((author) => {
        this.authorsArray.push(
            this.fb.group({
              id: [author],
              name: [this.availableAuthors.find((a) => a.id === author)?.name],
            })
        );
      });
    }
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

    this.store.createAuthor(author.value)
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

  onSubmit() {
    if (this.courseForm.valid) {
        const courseData : Course = {
            ...this.courseForm.value,
            authors: this.authorsArray.value.map((author: { id: string }) => author.id),
        };
        this.onSubmitForm.emit(courseData);
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.onCancelForm.emit();
  }
}
