import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {Course} from "@shared/intarfaces/course.interface";
import {Router} from "@angular/router";
import {CoursesModule} from "@features/courses/courses.module";
import {SharedModule} from "@shared/shared.module";
import {CoursesStoreService} from "@app/services/courses-store.service";
import {Subscription} from "rxjs";
import {UserStoreService} from "@app/user/services/user-store.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  imports: [
    CoursesModule,
    forwardRef(() => SharedModule),
    AsyncPipe,
    NgIf,
  ],
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {
  protected courses: Course[] = [];
  private subscription!: Subscription;

  constructor(private router: Router,
              private store: CoursesStoreService,
              protected userStore: UserStoreService) {}

  ngOnInit() {
    this.subscription = this.store.courses$.subscribe(courses => {
      this.courses = courses;
    });
  }

  search(searchTerm: string) {
    this.store.filterCourses(searchTerm);
  }

  delete(id: string) {
    this.store.deleteCourse(id);
  }

  show(id: string) {
    this.router.navigate([`/courses/${id}`]);
  }

  edit(course: Course) {
    this.router.navigate([`/courses/edit/${course.id}`]);
  }

  add() {
    this.router.navigate([`/courses/add`]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
