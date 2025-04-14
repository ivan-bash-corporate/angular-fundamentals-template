import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "@shared/intarfaces/course.interface";

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() editCourse: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() deleteCourse: EventEmitter<Course> = new EventEmitter<Course>();

  show(course: Course) {
    this.showCourse.emit(course);
  }

  edit(course: Course) {
    this.editCourse.emit(course);
  }

  delete(course: Course) {
    this.deleteCourse.emit(course);
  }

  protected readonly event = event;
}
