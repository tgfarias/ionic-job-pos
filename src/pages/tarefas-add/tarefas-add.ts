import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Tarefa } from "../../model/tarefa";
import { LovProvider } from "../../providers/lov-provider";
import { TarefaProvider } from "../../providers/tarefa-provider";
// import { TarefasList } from "../../pages/tarefas-list/tarefas-list";
import {EstadoTarefa} from "../../model/estado-tarefa";

/**
 * Generated class for the TarefasAdd page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-tarefas-add',
  templateUrl: 'tarefas-add.html',
  providers: [TarefaProvider, LovProvider]
})
export class TarefasAdd {
	
  tarefa:Tarefa;
  tarefaForm:FormGroup;

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
        public tarefaProvider: TarefaProvider,
        public viewCtrl: ViewController,
        public fb: FormBuilder,
			  public lovProvider: LovProvider) {

  	this.tarefa = navParams.get("tarefa");
  	if(!this.tarefa){
  		this.tarefa = new Tarefa();
  	}

    this.tarefaForm = this.fb.group({
      'titulo' : ['',Validators.compose([Validators.required, Validators.minLength(5)])],
      'descricao' : [''],
      'estadoTarefa' : ['',Validators.required]
    });

  }

  getEstadoValue(estadoTarefa: EstadoTarefa):string{
    return EstadoTarefa[estadoTarefa];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarefasAdd');
  }

  salvarTarefa(){
    this.tarefaProvider.save(this.tarefa);
    this.viewCtrl.dismiss();
    //this.navCtrl.push(TarefasList);
  }

  

}
