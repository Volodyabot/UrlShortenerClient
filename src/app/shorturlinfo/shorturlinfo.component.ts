import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UrlService } from '../services/url.service';
import { SnackbarService } from '../services/snackbar.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Url } from '../models/url';

@Component({
  selector: 'app-shorturlinfo',
  templateUrl: './shorturlinfo.component.html',
  styleUrls: ['./shorturlinfo.component.scss']
})
export class ShorturlinfoComponent implements OnInit, OnDestroy {

  currentId: string = "";

  url: Url | undefined;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private accountService: AccountService,
    public urlService: UrlService,
    private snackBarSerbice: SnackbarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUrlFromRoute();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getIdFromRoute(): void {
    this.route.params.subscribe(params => {

      const id = String(params['Id']);

      this.currentId = id;

      console.log('Id parameter:', this.currentId);

      this.urlService.getUrl(this.currentId).subscribe(
        {
          next: response => {
            console.log(response);
          },
          error: error => {
            this.snackBarSerbice.openSnackBar(error.error, "close", 4);
          }
        }
      );
    });
  }

  getUrlFromRoute(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {

      const id = String(params['Id']);

      this.urlService.getUrl(id).subscribe(
        {
          next: response => {
            this.url = response;
          },
          error: error => {
            this.snackBarSerbice.openSnackBar(error.error, "close", 4);
          }
        }
      );
    });
  }

  goToHomePage() {
    this.router.navigate(['']);
  }
}
