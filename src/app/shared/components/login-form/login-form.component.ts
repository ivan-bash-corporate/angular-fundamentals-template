import {Component, forwardRef, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {NgIf} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "@app/auth/services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    forwardRef(() => SharedModule),
    RouterLink,
  ]
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  email: string = '';
  password: string = '';

  constructor(private service: AuthService, private router: Router) {
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.service.login(this.email, this.password).subscribe({
        next: (response) => {
          if (response) {
            console.error('Login failed:', response);
            return;
          }

          this.router.navigate(['/courses']);
        }
      });
    } else {
      this.loginForm.control.markAllAsTouched();
    }
  }
}
