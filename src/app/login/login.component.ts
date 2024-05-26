import { Component } from '@angular/core'
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoginService } from '../services/login.service'
import { RequestStatus } from '../interfaces/request-status'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = this.formBuilder.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  status: RequestStatus = 'init'

  constructor(private loginService: LoginService, private formBuilder: FormBuilder, private router: Router) {}

  login() {
    if (this.form.valid) {
      this.status = 'loading'
      const { username, password } = this.form.getRawValue()

      this.loginService.login(username, password).subscribe({
        next: () => {
          this.status = 'success'
          this.router.navigate(['/admin'])
        },
        error: () => {
          this.status = 'failed'
        }
      })
    } else {
      this.form.markAllAsTouched()
    }
  }
}
