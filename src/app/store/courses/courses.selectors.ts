import {createFeatureSelector} from "@ngrx/store";
import {coursesFeatureKey, CoursesState} from "@app/store/courses/courses.reducer";

export const isAllCoursesLoadingSelector = (state: CoursesState) => state.isAllCoursesLoading;

export const isSearchingStateSelector = (state: CoursesState) => state.isSearchState;

export const isSingleCourseLoadingSelector = (state: CoursesState) => state.isSingleCourseLoading;

export const getCourses = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const getAllCourses = (state: CoursesState) => state.allCourses;

export const getCourse = (state: CoursesState) => state.course;

export const getErrorMessage = (state: CoursesState) => state.errorMessage;
