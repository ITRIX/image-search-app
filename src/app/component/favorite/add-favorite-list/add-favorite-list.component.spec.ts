import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFavoriteListComponent } from './add-favorite-list.component';

describe('AddFavoriteListComponent', () => {
  let component: AddFavoriteListComponent;
  let fixture: ComponentFixture<AddFavoriteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFavoriteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
