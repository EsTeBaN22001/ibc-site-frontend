import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { ResponseLogin } from '../interfaces/responseLogin'
import { tap } from 'rxjs'
import { TokenService } from './token.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = `${environment.apiUrl}/auth`

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}

  login(username: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.baseUrl}/login`, {
        username,
        password
      })
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.token)
        })
      )
  }

  logout() {
    this.tokenService.removeToken()
    this.router.navigate(['/'])
  }
}
