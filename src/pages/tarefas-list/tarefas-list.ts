import { Component, NgZone } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Tarefa } from "../../model/tarefa";
import { TarefaProvider } from "../../providers/tarefa-provider";
import { TarefasAdd } from "../../pages/tarefas-add/tarefas-add";

@Component({
  selector: 'page-tarefas-list',
  templateUrl: 'tarefas-list.html',
  providers: [TarefaProvider]
})
export class TarefasList {

	tarefas:Array<Tarefa>;


  constructor(public navCtrl: NavController,
  			  public tarefaProvider:TarefaProvider,
  			  public toastCtrl: ToastController,
  			  public ngZone: NgZone) {
  		this.tarefas = new Array<Tarefa>();

  		/*
	     * value - Escuta todas as alterações da referencia
	     * child_added - Ouvinte para quando um filtlo for adicionado
	     * child_changed - Ouvinte para quando algum filtlo for alterado
	     * child_removed - Ouvinte para quando algum filho for deletado
	     * child_moved - Ouvinte para ouvir as mudanças na prioridade de um filho
	     */
  		this.tarefaProvider.reference.on('child_removed', (snapshot) => {
	      let tarefaRemovida = snapshot.val();
	      this.toastCtrl.create({
	        message: 'Tarefa '+tarefaRemovida.titulo+' removida!',
	        duration: 3000
	      }).present();
	    })

		this.tarefaProvider.reference.on('value', (snapchat) => {
  		this.ngZone.run(() => {
  			let innerArray = new Array();
  			snapchat.forEach(elemento => {
  				let el = elemento.val();
  				innerArray.push(el);
  			})
  			this.tarefas = innerArray;
  		})
  	})
  }

 
  ionViewDidLoad() {
    console.log('ionViewDidLoad TarefasList');
  }

  adicionarTarefa()
  {
  	this.navCtrl.push(TarefasAdd, {'tarefa' : new Tarefa()});
  }

  atualizarTarefa(tarefa:Tarefa)
  {
  	this.navCtrl.push(TarefasAdd, {'tarefa' : tarefa});
  }

  deletarTarefa(tarefa:Tarefa)
  {
    console.log(tarefa);
  	this.tarefaProvider.delete(tarefa)
  	.then(sucesso => console.log("Tarefa deletada"))
  	.catch(error => console.log("Não foi possivel deletar"));

  }
}
