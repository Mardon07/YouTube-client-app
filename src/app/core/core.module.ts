import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchService } from '../shared/services/search.service';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent],
  imports: [
    MatIconModule,
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInput,
    ReactiveFormsModule,
  ],
  providers: [SearchService],
  exports: [HeaderComponent, PageNotFoundComponent],
})
export class CoreModule {}
