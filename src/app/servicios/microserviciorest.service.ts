import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MicroserviciorestService {

  constructor(
    // public http: HttpClient
    ) { }

  getSaldo(numero){
    // return this.http.get('http://192.168.10.24:3001/consultatarjeta/'+numero)
  }
}
