import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {product} from "../../domain/data-type";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProduct: undefined | product[]
  trendyProduct: undefined | product[]

  constructor(private product: ProductService) {
  }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((result) => {
      this.popularProduct = result
    })
    this.product.trendyProducts().subscribe((result) => {
      this.trendyProduct = result
    })
  }


}
