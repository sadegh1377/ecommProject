import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {cart, product} from "../../domain/data-type";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart: boolean = false;
  cartData: product | undefined;

  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {
  }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    productId && this.product.getProduct(productId).subscribe((result) => {
      this.productData = result
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: product) => {
          return productId === item.id.toString()
        })
        this.removeCart = !!items.length;
      }

      let user = localStorage.getItem('user')
      let userId = user && JSON.parse(user).id
      this.product.getCartList(userId)
      this.product.cartData.subscribe((result) => {
        let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
        if (item.length) {
          this.cartData = item[0]
          this.removeCart = true
        }
      })
    })
  }

  handleQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCar(this.productData)
        this.removeCart = true
        console.log("dsk;jfads;jl;")
      } else {
        let user = localStorage.getItem('user')
        let userId = user && JSON.parse(user).id
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId)
            this.removeCart = true
          }
        })
      }
    }
  }

  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId)
    } else {
      this.cartData && this.product.removeToCart(this.cartData.id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        this.product.getCartList(userId)
      })
    }
    this.removeCart = false
  }
}
