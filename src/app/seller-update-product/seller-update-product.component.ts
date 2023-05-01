import {Component, OnInit} from '@angular/core';
import {product} from "../../domain/data-type";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | product
  productMassage: undefined | string

  constructor(private route: ActivatedRoute, private product: ProductService) {
  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id')

    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result
    })

  }

  submit(data: product) {
    if (this.productData) {
      data.id = this.productData.id
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        this.productMassage = "Product has updated"
      }
    })
    setTimeout(() => {
      this.productMassage = undefined
    }, 3000)
  }
}
