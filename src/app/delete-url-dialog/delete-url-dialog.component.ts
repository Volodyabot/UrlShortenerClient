import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UrlService } from '../services/url.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-delete-url-dialog',
  templateUrl: './delete-url-dialog.component.html',
  styleUrls: ['./delete-url-dialog.component.scss']
})
export class DeleteUrlDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUrlDialogComponent>,
    public urlService: UrlService,
    private snackBarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public guid: string,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.urlService.delete(this.guid).subscribe(
      {
        next: result => {
          this.urlService.urls = this.urlService.urls.filter(u => u.id !== this.guid);
          this.snackBarService.openSnackBar("Successfully deleted", "close", 3.5);
          this.dialogRef.close();
        },
        error: error => {
          console.log(error);
          this.snackBarService.openSnackBar(error.error, "close", 5);
          this.dialogRef.close();
        }
      }
    );
  }
} 
