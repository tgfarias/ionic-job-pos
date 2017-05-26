import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Registrar } from "../registrar/registrar";
import { LoginProvider } from "../../providers/login-provider";
import { Credencial } from  "../../model/credencial";
import { TarefasList } from "../../pages/tarefas-list/tarefas-list";
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  credencial:Credencial;

  constructor(public navCtrl: NavController,
              public loginProvider: LoginProvider,
              public menuCtrl: MenuController) {
    this.credencial = new Credencial();
  }

  ionViewDidEnter()
  {
    this.menuCtrl.enable(false);
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.loginProvider.loginSucessoEventEmitter.subscribe(
      user => {
        this.menuCtrl.enable(true),
        this.menuCtrl.swipeEnable(true),
        this.navCtrl.setRoot(TarefasList)
      })

    this.loginProvider.loginFalhaEventEmitter.subscribe(
      error => console.log(error))
  }

  loginComCredencial(){
    this.loginProvider.loginComCrendecial(this.credencial);
  }

  loginComGoogle(){
    this.loginProvider.loginComGoogle();
  }

   loginComFacebook(){
    this.loginProvider.loginComFacebook();
  }
  doRegister(){
  	this.navCtrl.push(Registrar);
  }

}
