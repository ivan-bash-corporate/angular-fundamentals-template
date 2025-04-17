import {Action, createReducer, on} from '@ngrx/store';
import {Course} from "@shared/intarfaces/course.interface";
import {
    requestAllCourses,
    requestAllCoursesFail,
    requestAllCoursesSuccess, requestCreateCourse,
    requestCreateCourseFail, requestCreateCourseSuccess,
    requestDeleteCourse,
    requestDeleteCourseFail,
    requestDeleteCourseSuccess, requestEditCourse,
    requestEditCourseFail,
    requestEditCourseSuccess,
    requestFilteredCourses,
    requestFilteredCoursesFail,
    requestFilteredCoursesSuccess,
    requestSingleCourse,
    requestSingleCourseFail,
    requestSingleCourseSuccess
} from "@app/store/courses/courses.actions";

export const coursesFeatureKey = 'courses';

export interface CoursesState {
    allCourses : Course[]
    course : Course | null
    isAllCoursesLoading : boolean
    isSingleCourseLoading : boolean
    isSearchState : boolean
    errorMessage : string | null
}

export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

export const coursesReducer = createReducer(
    initialState,

    // === ALL COURSES ===
    on(requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        errorMessage: null,
    })),

    on(requestAllCoursesFail, (state, { error }) => ({
        ...state,
        allCourses: [],
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // === SINGLE COURSE ===
    on(requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),

    on(requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
        errorMessage: null,
    })),

    on(requestSingleCourseFail, (state, { error }) => ({
        ...state,
        course: null,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    // === FILTERED COURSES ===
    on(requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        errorMessage: null,
    })),

    on(requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isSearchState: false,
        errorMessage: null,
    })),

    on(requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        allCourses: [],
        isSearchState: false,
        errorMessage: error,
    })),

    // === CREATE COURSE ===
    on(requestCreateCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [...state.allCourses, course],
        isAllCoursesLoading: false,
        errorMessage: null,
    })),

    on(requestCreateCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // === EDIT COURSE ===
    on(requestEditCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: state.allCourses.map(c => c.id === course.id ? course : c),
        isAllCoursesLoading: false,
        errorMessage: null,
    })),

    on(requestEditCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // === DELETE COURSE ===
    on(requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(requestDeleteCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: null,
    })),

    on(requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    }))
);


export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
