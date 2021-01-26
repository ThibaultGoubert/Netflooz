import { NotesService } from './../../services/notes/notes.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() id = '';
  avg = '';

  value: number | undefined;

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.test();
  }

  test(): void {
    // console.log(this.value);
    // const index: number = +this.id;
    this.notesService.getNote(this.id).subscribe(data => {
      this.avg = data.AVG;
    });
  }

  modifNote(note: string): void {
    this.notesService.sendNotes(this.id, note).subscribe(data => {
      console.log(data);
    });
  }

}
