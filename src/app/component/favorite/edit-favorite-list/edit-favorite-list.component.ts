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
  selector: 'app-edit-favorite-list',
  templateUrl: './edit-favorite-list.component.html',
  styleUrls: ['./edit-favorite-list.component.scss']
})
export class EditFavoriteListComponent implements OnInit {
  editFavForm: FormGroup;
  selectedImage: any[];
  selectedIndex: number;
  favList: any[];
  favDuplicateListName: boolean = false;
  constructor(public bsModalRef: BsModalRef, private store: Store<{ favorite: FavoriteList[] }>) { }

  ngOnInit() {
    this.store.select(fromFavoriteReducer.getFavListNames).subscribe((data) => {
      this.favList = JSON.parse(JSON.stringify(data));
    })
    this.editFavForm  = new FormGroup({
      newImageListName: new FormControl(this.selectedImage['name'],Validators.required),
      newImageListNameDesc: new FormControl(this.selectedImage['desc'])
    });
  }

  /**
   * newImageListNameControl
   *
   * @description - returns FormControl object
   */
  get newImageListNameControl() {
    return this.editFavForm.get('newImageListName');
  }

  /**
   * newImageListNameDescControl
   *
   * @description - returns FormControl object
   */
  get newImageListNameDescControl() {
    return this.editFavForm.get('newImageListNameDesc');
  }

  /**
   * onEdit
   *
   * @description - called when user update name and desc of list.
   */
  onEdit():void {
    const payload = {
      'name': this.newImageListNameControl.value,
      'desc': this.newImageListNameDescControl.value,
    }

    if(this.newImageListNameControl.value === this.selectedImage['name']) {
      this.store.dispatch(new FavoriteActions.UpdateListNameDescByID(payload, this.selectedIndex));
      this.bsModalRef.hide();
    } else {
      if(this.favList.indexOf(payload.name) === -1) {
        this.store.dispatch(new FavoriteActions.UpdateListNameDescByID(payload, this.selectedIndex));
        fromFavoriteReducer.getFavListNames.release();
        this.bsModalRef.hide();
      } else {
        this.favDuplicateListName = true;
      }
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

}
