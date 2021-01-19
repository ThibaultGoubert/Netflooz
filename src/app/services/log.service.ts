import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  booksData!: JSON;

  constructor(private httpClient: HttpClient) { }

  log(msg: any): void {
    this.httpClient.get<any>('http://127.0.0.1:5000/api/v1/resources/books/all').subscribe(data => {
      this.booksData = data as JSON;
      console.log(this.booksData);
    });
  }
}
