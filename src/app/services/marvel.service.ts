import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppConfig } from '../configs';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  marvelApiUrl = `${environment.marvelApiUrl}/characters`;
  marvelComisUrl = `${environment.marvelApiUrl}/comics`;
  publicKey = 'afbe3af0cb6ed30b08d9f316c347cf96';
  privateKey = '2ed72591ff53018577a9a173c3167e96a7bd9aca';
  constructor(
    private http: HttpClient
  ) { }

getHash(timeStamp: string): string {
  const hashGenerator: Md5 = new Md5();
  hashGenerator.appendStr(timeStamp);
  hashGenerator.appendStr(this.privateKey);
  hashGenerator.appendStr(this.publicKey);
  const hash: string = hashGenerator.end().toString();
  return hash;
}

getTimeStamp(): string {
    return new Date().valueOf().toString();
}

getAllHeroes(offset: number = 10): Observable<any> {
  const timeStamp = this.getTimeStamp();
  const hash = this.getHash(timeStamp);
  const requestUrl = `${this.marvelApiUrl}?limit=${AppConfig.LIMIT}&offset=${offset}&ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
  return this.http.get<any>(requestUrl)
    .pipe(
      map(res => res.data)
    );
  }

  getHeroById(characterId: string): Observable<any> {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const requestUrl = `${this.marvelApiUrl}/${characterId}?ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<any>(requestUrl)
      .pipe(
        map(res => res.data.results[0])
      );
  }

  getHeroComics(uri: string, total: number, offset: number = 10): Observable<any> {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const requestUrl = `${uri}?limit=${total}&offset=${offset}&ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<any>(requestUrl)
      .pipe(
        map(res => res.data)
      );
  }

  getHeroComicById(id: string): Observable<any> {
    const timeStamp = this.getTimeStamp();
    const hash = this.getHash(timeStamp);
    const requestUrl = `${this.marvelComisUrl}/${id}?ts=${timeStamp}&apikey=${this.publicKey}&hash=${hash}`;
    return this.http.get<any>(requestUrl)
      .pipe(
        map(res => res.data.results[0])
      );
  }

  getThumbnailPath(path: any, extension: any) {
    return `${path}.${extension}`;
  }
}



