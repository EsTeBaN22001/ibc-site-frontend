import { CanActivateFn, Router } from '@angular/router'
import { TokenService } from '../services/token.service'
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService)
  const router = inject(Router)

  const isValidToken = tokenService.isValidToken()

  if (!isValidToken) {
    router.navigate(['/login'])
    return false
  }

  return true
}
