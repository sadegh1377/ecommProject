import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../services/product.service";
import {product} from "../../domain/data-type";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | product[];


  constructor(private route: Router, private product: ProductService) {
  }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.log(val.url)
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller')
          let sellerData = sellerStore && JSON.parse(sellerStore)[0]
          this.sellerName = sellerData.name
          this.menuType = 'seller'
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user')
          let userData = userStore && JSON.parse(userStore)
          this.userName = userData.name
          this.menuType = 'user'
        } else {
          this.menuType = 'default'
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller')
    this.route.navigate(['/'])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length
        }
        this.searchResult = result
      })
    }
  }

  hideSearchResult() {
    this.searchResult = undefined
  }

  submitSearch(value: string) {
    this.route.navigate([`search/${value}`])
  }

  redirectToDetails(id: number) {
    this.route.navigate([`details/${id}`])
  }

  userLogout() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }
}
