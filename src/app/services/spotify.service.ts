import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root' //angular 6+ integró esta declaracion, sin esto hay que agregar manualmente el servicio a app.module por ejemplo
})
export class SpotifyService {
  tokenAccess: string = 'BQCySMWtPGKkMYSZKMQWCHO6unf47kPq0VfXi18Avr_HXSGhOMLnbTKSIfRuEIubnzr3er-ZlCCxIat6TBM'
  constructor(private http: HttpClient) {
    console.log('servicio listo!');
  }
  getQuery(query: string) {
    const url = 'https://api.spotify.com/v1' + query
    const headers = new HttpHeaders({
      'Authorization': '[{"key":"Authorization","value":"Bearer ' + this.tokenAccess + '","description":"","type":"text","enabled":true}]'
    })
    return this.http.get(url, { headers })
  }

  getNewReleases() {
    // const headers = new HttpHeaders({
    //   'Authorization': '[{"key":"Authorization","value":"Bearer ' + this.tokenAccess + '","description":"","type":"text","enabled":true}]'
    // }) autorizacion!
    // return this.http.get('https://api.spotify.com/v1/browse/new-releases', { headers }).pipe(map((resp: any) => {
    //   return resp.albums.items
    // })) peticion!
    return this.getQuery('/browse/new-releases').pipe(map((resp: any) => {
      return resp.albums.items
    }))
  }
  getArtistas(termino: string) {
    // const headers = new HttpHeaders({
    //   'Authorization': '[{"key":"Authorization","value":"Bearer ' + this.tokenAccess + '","description":"","type":"text","enabled":true}]'
    // })
    // return this.http.get('https://api.spotify.com/v1/search?q=' + termino + '&type=artist&limit=20', { headers }).pipe(map((resp: any) => {
    //   return resp.artists.items
    // }))
    return this.getQuery('/search?q=' + termino + '&type=artist&limit=20').pipe(map((resp: any) => {
      return resp.artists.items
    }))
  }
  getArtista(id: string) {
    return this.getQuery('/artists/' + id + '')
  }
  getTopTracks(id: string) {
    return this.getQuery('/artists/'+ id +'/top-tracks?country=us').pipe(map((resp: any) => {
      return resp.tracks
    }))
  }

}
