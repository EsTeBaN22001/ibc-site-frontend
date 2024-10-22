import { CommonModule } from '@angular/common'
import { AfterViewInit, Component, OnInit } from '@angular/core'
import { RouterLink, RouterOutlet, Router } from '@angular/router'
import { bannerItems } from '../../interfaces/banner-item'
import { NavbarComponent } from './components/navbar/navbar.component'
import { FooterComponent } from './components/footer/footer.component'
//@ts-ignore
import * as AOS from 'aos'
// import * as ScrollReveal from 'scrollreveal'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements AfterViewInit, OnInit {
  bannerUrlImg: string = '/assets/banner-index.webp'
  bannerText: string = 'Bienvenido a casa!'

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    AOS.init({
      duration: 800,
      once: true
    })
  }

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
