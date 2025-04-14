import {Component} from '@angular/core';
import {mockedCoursesList} from "@shared/mocks/mocks";
import {Course} from "@shared/intarfaces/course.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  protected courses = mockedCoursesList;

  constructor(private router: Router) {
  }

  search(searchTerm: string) {
    this.courses = mockedCoursesList.filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  delete(id: string) {
    this.courses = this.courses.filter(course => course.id !== id);
  }

  show(id: string) {
    // this.router.navigate([`/courses/${id}`]);
  }

  edit(course: Course) {
    // this.router.navigate([`/courses/edit/${course.id}`], {state: {course}});
  }

  add() {
    // this.router.navigate([`/courses/add`], {state: {course}});
  }
}
