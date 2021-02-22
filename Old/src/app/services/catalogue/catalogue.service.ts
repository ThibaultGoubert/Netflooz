import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  constructor(private httpClient: HttpClient) { }

  getData(): Observable<Book[]> {
    return this.httpClient.get<Book[]>('http://127.0.0.1:5001/api/v1/resources/books/all');
  }
}
