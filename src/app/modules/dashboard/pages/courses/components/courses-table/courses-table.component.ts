import { Component } from '@angular/core';

@Component({
  selector: 'app-courses-table',
  standalone: false,

  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss',
})
export class CoursesTableComponent {
  dataSource = [];
  displayedColumns = ['id', 'name'];
}
