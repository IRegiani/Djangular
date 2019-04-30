import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  // http options used for making API calls
  private httpOptions: any;

  private url = 'http://localhost:8000';

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  getCursos(): Observable<any>{
    return this.http.get(`${this.url}/serve/cursos`);
  }

}






/*


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
   User = {

  };

  constructor() {

   }

  authenticateUser(login: string, password: string) {
    // conectar ao banco
    // enviar dados de login pela api do django
    // caso receba ID do usuário, salvar no aqui
    // Retorna o true
    // caso erro: "Erro de usuário/senha"
  } 

  getUserLocalData(){
    //retorna o objeto local do usuario
  }

  createNewUser(cadastro: any){ //tipar para user
    // conectar ao banco com post
    // enviar dados do cadastro para o banco salvar
    // recebe um true sobre os dados do novo usuario esta salvo
    // retorna um true
    // caso erro: "login/email existente"

  }

  verifyUserType() {
    return 'Admin';
  }

} */
