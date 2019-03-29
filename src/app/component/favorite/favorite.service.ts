import { Injectable } from '@angular/core';
import { FavoriteList } from '../models/FavoriteList.model'

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favListSet: FavoriteList [];
  constructor() { 
    this.favListSet = [];
  }

  addNewFavList(payload) {
    this.favListSet.push(payload);
  }

  getFavList() {
    return this.favListSet;
  }
  getFavListNames() {
    return this.favListSet.map((item)=> item.name);
  }

  addLinksToList(payload, index): void {
    this.favListSet[index].links.push(payload);
  }

  updateListNameDescByID(payload, index) {
    this.favListSet[index].name = payload['name'];
    this.favListSet[index].desc = payload['desc'];
  }

  }

