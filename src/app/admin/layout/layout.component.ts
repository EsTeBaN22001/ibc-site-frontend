import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  showMenu: boolean = false

  constructor(private loginService: LoginService) {}

  toggleShowMenu() {
    this.showMenu = !this.showMenu
  }

  logout() {
    this.loginService.logout()
    window.location.reload()
  }
}
