import {Component, forwardRef, OnInit} from '@angular/core';
import {Course} from "@shared/intarfaces/course.interface";
import {Router} from "@angular/router";
import {CoursesModule} from "@features/courses/courses.module";
import {SharedModule} from "@shared/shared.module";
import {Observable} from "rxjs";
import {UserStoreService} from "@app/user/services/user-store.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {CoursesStateFacade} from "@app/store/courses/courses.facade";

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
export class CoursesComponent implements OnInit {
  protected courses: Observable<Course[]> = this.facade.allCourses$;

  constructor(private router: Router,
              private facade: CoursesStateFacade,
              protected userStore: UserStoreService) {}

  ngOnInit() {
    this.facade.getAllCourses();
  }

  search(searchTerm: string) {
    if (searchTerm) {
      this.facade.getFilteredCourses(searchTerm);
    }
  }

  delete(id: number) {
    this.facade.deleteCourse(id.toString());
  }

  show(id: number) {
    this.router.navigate([`/courses/${id}`]);
  }

  edit(course: Course) {
    this.router.navigate([`/courses/edit/${course.id}`]);
  }

  add() {
    this.router.navigate([`/courses/add`]);
  }
}
