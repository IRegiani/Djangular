import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // http options used for making API calls
  private httpOptions: any;
  private url = 'http://localhost:8000';
  
   User = {

  };

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
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

  getCursos(): Observable<any>{
    return this.http.get(`${this.url}/serve/cursos`);
  }

  getTurmasDoColaborador(): Observable<any>{
    return this.http.get(`${this.url}/serve/ct`);
  }

  getAllTurmas(): Observable<any>{
    return this.http.get(`${this.url}/serve/turmas`);
  }
  
  getAllAulas(): Observable<any>{
    return this.http.get(`${this.url}/serve/aulas`);
  }

  getAllAlunosDaAula(): Observable<any>{
    return this.http.get(`${this.url}/serve/pa`);
  }

  getAllAlunos(): Observable<any>{
    return this.http.get(`${this.url}/serve/pessoas`);
  }

  postCurrentAttendance(){

  }

  getTurmasAluno(id: number){
    return this.http.get(`${this.url}/serve/turmasAluno/` + id);
  }

  getAulasTurma(id: number){
    return this.http.get(`${this.url}/serve/aulasTurma/` + id);
  }
  getFalta(idAluno: number, idAula: number){
    return this.http.get(`${this.url}/serve/faltasTurma/` + idAluno + `/` + idAula);
  }
} 