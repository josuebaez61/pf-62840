import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';
import { generateRandomString } from '../../../../../shared/utils';

export const enrollmentFeatureKey = 'enrollment';

export interface State {
  enrollments: Enrollment[];
}

export const initialState: State = {
  enrollments: [],
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, (state) => {
    return {
      ...state,
      enrollments: [
        {
          id: 'asdasd',
          courseId: 'dsadsa',
          studentId: 'asdvbfgf',
        },
        {
          id: 'vcdf',
          courseId: 'vfggfd',
          studentId: 'cvcbnd',
        },
      ],
    };
  }),
  on(EnrollmentActions.createEnrollment, (state, action) => {
    return {
      ...state,
      enrollments: [
        ...state.enrollments,
        { id: generateRandomString(6), ...action.data },
      ],
    };
  }),
  on(EnrollmentActions.resetState, () => initialState),

  // Proximamente...
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => state),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => state)
);

export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});
