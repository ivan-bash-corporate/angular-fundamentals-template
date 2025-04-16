import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "@shared/intarfaces/course.interface";
import {CoursesModule} from "@features/courses/courses.module";
import {NgIf} from "@angular/common";
import {CoursesStoreService} from "@app/services/courses-store.service";

@Component({
    selector: 'app-show-course-page',
    templateUrl: './show-course-page.component.html',
    styleUrls: ['./show-course-page.component.css'],
    standalone: true,
    imports: [
        CoursesModule,
        NgIf
    ]
})
export class ShowCoursePage implements OnInit {
  course?: Course;

  constructor(
      private router: Router,
      private store: CoursesStoreService,
      private route: ActivatedRoute) {}

  ngOnInit(): void {
      let id = this.route.snapshot.paramMap.get('id')!;
      this.course = this.store.getCourse(id);
  }

  onBack() {
    this.router.navigate(['/courses']);
  }
}
