import { Action } from '@ngrx/store';
import { FavoriteList } from '../component/models/FavoriteList.model'

export enum ActionTypes {
    GET_FAVORITE_LIST = '[Favorite Page] get list',
    ADD_FAVORITE_LIST = '[Favorite Page] add list',
    ADD_LINK_TO_FAVORITE_LIST = '[Favorite Page] add link to list',
    UPDATE_LIST_NAME_DESC_BY_ID = 'update list name and desc by ID'

}

export class GetFavoriteList implements Action {
    readonly type = ActionTypes.GET_FAVORITE_LIST;
}

export class AddFavoriteList implements Action {
    readonly type = ActionTypes.ADD_FAVORITE_LIST;
    constructor(public payload: FavoriteList) {}
}

export class AddLinkToFavoriteList implements Action {
    readonly type = ActionTypes.ADD_LINK_TO_FAVORITE_LIST;
    constructor(public payload: { url: string; downloadUrl: string}, public index: number) {}
}

export class UpdateListNameDescByID implements Action {
    readonly type = ActionTypes.UPDATE_LIST_NAME_DESC_BY_ID;
    constructor(public payload: { name: string; desc: string}, public index: number) {}
}

export type Actions = GetFavoriteList | AddFavoriteList | AddLinkToFavoriteList | UpdateListNameDescByID;