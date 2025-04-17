import {Component, forwardRef} from '@angular/core';
import {Course} from "@shared/intarfaces/course.interface";
import {Router} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

@Component({
  selector: 'app-add-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.css'],
  standalone: true,
  imports: [
    forwardRef(() => SharedModule),
  ]
})
export class AddCoursePage {
  constructor(private router: Router, private facade: CoursesStateFacade) {}

  onSubmitForm(course: Course) {
    this.facade.createCourse(course);
    this.redirectToCourses();
  }

  onCancelForm() {
    this.redirectToCourses();
  }

  private redirectToCourses() {
    this.router.navigate(['/courses']);
  }
}
