import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { SearchService } from './services/search.service';

@NgModule({
  declarations: [CustomButtonComponent],
  imports: [CommonModule],
  providers: [SearchService],
  exports: [CustomButtonComponent],
})
export class SharedModule {}
