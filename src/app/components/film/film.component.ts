import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SelectionModel } from '@angular/cdk/collections';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { Film } from 'src/app/interfaces/film';
import { FilmService } from 'src/app/services/film.service';
import { MatDialog } from '@angular/material/dialog';
import { FilmDetailsComponent } from '../film-details/film-details.component';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  films: Film[];

  displayedColumns: string[] = [
    'title',
    'director',
    'rt_score',
    'poster',
  ];
  dataSource: MatTableDataSource<Film>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private filmService: FilmService
  ) {
    // Create 100 users
    //const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
    let answerArray: Array<Film> = [];
    this.dataSource = new MatTableDataSource(answerArray);
  }

  ngOnInit(): void {
    this.getFilms();
  }


  getFilms(): void {
    this.filmService.getFilms().subscribe((films) => {
      this.dataSource = new MatTableDataSource(films);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(id: string) {
    const dialogRef = this.dialog.open(FilmDetailsComponent,{
      // width: '250px',
      data: {
        id: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
