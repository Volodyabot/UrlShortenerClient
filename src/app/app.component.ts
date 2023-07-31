import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './services/account.service';
import { Observable, of } from 'rxjs';
import { User } from './models/user';
import { UrlService } from './services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  currentUser$: Observable<User | null> = of(null);

  constructor(
    private router: Router,
    public accountService: AccountService,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.urlService.getAll();
    this.accountService.initCurrentUser();
    this.currentUser$ = this.accountService.currentUser$;
  }

  goTologinPage() {
    this.router.navigate(['/Login']);
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  goToAboutPage() {
    this.router.navigate(['/About']);
  }

  logout() {
    this.accountService.logout();
  }
}
