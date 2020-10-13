import { BrowserModule } from '@angular/platform-browser';

/* Angular Flex Layout */
import { FlexLayoutModule } from '@angular/flex-layout';

/* FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularMaterialModule } from './angular-material/angular-material.module';

/* http Client Module */
import { HttpClientModule } from '@angular/common/http';

/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Components */
import { FilmComponent } from './components/film/film.component';
import { FilmDetailsComponent } from './components/film-details/film-details.component';

@NgModule({
  declarations: [AppComponent, FilmComponent, FilmDetailsComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
