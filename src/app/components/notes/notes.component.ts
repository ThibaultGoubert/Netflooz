import { NotesService } from './../../services/notes/notes.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() id: string | undefined;

  value: number | undefined;

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.test();
  }

  test(): void {
    // console.log(this.value);
    this.notesService.getNotes().subscribe(data => {
      console.log(data);
    });
  }

  modifNote(): void {
    this.notesService.sendNotes('-3', '1').subscribe(data => {
      console.log(data);
    });
  }

}
