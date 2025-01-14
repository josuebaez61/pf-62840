import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  studentForm: FormGroup;
  displayedColumns: string[] = ['id', 'name', 'actions'];

  students: Student[] = [
    {
      id: generateRandomString(6),
      name: 'Jill',
      lastName: 'Valentine',
    },
    {
      id: generateRandomString(6),
      name: 'Chris',
      lastName: 'Redfield',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      console.log(this.studentForm.value);

      this.students = [
        ...this.students,
        {
          id: generateRandomString(6),
          ...this.studentForm.value,
        },
      ];

      this.studentForm.reset();

      // this.students.push({
      //   id: generateRandomString(6),
      //   ...this.studentForm.value,
      // });
    }
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((el) => el.id != id);
    }
  }
}
