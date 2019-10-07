import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // paises: any[] = []
  nuevasCanciones: any[] = []
  loading: boolean
  error: boolean
  mensajeError: string

  constructor(private http: HttpClient, private spotify: SpotifyService) {
    // this.http.get('https://restcountries.eu/rest/v2/lang/es').subscribe((resp:any) => {
    //   this.paises = resp
    //   console.log(resp)
    // })
    this.loading = true
    this.error = false
    this.spotify.getNewReleases().subscribe((resp:any) => {
      this.nuevasCanciones = resp //trae por el operador map() toda la información directamente de los artistas
      this.loading = false
    }, (errorService) => {
      this.loading = false
      this.error = true
      console.log(errorService);
      this.mensajeError = errorService.error.error.message
    })
  }

  ngOnInit() {
  }

}
