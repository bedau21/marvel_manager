import { TestBed, async } from '@angular/core/testing';

import { MarvelService } from './marvel.service';
import { HttpClientModule } from '@angular/common/http';

describe('MarvelService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarvelService = TestBed.get(MarvelService);
    expect(service).toBeTruthy();
  });
});
