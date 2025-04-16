import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Course} from "@shared/intarfaces/course.interface";

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})

export class CourseInfoComponent {
  @Output() backToCourses = new EventEmitter<void>();
  @Input() course!: Course;

  onBack() {
    this.backToCourses.emit();
  }
}
