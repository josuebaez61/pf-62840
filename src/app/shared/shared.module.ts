import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MultiplyDirective } from './directives/multiply.directive';
import { MatListModule } from '@angular/material/list';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [FullNamePipe, HighlightDirective, MultiplyDirective],
  imports: [CommonModule],
  exports: [
    FullNamePipe,
    HighlightDirective,
    MultiplyDirective,
    MatListModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
