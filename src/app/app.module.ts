import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
/*import { SplashScreen } from '@ionic-native/splash-screen';*/
// import { StatusBar } from '@ionic-native/status-bar';
import { Login } from '../pages/login/login';
import { LoginProvider } from '../providers/login-provider';
import { TarefaProvider } from '../providers/tarefa-provider';
import { LovProvider } from '../providers/lov-provider';
import firebase from 'firebase';

import { MyApp } from './app.component';
import { Registrar } from '../pages/registrar/registrar';
import { TarefasList } from '../pages/tarefas-list/tarefas-list';
import { TarefasAdd } from '../pages/tarefas-add/tarefas-add';
import { Googlemaps } from '../pages/googlemaps/googlemaps';
import { Linguagem } from '../pages/linguagem/linguagem';
import { TarefaListItem } from '../components/tarefa-list-item/tarefa-list-item';
import { GoogleMaps } from '@ionic-native/google-maps';



import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

const firebaseConfig = {
    apiKey: "AIzaSyA4NllgXkC2auyNAtO7xQzu-gpdDnG5V0Q",
    authDomain: "posmobile-e26e8.firebaseapp.com",
    databaseURL: "https://posmobile-e26e8.firebaseio.com",
    projectId: "posmobile-e26e8",
    storageBucket: "posmobile-e26e8.appspot.com",
    messagingSenderId: "972716118167"
  };

export function createTranslateLoader(http:Http)
{
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    Login,
    Registrar,
    TarefasList,
    TarefaListItem,
    TarefasAdd,
    Linguagem,
    Googlemaps
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    Registrar,
    TarefasList,
    TarefaListItem,
    TarefasAdd,
    Linguagem,
    Googlemaps
  ],
  providers: [
    LoginProvider,
    TarefaProvider,
    LovProvider,
    GoogleMaps,
    /*StatusBar,
    SplashScreen,*/
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(){
    firebase.initializeApp(firebaseConfig);
  }
}
