import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  artistas: any[] = []
  loading: boolean

  constructor(private spotify: SpotifyService) {
  }
  public buscar(termino: string) {
    this.loading = true;
    if (termino.length > 0) {
      this.spotify.getArtistas(termino)
        .subscribe((resp: any) => {
          console.log(resp);
          this.artistas = resp;
          this.loading = false;
        });
    } else {
      this.loading = true;
    }
  }

  ngOnInit() {
  }

}
