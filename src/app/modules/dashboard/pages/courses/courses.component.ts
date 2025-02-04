import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: false,

  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  isLoading = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log('RECIBIMOS DATOS DE getCourses: ', data);
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
