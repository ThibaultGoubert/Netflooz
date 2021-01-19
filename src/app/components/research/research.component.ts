import { ResearchService } from './../../services/research/research.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  inputValue = '';
  @Output()
  newResearch = new EventEmitter<Book[]>();

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
  }

  search(url: string): void {
    this.researchService.getData(url).subscribe(data => {
      this.newResearch.emit(data);
    },
      error => {
        this.newResearch.emit([]);
      });
  }

  OnSearch(): void {
    let url;
    if (this.inputValue === '') {
      url = '/all';
    } else {
      url = '/search?author=' + this.inputValue;
    }
    this.search(url);
  }
}
