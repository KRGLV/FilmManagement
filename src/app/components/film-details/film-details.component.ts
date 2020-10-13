import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Film } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {

  film: Film;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private filmService: FilmService) { }

  ngOnInit(): void {
    this.getFilms(this.data.id);
  }


  getFilms(id: string): void {
    this.filmService.getFilm(id).subscribe((film) => {
      this.film = film;
    });
  }

}
