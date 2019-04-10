import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicDetailComponent } from './comic-detail.component';
import { LoadingComponent } from '../../common/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('ComicDetailComponent', () => {
  let component: ComicDetailComponent;
  let fixture: ComponentFixture<ComicDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicDetailComponent, LoadingComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        InfiniteScrollModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
