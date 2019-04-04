import { environment } from '../../environments/environment';
import * as  FavoriteActions  from  '../actions/favorite.actions';
import { FavoriteList } from '../component/models/FavoriteList.model'
import { createSelector, createFeatureSelector } from '@ngrx/store';  

export function reducer( state: FavoriteList[] = [], action: FavoriteActions.Actions) {
  switch (action.type) {
    case FavoriteActions.ActionTypes.ADD_FAVORITE_LIST: {
      return [...state, action.payload ];
    }

    case FavoriteActions.ActionTypes.ADD_LINK_TO_FAVORITE_LIST: {
      state[action.index].links.push(action.payload);
      return state;
    }

    case FavoriteActions.ActionTypes.UPDATE_LIST_NAME_DESC_BY_ID: {
      state[action.index].name = action.payload.name;
      state[action.index].desc = action.payload.desc;
      return state;
    }
 
    default: {
      return state;
    }
  }
}

export const getList = createFeatureSelector('favorite');
export const getFavListNames = createSelector(
  getList,
  favorite => favorite.map((item)=> item.name)
);