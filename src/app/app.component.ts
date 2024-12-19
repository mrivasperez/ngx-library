import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OpenlibraryService } from './openlibrary.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'library';

  constructor(private openlibrary: OpenlibraryService) {}

  ngOnInit(): void {
    this.openlibrary.searchByISBN().subscribe((res: any) => console.log(res));
  }
}
