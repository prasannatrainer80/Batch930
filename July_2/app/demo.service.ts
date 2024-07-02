import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  sayHello() : string {
    return "Welcome to Angular...";
  }

  company() : string {
    return "Company is Sonix...";
  }

  trainer() : string {
    return "Trainer is Prasanna...";
  }
  
  constructor() { }
}
