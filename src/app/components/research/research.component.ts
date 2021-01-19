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

  search(): void {
    // console.log(this.inputValue);
    const url = '?author=' + this.inputValue;
    this.researchService.getData(url).subscribe(data => {
      this.newResearch.emit(data);
    },
      error => {

      });
  }
}
