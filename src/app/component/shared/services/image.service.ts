import {Injectable, EventEmitter} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = 'https://api.unsplash.com';  // URL to web API
  private applicationId = 'b70c3de5f25a9dde65473a566e59af3879972f4b36b1c740889bd00300a4b139';
  searchEvent: EventEmitter<any> = new EventEmitter();
  page = 1;
  per_page = 20;
  cache = {};
  constructor(private http: HttpClient) { }

  /**
   * Search for image based on user's query, trigger an event to update view.
   * Here search query is coming from SearchComponent.
   * Search result matching query will be sent to HomeComponent.
   * @param query
   */
  search(query, page: number) {
    if (query.length === 0) {
      this.searchEvent.emit('clear');
      return;
    }

    this.searchEvent.emit({loading: true, page : page, query : query});
    let url = `${this.url}/search/photos?client_id=${this.applicationId}`;
    url += `&page=${page}&per_page=${this.per_page}&query=${query}`;

    return this.http.get(url).pipe(
      map(res => res))
      .subscribe(images => {
        this.searchEvent.emit(images);
      });
  }

  /**
   * Get random array of images.
   * @returns {Observable<R|T>}
   */
  random(page: number): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/photos?client_id=' + this.applicationId + '&page=' + page + '&per_page=' + this.per_page).pipe(
      map(res => res))
  }

  /**
   * Return a listener to Search Event.
   * @returns {EventEmitter<any>}
   */
  getSearchEvent() {
    return this.searchEvent;
  }
  
}
