import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [FullNamePipe, HighlightDirective, MultiplyDirective],
  imports: [CommonModule],
  exports: [FullNamePipe, HighlightDirective, MultiplyDirective, MatListModule],
})
export class SharedModule {}
