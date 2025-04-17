import {Component, forwardRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "@shared/intarfaces/course.interface";
import {AsyncPipe, NgIf} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.css'],
  standalone: true,
  imports: [
    NgIf,
    forwardRef(() => SharedModule),
    AsyncPipe,
  ]
})
export class EditCoursePage implements OnInit {
  course?: Observable<Course | null> = this.facade.course$;

  constructor(
      private router: Router,
      private facade: CoursesStateFacade,
      private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.facade.getSingleCourse(id);
    }
  }

  onSubmit(course: Course) {
    this.facade.editCourse(course, course.id);
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
