import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess,
    requestCreateCourse,
    requestCreateCourseFail,
    requestCreateCourseSuccess,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestEditCourse,
    requestEditCourseFail,
    requestEditCourseSuccess,
    requestFilteredCourses,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess,
} from './courses.actions';
import { CoursesService } from '@app/services/courses.service';
import {
    catchError,
    map,
    mergeMap,
    of,
    withLatestFrom,
    tap,
} from 'rxjs';
import { Router } from '@angular/router';
import { CoursesStateFacade } from './courses.facade';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router
    ) {}

    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map(res =>
                        res.successful
                            ? requestAllCoursesSuccess({ courses: res.result })
                            : requestAllCoursesFail({ error: res.errors[0] })
                    ),
                    catchError(err =>
                        of(requestAllCoursesFail({ error: err.message || 'Unknown error' }))
                    )
                )
            )
        )
    );

    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$),
            map(([action, courses]) => {
                const filtered = courses.filter(course =>
                    course.title.toLowerCase().includes(action.title.toLowerCase())
                );
                return requestFilteredCoursesSuccess({ courses: filtered });
            })
        )
    );

    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestSingleCourse),
            mergeMap(action =>
                this.coursesService.getCourse(action.id).pipe(
                    map(res =>
                        res.successful
                            ? requestSingleCourseSuccess({ course: res.result })
                            : requestSingleCourseFail({ error: res.errors[0] })
                    ),
                    catchError(err =>
                        of(requestSingleCourseFail({ error: err.message || 'Unknown error' }))
                    )
                )
            )
        )
    );

    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestDeleteCourse),
            mergeMap(action =>
                this.coursesService.deleteCourse(action.id).pipe(
                    map(res =>
                        res.successful
                            ? requestAllCourses()
                            : requestDeleteCourseFail({ error: res.errors[0] })
                    ),
                    catchError(err =>
                        of(requestDeleteCourseFail({ error: err.message || 'Unknown error' }))
                    )
                )
            )
        )
    );

    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestEditCourse),
            mergeMap(action =>
                this.coursesService.editCourse(action.id, action.course).pipe(
                    map(res =>
                        res.successful
                            ? requestEditCourseSuccess({ course: res.result })
                            : requestEditCourseFail({ error: res.errors[0] })
                    ),
                    catchError(err =>
                        of(requestEditCourseFail({ error: err.message || 'Unknown error' }))
                    )
                )
            )
        )
    );

    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(requestCreateCourse),
            mergeMap(action =>
                this.coursesService.createCourse(action.course).pipe(
                    map(res =>
                        res.successful
                            ? requestCreateCourseSuccess({ course: res.result })
                            : requestCreateCourseFail({ error: res.errors[0] })
                    ),
                    catchError(err =>
                        of(requestCreateCourseFail({ error: err.message || 'Unknown error' }))
                    )
                )
            )
        )
    );

    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    requestCreateCourseSuccess,
                    requestEditCourseSuccess,
                    requestSingleCourseFail
                ),
                tap(() => this.router.navigate(['/courses']))
            ),
        { dispatch: false }
    );
}
