import { Injectable } from '@angular/core';
import { Student } from '../../modules/dashboard/pages/students/models';
import { generateRandomString } from '../../shared/utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  getStudentsPromise(): Promise<Student[]> {
    return new Promise<Student[]>((resolve, reject) => {
      // reject('Error de conexion');
      setTimeout(() => {
        resolve([
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
        ]);
      }, 3000);
    });
  }

  getStudentsObservable(): Observable<Student[]> {
    return new Observable<Student[]>((subscriber) => {
      const students = [
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

      setInterval(() => {
        students.push({
          id: generateRandomString(6),
          name: 'NUEVO',
          lastName: 'ESTUDIENTE ' + students.length,
        });

        // Emitimos los estudiantes
        subscriber.next(students);

        // subscriber.error('Error al cargar estudiantes'); // Enviar un error a los subscriptores
        if (students.length === 10) {
          subscriber.complete(); // Notifica al subscritor/es que este obs ya no va a emitir mas datos
        }
      }, 1000);
    });
  }
}
