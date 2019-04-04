import { Component, OnInit } from '@angular/core';
import { FavoriteList } from '../models/FavoriteList.model'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditFavoriteListComponent } from './edit-favorite-list/edit-favorite-list.component'
import { Store, select } from '@ngrx/store';
import * as  FavoriteActions  from  '../../actions/favorite.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favImageSet: any[];
  bsModalRef: BsModalRef;
  imagesStoreSet: Observable<FavoriteList[]>;

  constructor(private modalService: BsModalService, private store: Store<{ favorite: FavoriteList[] }>) { }

  ngOnInit() {
    this.imagesStoreSet = this.store.pipe(select('favorite'));
  }

  /**
   * download
   *
   * @description - download image from source
   * @param image - Object contains image details
   */
  download(image): void {
    const anchor = document.createElement('a');
    anchor.setAttribute('href', 'data:application/octet-stream;base64'+ encodeURIComponent(image['downloadUrl']));
    anchor.setAttribute('download', 'download.jpeg');
    anchor.click();
  }

  /**
   * editList
   *
   * @description - open modal and pass image object.
   * @param image - Object contains image details
   * @param index - index in the images.links Array
   */
  editList(image, index): void {
    const initialState = {'selectedImage': image, 'selectedIndex': index};
    this.bsModalRef = this.modalService.show(EditFavoriteListComponent, {initialState});
  }
  
}
