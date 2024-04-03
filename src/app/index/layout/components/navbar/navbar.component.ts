import { CommonModule } from '@angular/common'
import { Component, HostListener, OnInit } from '@angular/core'
import { RouterLink, Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isNavbarTransparent: boolean = true
  showNavbar: boolean = false

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showNavbar = false
    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isNavbarTransparent = window.scrollY === 0
  }

  showNav() {
    this.showNavbar = !this.showNavbar
    console.log(this.showNavbar)
  }
}
