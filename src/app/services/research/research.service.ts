import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private httpClient: HttpClient) { }

  getData(url: string): Observable<Book[]> {
    return this.httpClient.get<Book[]>('http://127.0.0.1:5000/api/v1/resources/books' + url);
  }
}
