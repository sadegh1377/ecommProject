import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {cart, checkout, order} from "../../domain/data-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  orderMsg: string | undefined;

  constructor(private product: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price += (+item.price * +item.quantity)
        }
      })
      this.totalPrice = (price + (price / 10) + 100) - (price / 10);
      console.log(this.totalPrice)
    })
  }


  orderNow(data: checkout) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId: userId,
        id: undefined
      }
      // just because that the JsonServer can handle this request
      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 700)
      })

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed"
          setTimeout(() => {
            this.orderMsg = undefined
            this.router.navigate(['/my-orders'])
          }, 4000)
        }
      })
    }
  }
}
