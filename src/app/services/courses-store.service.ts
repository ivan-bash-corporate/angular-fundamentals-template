import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Course } from "@shared/intarfaces/course.interface";
import { CoursesService } from "@app/services/courses.service";
import { Author } from "@shared/intarfaces/author.interface";
import { RequestResult } from "@app/auth/interfaces/request-result.interface";

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>([]);
    private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);

    constructor(private service: CoursesService) {
        console.log('CoursesStoreService initialized');
        this.loadCourses();
        this.loadAuthors();
    }

    get isLoading$() {
        return this.isLoading$$.asObservable();
    }

    get courses$() {
        return this.courses$$.asObservable();
    }

    get authors$() {
        return this.authors$$.asObservable();
    }

    private setLoading(value: boolean) {
        this.isLoading$$.next(value);
    }

    private setCourses(courses: Course[]) {
        this.courses$$.next(courses);
    }

    private loadCourses() {
        this.setLoading(true);
        this.service.getAll().subscribe((data: RequestResult<Course[]>) => {
            this.setLoading(false);
            this.setCourses(data.result);
            if (data.successful) {
                this.setCourses(data.result);
            }
        });
    }

    private loadAuthors() {
        this.service.getAllAuthors().subscribe((response: RequestResult<Author[]>) => {
            if (response.successful) {
                this.authors$$.next(response.result);
            }
        });
    }

    getAll(): Course[] {
        return this.courses$$.getValue();
    }

    getCourse(id: number): Course | undefined {
        return this.courses$$.getValue().find((course: Course) => course.id === id);
    }

    createCourse(course: Course) {
        this.setLoading(true);
        this.service.createCourse(course).subscribe(() => {
            this.loadCourses();
        });
    }

    editCourse(id: number, course: Course) {
        this.setLoading(true);
        this.service.editCourse(id, course).subscribe(() => {
            this.loadCourses();
        });
    }

    deleteCourse(id: number) {
        this.setLoading(true);
        this.service.deleteCourse(id).subscribe(() => {
            this.loadCourses();
        });
    }

    filterCourses(value: string) {
        this.setLoading(true);

        if(!value){
            this.loadCourses();
        }

        this.service.filterCourses(value).subscribe((response: RequestResult<Course[]>) => {
            this.setLoading(false);
            if (response.successful) {
                this.setCourses(response.result);
            }
        });
    }

    getAllAuthors(): Author[] {
        return this.authors$$.getValue();
    }

    createAuthor(name: string) {
        this.service.createAuthor(name).subscribe((response: RequestResult<string>) => {
            if (response.successful) {
                this.loadAuthors();
            }
        });
    }

    getAuthorById(id: string): Author | undefined {
        return this.authors$$.getValue().find(author => author.id === id);
    }
}
