import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoursesListComponent} from "@features/courses/courses-list/courses-list.component";
import {CourseInfoComponent} from "@features/course-info/course-info.component";
import {SharedModule} from "@shared/shared.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [CoursesListComponent, CourseInfoComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ],
  exports: [CoursesListComponent, CourseInfoComponent],
})
export class CoursesModule { }
