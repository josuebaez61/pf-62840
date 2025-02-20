import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: unknown }>(),
    'Load Enrollments Failure': props<{ error: unknown }>(),
    'Create Enrollment': props<{ data: Omit<Enrollment, 'id'> }>(),
    'Reset State': emptyProps(),
  },
});
