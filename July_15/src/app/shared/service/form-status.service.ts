import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormStatusService {

  constructor() { }

  private formStatus = new BehaviorSubject<boolean[]>([false, false, false, false, false, false, false]);
  formStatus$ = this.formStatus.asObservable();

  updateFormStatus(index: number, status: boolean) {
    const currentStatus = this.formStatus.value;
    currentStatus[index] = status;
    this.formStatus.next(currentStatus);
  }
}
