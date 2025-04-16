import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {AuthorizedGuard} from "@app/auth/guards/authorized.guard";
import {NotAuthorizedGuard} from "@app/auth/guards/not-authorized.guard";
import {AdminGuard} from "@app/user/guards/admin.guard";

const routes: Routes = [
    { path: 'login', canActivate: [NotAuthorizedGuard],
        loadComponent: () => import('./shared/components/login-form/login-form.component').then(m => m.LoginFormComponent)},
    { path: 'registration', canActivate: [NotAuthorizedGuard],
        loadComponent: () => import('./shared/components/registration-form/registration-form.component').then(m => m.RegistrationFormComponent) },
    { path: 'courses', canActivate: [AuthorizedGuard],
        loadComponent: () => import('./features/courses/courses.component').then(m => m.CoursesComponent) },
    { path: 'courses/add',  canActivate: [AuthorizedGuard, AdminGuard],
        loadComponent: () => import('./pages/add-course-page/add-course-page.component').then(m => m.AddCoursePage) },
    { path: 'courses/:id',  canActivate: [AuthorizedGuard],
        loadComponent: () => import('./pages/show-course-page/show-course-page.component').then(m => m.ShowCoursePage) },
    { path: 'courses/edit/:id',  canActivate: [AuthorizedGuard, AdminGuard],
        loadComponent: () => import('./pages/edit-course-page/edit-course-page.component').then(m => m.EditCoursePage) },
    { path: '**', redirectTo: 'courses' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}