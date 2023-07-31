import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { UrlService } from '../services/url.service';
import { Url } from '../models/url';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUrlDialogComponent } from '../delete-url-dialog/delete-url-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urls: any = [];

  urlInput: string = "";

  @ViewChild(MatTable) table: any;

  displayedColumns: string[] = ['longUrl', 'shortUrl', 'Options'];

  constructor(
    private router: Router,
    public accountService: AccountService,
    public urlService: UrlService,
    private snackBarSerbice: SnackbarService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.urlService.initUrls();
    this.urls = this.urlService.urls$;
    this.redirect();
  }

  redirect() {
    if (this.accountService.getToken()) {
      this.router.navigate(['']);
    }
  }

  goTologinPage() {
    this.router.navigate(['/Login']);
  }

  goToInfoPage(guid: string) {
    this.router.navigate([`/Url/${guid}`]);
  }

  shorten() {
    if (this.urlInput.length > 0) {

      this.urlService.shorten(this.urlInput).subscribe(
        {
          next: response => {
            this.urlService.urls.push(response);
            this.table.renderRows();
            this.snackBarSerbice.openSnackBar("Successfully Added", "close", 3.5);
          },
          error: error => {
            console.log(error);
            this.snackBarSerbice.openSnackBar(error.error, "close", 5);
          }
        }
      );
    }
  }

  openDeleteDialog(guid: string): void {
    const dialogRef = this.dialog.open(DeleteUrlDialogComponent, {
      data: guid
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      this.table.renderRows();
    });
  }
}

