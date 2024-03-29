import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {catchError, Observable, throwError} from "rxjs";
import {Account} from "../model/customer-accounts";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterModule],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: number;
  customer!: Customer;
  accounts$! : Observable<Account[]>;
  errorMessage!: Object;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.accounts$ = this.customerService.getAccountsByCustomer(this.customerId).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }));
  }
  /*
    handleCustomerAccounts(customerId: string) {
      this.accounts$ = this.customerService.getAccountsByCustomer(this.customerId).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      }));
    }*/
  handleCustomerPage(customerId: number) {

    this.router.navigateByUrl("/customers/" + customerId, {state: this.customer}).then(r => {
    });
  }
  Operations(account: any) {
    this.router.navigateByUrl("/account-operations/" + account.id);
  }
}

