import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Tarefa } from "../model/tarefa";
import { LoginProvider } from "./login-provider";
import firebase from 'firebase';

@Injectable()
export class TarefaProvider {

	reference;
  constructor(public http: Http,
  			  public loginProvider:LoginProvider) {
    this.initialize();
  }

  private initialize(){
  	this.reference = firebase.database().ref(this.loginProvider.currentUser.uid+'/tarefas/');
  }

  
  save(tarefa:Tarefa){
  	let refKey;
  	if(tarefa.keyReference != undefined)
  	{
  		refKey = tarefa.keyReference;
  	}
  	else{
  		refKey = this.reference.push().key;
  		tarefa.keyReference = refKey;
  	}
  	this.reference.child(refKey).update(tarefa);
  }

  delete(tarefa:Tarefa):any{
  	return this.reference.child(tarefa.keyReference).remove();
  }
}
