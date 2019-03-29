import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { FavoriteComponent } from './component/favorite/favorite.component';
import { SearchComponent } from './component/search/search.component';
import { HttpClientModule } from '@angular/common/http'; 
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddFavoriteListComponent } from './component/favorite/add-favorite-list/add-favorite-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditFavoriteListComponent } from './component/favorite/edit-favorite-list/edit-favorite-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FavoriteComponent,
    SearchComponent,
    AddFavoriteListComponent,
    EditFavoriteListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddFavoriteListComponent, EditFavoriteListComponent]
})
export class AppModule { }
