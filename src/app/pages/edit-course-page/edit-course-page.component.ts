import {Component, forwardRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "@shared/intarfaces/course.interface";
import {NgIf} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {CoursesStoreService} from "@app/services/courses-store.service";

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.css'],
  standalone: true,
  imports: [
    NgIf,
    forwardRef(() => SharedModule),
  ]
})
export class EditCoursePage implements OnInit {
  course?: Course;

  constructor(
      private router: Router,
      private store: CoursesStoreService,
      private route: ActivatedRoute) {}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.course = this.store.getCourse(id);
  }

  onSubmit(course: Course) {
    this.store.editCourse(this.course?.id!, course);
    this.router.navigate(['/courses']);
  }

  onCancel() {
    this.router.navigate(['/courses']);
  }
}
