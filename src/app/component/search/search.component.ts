import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import { debounceTime, distinctUntilChanged} from 'rxjs/operators';
import { ImageService } from '../shared/services/image.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query = '';
  queryChanged: Subject<string> = new Subject<string>();
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.queryChanged.pipe(
    debounceTime(300), // wait 300ms after the last event before emitting last event
    distinctUntilChanged()) // only emit if value is different from previous value
    .subscribe(query => {
      this.query = query;
      this.imageService.search(this.query, 0);
    });
  }

  /**
   * search
   *
   * @description - Triggers when user enter in search textbox
   * @param text - input text
   */
  search(text: string): void {
    this.queryChanged.next(text);
  }

}
