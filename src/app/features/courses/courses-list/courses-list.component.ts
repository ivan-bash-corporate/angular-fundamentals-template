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

  @Output() showCourse: EventEmitter<string> = new EventEmitter<string>();
  @Output() editCourse: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter<string>();

  show(id: string) {
    this.showCourse.emit(id);
  }

  edit(course: Course) {
    this.editCourse.emit(course);
  }

  delete(id: string) {
    this.deleteCourse.emit(id);
  }
}
