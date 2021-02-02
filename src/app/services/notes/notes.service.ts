import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/shared/interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpClient: HttpClient) { }

  getNote(id: string): Observable<Note[]> {
    return this.httpClient.get<Note[]>(`http://127.0.0.1:5000/api/v1/resources/notes?id_book=${id}`);
  }

  sendNotes(idBook: string, note: string): Observable<any> {
    const params = new HttpParams();
    params.set('id_book', idBook);
    params.set('note', note);
    return this.httpClient.post<any>(`http://127.0.0.1:5000/api/v1/resources/notes/create?id_book=${idBook}&note=${note}`, {params});
  }
}
