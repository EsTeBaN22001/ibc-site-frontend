import { HttpContext, HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { TokenService } from '../services/token.service'
import { catchError, throwError } from 'rxjs'
import { LoginService } from '../services/login.service'
import { Router } from '@angular/router'

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false)

export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true)
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService)
  const loginService = inject(LoginService)
  const router = inject(Router)

  if (req.context.get(CHECK_TOKEN)) {
    const token = tokenService.getToken()

    if (token) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
      return next(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Redirigir al login si se recibe un 401
            loginService.logout()
            router.navigate(['/login'])
          }
          return throwError(() => error)
        })
      )
    }
  }

  return next(req)
}
