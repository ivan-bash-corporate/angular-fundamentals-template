import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "@shared/intarfaces/course.interface";

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() isEditMode = false;
  @Output() clickOnShow = new EventEmitter<Course>();

  showCourse(): void {
    this.clickOnShow.emit();
  }
}
