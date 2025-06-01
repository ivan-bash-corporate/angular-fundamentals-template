import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CoursesModule} from "@features/courses/courses.module";
import {AsyncPipe, NgIf} from "@angular/common";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

@Component({
    selector: 'app-show-course-page',
    templateUrl: './show-course-page.component.html',
    styleUrls: ['./show-course-page.component.css'],
    standalone: true,
    imports: [
        CoursesModule,
        NgIf,
        AsyncPipe
    ]
})
export class ShowCoursePage implements OnInit {
  constructor(
      private router: Router,
      protected facade: CoursesStateFacade,
      private route: ActivatedRoute) {}

  ngOnInit(): void {
      let id = this.route.snapshot.paramMap.get('id')!;
      this.facade.getSingleCourse(+id);
  }

  onBack() {
    this.router.navigate(['/courses']);
  }
}
