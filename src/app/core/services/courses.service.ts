import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Course } from '../../modules/dashboard/pages/courses/models';
import { generateRandomString } from '../../shared/utils';

@Injectable({ providedIn: 'root' })
export class CourseService {
  getCourses(): Observable<Course[]> {
    return of([
      {
        id: generateRandomString(6),
        name: 'Javascript',
      },
      {
        id: generateRandomString(6),
        name: 'Angular',
      },
      {
        id: generateRandomString(6),
        name: 'RxJs',
      },
    ]).pipe(delay(1000));
  }
}
