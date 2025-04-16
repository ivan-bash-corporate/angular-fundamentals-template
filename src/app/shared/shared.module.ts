import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalComponent } from './components/modal/modal.component';
import {
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  CourseCardComponent,
  CourseComponent
} from "./components";
import { DurationPipe } from './pipes/duration.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { EmailValidatorDirective } from '@shared/directives/email.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const components = [
  HeaderComponent,
  ButtonComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  CourseCardComponent,
  CourseComponent,
  DurationPipe,
  CustomDatePipe,
  EmailValidatorDirective
];

@NgModule({
    declarations: [components],
    imports: [
        CommonModule,
        FontAwesomeModule,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [components]
})
export class SharedModule { }
