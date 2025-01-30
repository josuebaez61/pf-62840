import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from './models';
import { generateRandomString } from '../../../../shared/utils';
import { MatDialog } from '@angular/material/dialog';
import { StudentDialogFormComponent } from './components/student-dialog-form/student-dialog-form.component';
import { StudentsService } from '../../../../core/services/students.service';
import {
  concatMap,
  filter,
  first,
  forkJoin,
  interval,
  map,
  Subscription,
  take,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-students',
  standalone: false,

  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  students: Student[] = [];
  editingStudentId: string | null = null;

  isLoading = false;
  hasError = false;

  studentsSubscription?: Subscription;

  rolesAndFrutas: string[] = [];

  myInterval$ = interval(1000);

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) {}

  ngOnDestroy(): void {
    // Este ciclo de vida se llama cuando el componente se destruye (sale de la vista);
    this.studentsSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    // this.loadStudentsFromPromise()
    // this.loadStudentsFromObs();
    // this.subscribeToInterval();
    // this.loadFrutasAndRoles();
    this.loadFrutasWithRoles();
  }

  loadFrutasWithRoles(): void {
    this.studentsService
      .getRoles()
      .pipe(
        // primero cargarmos los roles
        concatMap((roles) =>
          // segundo cargamos las frutas
          this.studentsService.getFrutas().pipe(
            // Aqui tenemos las frutas, y los roles
            map((frutas) => [...roles, ...frutas])
          )
        )
      )
      .subscribe({
        next: (result) => (this.rolesAndFrutas = result),
      });
  }

  loadFrutasAndRoles(): void {
    this.isLoading = true;
    forkJoin([
      this.studentsService.getRoles(),
      this.studentsService.getFrutas(),
    ]).subscribe({
      next: (value) => {
        console.log(`Recibimos roles: `, value[0]);
        console.log(`Recibimos frutas: `, value[1]);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  subscribeToInterval(): void {
    this.studentsService
      .getInterval()
      .pipe(
        take(5),
        tap((value) =>
          console.log('El valor antes del primer map es: ', value)
        ),
        map((value) => value * 2),
        tap((value) =>
          console.log('El valor antes del segundo map es: ', value)
        ),
        map((value) => value * 2),
        filter((value) => value < 8)
      )
      .subscribe({
        next: (value) => {
          console.log(value);
        },
      });
  }

  loadStudentsFromObs(): void {
    this.isLoading = true;
    this.studentsSubscription = this.studentsService
      .getStudentsObservable()
      // Entre que la info viaja del observable hacia el subcribe, podemos aplicar un pipe
      // para manipular la info, o el flujo de emisiones
      .pipe(take(3))
      .subscribe({
        next: (students) => {
          console.log('Recibimos datos: ', students);
          this.students = [...students];
          this.isLoading = false;
        },
        error: (error) => {
          alert(error);
          this.hasError = true;
          this.isLoading = false;
        },
        complete: () => {
          // this.isLoading = false;
        },
      });
  }

  loadStudentsFromPromise(): void {
    // Este ciclo de vida se ejecuta despues del constructor, al inicializar el component
    this.isLoading = true;
    this.studentsService
      .getStudentsPromise()
      // Atrapar promesas resueltas satisfactoriamente
      .then((students) => {
        this.students = students;
        this.hasError = false;
      })
      .catch((error) => {
        this.hasError = true;
      })
      // Atrapar cuando la promesa se termina de resolver
      .finally(() => {
        this.isLoading = false;
      });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.students = this.students.filter((el) => el.id != id);
    }
  }

  onColorUpdated() {
    console.log('Se actualizo el color de fondo del elemento!');
  }

  onEdit(student: Student): void {
    this.editingStudentId = student.id;

    this.matDialog
      .open(StudentDialogFormComponent, {
        data: student,
      })
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            // Logica de editar
            this.students = this.students.map((student) =>
              student.id === this.editingStudentId
                ? { ...student, ...valorFormulario }
                : student
            );
            this.editingStudentId = null;
          }
        },
      });
  }

  onCreateStudent(): void {
    this.matDialog
      .open(StudentDialogFormComponent)
      .afterClosed()
      .subscribe({
        next: (valorFormulario) => {
          if (!!valorFormulario) {
            this.students = [
              ...this.students,
              {
                id: generateRandomString(6),
                ...valorFormulario,
              },
            ];
          }
        },
      });
  }
}
