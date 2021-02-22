import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/services/catalogue/catalogue.service';
import { Book } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  booksData!: Book[];
  constructor(private catalogueService: CatalogueService) {

  }

  ngOnInit(): void {
    this.catalogueService.getData().subscribe(data => {
      this.booksData = data;
      // console.log(this.booksData);
    });
  }


  changeBooksData(newBooksData: Book[]): void{
    this.booksData = newBooksData;
  }

}
