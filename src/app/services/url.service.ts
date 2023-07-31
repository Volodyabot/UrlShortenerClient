import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { Url } from '../models/url';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  baseUrl = "https://localhost:7102/";

  urls: Url[] = [];

  private data = new BehaviorSubject<Url[] | null>(null);

  urls$ = this.data.asObservable();

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
  ) { }

  getAll() {
    return this.http.get<Url[]>(this.baseUrl + "Url/GetAllUrls");
  }

  getUrl(guid: string) {
    return this.http.get<Url>(this.baseUrl + `Url/Get/${guid}`);
  }

  initUrls() {
    let result = this.getAll().subscribe(
      {
        next: (response) => {
          this.urls = response;
          this.data.next(response);
        },
        error: error => { console.log(error); }
      }
    );
  }

  shorten(longUrl: string) {

    const token = this.accountService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post<Url>(this.baseUrl + "Url/ShortenUrl", null, { params: { longUrl }, headers: headers });
  }

  delete(guid: string) {
    return this.http.delete<string>(this.baseUrl + `Url/Delete/${guid}`);
  }

}
