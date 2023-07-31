import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { AccountService } from './account.service';
import { Description } from '../models/description';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class DescriptionService {

  baseUrl = "https://localhost:7102/";

  private data = new BehaviorSubject<Description | null>(null);

  description$ = this.data.asObservable();

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private snackBarSerbice: SnackbarService,
  ) { }

  initDescription(id: number) {
    return this.http.get<Description>(this.baseUrl + `Description/GetDescription/${id}`).pipe(take(1)).subscribe(
      {
        next: response => {
          this.data.next(response);
        },
        error: error => {
          this.snackBarSerbice.openSnackBar(error.error, "close", 3.5);
        }
      }
    );
  }

  updateDescription(id: number, value: string) {

    const token = this.accountService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.put<Description>(this.baseUrl + `Description/UpdateDescription`, null, { params: { Id: id, Value: value }, headers: headers }).pipe(take(1)).subscribe(
      {
        next: response => {
          const description = response;
          if (description) {
            this.data.next(description);
            this.snackBarSerbice.openSnackBar("Description updated", "close", 3.5);
          }
        },
        error: error => {
          this.snackBarSerbice.openSnackBar(error.error, "close", 3.5);
        }
      }
    );
  }
}
