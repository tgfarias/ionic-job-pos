import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Credencial } from '../model/credencial';
import firebase from 'firebase';

/*
  Generated class for the LoginProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginProvider {

  currentUser:any;
  autenticado:boolean;
  loginSucessoEventEmitter:EventEmitter<any>;
  loginFalhaEventEmitter:EventEmitter<any>;
  logoutEventEmitter:EventEmitter<any>;

  constructor(public http: Http, public ngZone:NgZone) {
    this.loginSucessoEventEmitter = new EventEmitter();
    this.loginFalhaEventEmitter = new EventEmitter();
    this.logoutEventEmitter = new EventEmitter();
    firebase.auth().onAuthStateChanged(usuario => {
        this.callbackStateChange(usuario);
    });
  }

  loginComCrendecial(credencial:Credencial)
  {
      firebase.auth().signInWithEmailAndPassword(credencial.email,credencial.senha)
      //.then(error => console.log(error))
      .then(result => this.callbackSucessoLogin(result))
      .catch(error => this.callbackFalhaLogin(error));
  }

  loginComGoogle(){
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(error => this.callbackFalhaLogin(error));
  }

  loginComFacebook(){
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(resultado => this.callbackSucessoLogin(resultado))
      .catch(error => this.callbackFalhaLogin(error));
  }


  sair(){
      firebase.auth().signOut()
      .then(() => this.logoutEventEmitter.emit(true))
      .catch(error => this.callbackFalhaLogin(error));
  }


  registrarUsuario(credencial:Credencial){  
      firebase.auth().createUserWithEmailAndPassword(credencial.email, credencial.senha)
      .then(result => console.log(result))
      .catch(error => console.log(error));
  }
  private callbackStateChange(usuario){
      this.ngZone.run( () => {
          if(usuario == null)
          {
              this.currentUser = null;
              this.autenticado = false;

          }
          else{
              this.currentUser = usuario;
              this.autenticado = true;
          }
      })
  }

    private callbackSucessoLogin(response){
      this.loginSucessoEventEmitter.emit(response.user);
    }

  private callbackFalhaLogin(error){
      this.loginFalhaEventEmitter.emit({code : error.code, message : error.messsage, email: error.email, credential : error.credential});
  }


}
