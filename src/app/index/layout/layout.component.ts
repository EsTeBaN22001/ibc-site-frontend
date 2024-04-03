import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { RouterLink, RouterOutlet, Router } from '@angular/router'
import { bannerItems } from '../../interfaces/banner-item'
import { NavbarComponent } from './components/navbar/navbar.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  bannerUrlImg: string = '/assets/banner-index.webp'
  bannerText: string = 'Bienvenido a casa!'

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.changeBanner()
    this.router.events.subscribe(() => {
      this.changeBanner()
    })
  }

  changeBanner() {
    const currentItem = bannerItems.filter(item => item.url == this.router.url).shift()
    if (currentItem) {
      this.bannerText = currentItem.text
      this.bannerUrlImg = currentItem.urlImg
    }
  }
}
