import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FavoriteList } from '../../models/FavoriteList.model'
import { Store, select } from '@ngrx/store';
import * as  FavoriteActions  from  '../../../actions/favorite.actions';
import { Observable } from 'rxjs';

import * as fromFavoriteReducer from '../../../reducers/favorite.reducer';

@Component({
  selector: 'app-add-favorite-list',
  templateUrl: './add-favorite-list.component.html',
  styleUrls: ['./add-favorite-list.component.scss']
})
export class AddFavoriteListComponent implements OnInit {
  favList: any[];
  addFavForm: FormGroup;
  selectedImage: any[];
  selectedListIndex: number;
  showAddNewListInput: boolean = true;
  favDuplicateListName: boolean = false;
  constructor(public bsModalRef: BsModalRef, private store: Store<{ favorite: FavoriteList[] }>) { }

  ngOnInit() {
    this.selectedListIndex = 0
    this.store.select(fromFavoriteReducer.getFavListNames).subscribe((data) => {
      this.favList = JSON.parse(JSON.stringify(data));
      this.favList.unshift('Create new List');
    })
    this.addFavForm  = new FormGroup({
      favImageList: new FormControl(this.favList[0]),
      newImageListName: new FormControl('',Validators.required),
      newImageListNameDesc: new FormControl('')
    });
  }

  /**
   * favImageList
   *
   * @description - returns FormControl object
   */
  get favImageList() {
    return this.addFavForm.get('favImageList');
  }

  /**
   * newImageListNameControl
   *
   * @description - returns FormControl object
   */
  get newImageListNameControl() {
    return this.addFavForm.get('newImageListName');
  }

  /**
   * newImageListNameDescControl
   *
   * @description - returns FormControl object
   */
  get newImageListNameDescControl() {
    return this.addFavForm.get('newImageListNameDesc');
  }

  /**
   * onSubmit
   *
   * @description - Adds selected image into favorite image list
   */
  onSubmit():void {
    const payload: FavoriteList = {
      'name': '',
      'desc': '',
      'links':[{
        'url': this.selectedImage['urls']['small'],
        'downloadUrl': this.selectedImage['links']['download']
      }]
    }
    if(this.selectedListIndex === 0) {
      payload.name = this.newImageListNameControl.value;
      payload.desc = this.newImageListNameDescControl.value;
      if(this.favList.indexOf(payload.name) === -1) {
        this.store.dispatch(new FavoriteActions.AddFavoriteList(payload));
        this.bsModalRef.hide();
      } else{
        this.favDuplicateListName = true;
      }
    } else {
      this.store.dispatch(new FavoriteActions.AddLinkToFavoriteList(payload.links[0], this.selectedListIndex - 1))
      this.bsModalRef.hide();
    }
  }

  /**
   * cancel
   *
   * @description - close modal
   */
  cancel(): void {
    this.bsModalRef.hide()
  }

  /**
   * changeFavListSelection
   *
   * @description - called when user change value from select box & add / removes validator for input
   * @param item - $event
   */
  changeFavListSelection(item): void {
    this.selectedListIndex = item.target.selectedIndex;
    if(this.selectedListIndex) {
      this.showAddNewListInput = false;
      this.newImageListNameControl.clearValidators();
      this.newImageListNameControl.updateValueAndValidity();
    } else {
      this.showAddNewListInput = true;
      this.newImageListNameControl.setValidators([Validators.required]);
      this.newImageListNameControl.updateValueAndValidity();
    }
  }

}
