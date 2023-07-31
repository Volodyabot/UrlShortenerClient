import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAboutDialogComponent } from '../edit-about-dialog/edit-about-dialog.component';
import { DescriptionService } from '../services/description.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isAdmin = false;

  constructor(
    public accountService: AccountService,
    private snackBarService: SnackbarService,
    public dialog: MatDialog,
    public descriptionService: DescriptionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.accountService.getRoles().includes('Admin');
    this.descriptionService.initDescription(1);
  }

  goToHomePage() {
    this.router.navigate(['']);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditAboutDialogComponent, {
    });
  }
}

