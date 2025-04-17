import {createFeatureSelector, createSelector} from "@ngrx/store";
import {coursesFeatureKey, CoursesState} from "@app/store/courses/courses.reducer";

export const getCourses = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
    getCourses,
    (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
    getCourses,
    (state: CoursesState) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
    getCourses,
    (state: CoursesState) => state.isSingleCourseLoading
);

export const getAllCourses = createSelector(
    getCourses,
    (state: CoursesState) => state.allCourses
);

export const getCourse = createSelector(
    getCourses,
    (state: CoursesState) => state.course
);

export const getErrorMessage = createSelector(
    getCourses,
    (state: CoursesState) => state.errorMessage
);
