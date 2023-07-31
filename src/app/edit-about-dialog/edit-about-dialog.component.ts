import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { DescriptionService } from '../services/description.service';

@Component({
  selector: 'app-edit-about-dialog',
  templateUrl: './edit-about-dialog.component.html',
  styleUrls: ['./edit-about-dialog.component.scss']
})
export class EditAboutDialogComponent implements OnInit {

  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditAboutDialogComponent>,
    private snackBarSerbice: SnackbarService,
    public descriptionService: DescriptionService
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit() {
    if (this.isDescriptionIsEmpty(this.model.description) || this.model.description == undefined) {
      this.snackBarSerbice.openSnackBar("Field is empty", "close", 3);
      this.dialogRef.close();
    }
    else {
      this.descriptionService.updateDescription(1, this.model.description);
      this.dialogRef.close();
    }
  }

  isDescriptionIsEmpty(description: string): boolean {
    return !(!!description && description.trim().length > 0);
  }
}
