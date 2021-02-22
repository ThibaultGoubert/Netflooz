import { NotesService } from './../../services/notes/notes.service';
import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/interfaces/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() id = '';
  note!: Note;

  value: number | undefined;

  constructor(
    private notesService: NotesService
  ) { }

  ngOnInit(): void {
    this.getAvgNote();
  }

  getAvgNote(): void {
    this.notesService.getNote(this.id).subscribe(data => {
      this.note = data[0];
      this.note.AVG = Math.round((this.note.AVG * 100)) / 100;
    });
  }

  modifNote(note: string): void {
    this.notesService.sendNotes(this.id, note).subscribe(data => {
      if (data) {
        this.getAvgNote();
      }
    });
  }

}
