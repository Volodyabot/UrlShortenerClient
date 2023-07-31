import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-outh-page',
  templateUrl: './outh-page.component.html',
  styleUrls: ['./outh-page.component.scss']
})
export class OuthPageComponent implements OnInit {

  model: any = {};

  @ViewChild('inputElUsername') inputElUsername: any;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBarSerbice: SnackbarService
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  redirect() {
    if (this.accountService.getToken()) {
      this.router.navigate(['']);
    }
  }

  login() {
    this.accountService.login(this.model).subscribe(
      {
        next: response => {
          this.router.navigate(['']);
          this.snackBarSerbice.openSnackBar(`Welcome, ${this.accountService.userName}!`, "close", 3);
        },
        error: error => {
          this.snackBarSerbice.openSnackBar(error.error, "close", 4);
        }
      }
    );
  }

  register() {
    this.accountService.register(this.model).subscribe(
      {
        next: response => {
          this.router.navigate(['']);
          this.snackBarSerbice.openSnackBar(`Welcome, ${this.accountService.userName}!`, "close", 3);
        },
        error: error => {
          this.snackBarSerbice.openSnackBar(error.error, "close", 4);
        }
      }
    );
  }

}
