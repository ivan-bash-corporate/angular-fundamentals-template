import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "@shared/intarfaces/course.interface";
import {HttpClient} from "@angular/common/http";
import {RequestResult} from "@app/auth/interfaces/request-result.interface";
import {Author} from "@shared/intarfaces/author.interface";

const BASE_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    constructor(private client: HttpClient) {}

    getAll(): Observable<RequestResult<Course[]>> {
        return this.client.get<RequestResult<Course[]>>(`${BASE_URL}/courses/all`);
    }

    createCourse(course: Course) {
        return this.client.post<RequestResult<Course>>(`${BASE_URL}/courses/add`, course);
    }

    editCourse(id: number, course: Course) {
        return this.client.put<RequestResult<Course>>(`${BASE_URL}/courses/${id}`, course);
    }

    getCourse(id: number): Observable<RequestResult<Course>> {
        return this.client.get<RequestResult<Course>>(`${BASE_URL}/courses/${id}`);
    }

    deleteCourse(id: number) {
        return this.client.delete<RequestResult<string>>(`${BASE_URL}/courses/${id}`);
    }

    filterCourses(value: string) {
        return this.client.get<RequestResult<Course[]>>(`${BASE_URL}/courses/filter`, {
            params: { title: value }
        });
    }

    getAllAuthors() {
        return this.client.get<RequestResult<Author[]>>(`${BASE_URL}/authors/all`);
    }

    createAuthor(name: string) {
        return this.client.post<RequestResult<string>>(`${BASE_URL}/authors/add`, {name});
    }

    getAuthorById(id: string) {
        return this.client.get<RequestResult<Author>>(`${BASE_URL}/authors/${id}`);
    }
}
