import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
    requestAllCourses,
    requestCreateCourse,
    requestDeleteCourse,
    requestEditCourse,
    requestFilteredCourses,
    requestSingleCourse,
} from './courses.actions';
import * as fromCourses from './courses.selectors';
import { Course } from '@shared/intarfaces/course.interface';
import {CoursesState} from "@app/store/courses/courses.reducer";

@Injectable({
    providedIn: 'root',
})
export class CoursesStateFacade {
    constructor(private store: Store<{ courses: CoursesState; }>) {}

    public readonly isAllCoursesLoading$ = this.store.pipe(
        select(fromCourses.isAllCoursesLoadingSelector)
    );

    public readonly isSingleCourseLoading$ = this.store.pipe(
        select(fromCourses.isSingleCourseLoadingSelector)
    );

    public readonly isSearchingState$ = this.store.pipe(
        select(fromCourses.isSearchingStateSelector)
    );

    public readonly courses$ = this.store.pipe(
        select(fromCourses.getCourses)
    );

    public readonly allCourses$ = this.store.pipe(
        select(fromCourses.getAllCourses)
    );

    public readonly course$ = this.store.pipe(
        select(fromCourses.getCourse)
    );

    public readonly errorMessage$ = this.store.pipe(
        select(fromCourses.getErrorMessage)
    );

    public getAllCourses(): void {
        this.store.dispatch(requestAllCourses());
    }

    public getSingleCourse(id: string): void {
        this.store.dispatch(requestSingleCourse({ id }));
    }

    public getFilteredCourses(title: string): void {
        this.store.dispatch(requestFilteredCourses({ title }));
    }

    public editCourse(course: Course, id: string): void {
        this.store.dispatch(requestEditCourse({ course, id }));
    }

    public createCourse(course: Course): void {
        this.store.dispatch(requestCreateCourse({ course }));
    }

    public deleteCourse(id: string): void {
        this.store.dispatch(requestDeleteCourse({ id }));
    }
}
