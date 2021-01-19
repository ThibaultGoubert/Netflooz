import { ResearchService } from './../../services/research/research.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {

  inputValue = '';

  constructor(private researchService: ResearchService) { }

  ngOnInit(): void {
  }

  search(): void {
    // console.log(this.inputValue);
    const url = '?author=' + this.inputValue;
    this.researchService.getData(url).subscribe(data => {
      console.log(data);
    });
  }
}
