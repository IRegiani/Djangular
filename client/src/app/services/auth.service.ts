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
      console.log( "Cadastro: " + cadastro);
      return this.http.post(`${this.url}/pessoa/`, cadastro);
    
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
    return this.http.get(`${this.url}/curso`);
  }

  getTurmasDoColaborador(id: number): Observable<any>{
    return this.http.get(`${this.url}/colaboradorTurma/${id}`);
  }

  getAllTurmasDoColaborador() {
    return this.http.get(`${this.url}/colaboradorTurma`);

  }

  getAllTurmas(): Observable<any>{
    return this.http.get(`${this.url}/turma`);
  }
  
  getAllAulas(): Observable<any>{
    return this.http.get(`${this.url}/aulas`);
  }

  getAllAlunosDaAula(): Observable<any>{
    return this.http.get(`${this.url}/pessoaAula`);
  }

  getPessoaAulaDaAula(idAula): Observable<any>{
    return this.http.get(`${this.url}/alunosDaAula/` + idAula);
  }

  getAllAlunos(): Observable<any>{
    return this.http.get(`${this.url}/pessoa`);
  }

  getPresencaEmAula(idPessoa, idAula): Observable<any>{
    return this.http.get(`${this.url}/pessoaAula/` +idPessoa + `/` + idAula);
  }

  updateCurrentAttendance(idRelacao, bodyObj){
    return this.http.put(`${this.url}/updatePessoaAula/` + idRelacao, bodyObj, this.httpOptions);
  }
} 