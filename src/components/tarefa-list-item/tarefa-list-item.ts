import { Component, Input } from '@angular/core';
import { Tarefa} from "../../model/tarefa";

@Component({
  selector: 'tarefa-list-item',
  templateUrl: 'tarefa-list-item.html'
})
export class TarefaListItem {
	@Input()
	tarefa:Tarefa;

  /*text: string;

  constructor() {
    console.log('Hello TarefaListItem Component');
    this.text = 'Hello World';
  }*/

}
