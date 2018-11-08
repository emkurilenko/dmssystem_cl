import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendBaseServicesService {

  //baseURL = 'http://localhost:8080/';
  baseURL = 'https://dmsystemapi.herokuapp.com/';

  constructor() { }
}
