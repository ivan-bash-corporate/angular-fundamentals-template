import {Component, forwardRef} from '@angular/core';
import {Course} from "@shared/intarfaces/course.interface";
import {Router} from "@angular/router";
import {SharedModule} from "@shared/shared.module";
import {CoursesStoreService} from "@app/services/courses-store.service";

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
  course?: Course;

  constructor(private router: Router, private store: CoursesStoreService) {}

  onSubmitForm(course: Course) {
    this.store.createCourse(course);
    this.redirectToCourses();
  }

  onCancelForm() {
    this.redirectToCourses();
  }

  private redirectToCourses() {
    this.router.navigate(['/courses']);
  }
}
