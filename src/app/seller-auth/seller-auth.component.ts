import {Component, OnInit} from '@angular/core';
import {SellerService} from "../services/seller.service";
import {login, signUp} from "../../domain/data-type";

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showLogin: boolean = false
  authError: string = ''

  constructor(private seller: SellerService) {
  }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }

  signUp(data: signUp): void {
    this.seller.userSignUp(data);
  }

  login(data: login): void {
    this.seller.userLogin(data)
    this.authError = ''
    this.seller.isLoggingError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or Password is not correct"
      }
    })

  }

  openLogin() {
    this.showLogin = true
  }

  openSignUp() {
    this.showLogin = false
  }
}
