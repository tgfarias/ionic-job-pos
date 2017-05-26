import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
// import { StatusBar } from 'ionic-native';
import { TranslateService } from 'ng2-translate';
// import { Registrar } from '../pages/registrar/registrar';
import { Login } from '../pages/login/login';
import { TarefasList } from '../pages/tarefas-list/tarefas-list';
import { Linguagem } from '../pages/linguagem/linguagem';
import { Googlemaps } from '../pages/googlemaps/googlemaps';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav:Nav;
  rootPage:any = Login;
  menuSections:Array<{title:string,component:any}>

  constructor(platform: Platform, translateService: TranslateService) {
    platform.ready().then(() => {
    	localStorage.setItem('usedLanguage', 'pt_BR');
      translateService.setDefaultLang('pt_BR');
      translateService.use('pt_BR');
      // StatusBar.styleDefault();
      this.menuSections = [
      {title: 'pages.tarefa.title', component :  TarefasList},
      {title: 'pages.linguagem.title', component : Linguagem},
      {title: 'pages.maps.title', component : Googlemaps}

      ]
    });
  }

  navToComponent(component:any)
  {
  	this.nav.setRoot(component);
  }
}

