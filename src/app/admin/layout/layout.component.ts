import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router'
import { LoginService } from '../../services/login.service'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  showMenu: boolean = false

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe({
      next: () => {
        this.showMenu = false
      }
    })
  }

  toggleShowMenu() {
    this.showMenu = !this.showMenu
  }

  logout() {
    this.loginService.logout()
  }
}
