import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/* Components */
import { FilmComponent } from './components/film/film.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'film' },
  { path: 'film', component: FilmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
