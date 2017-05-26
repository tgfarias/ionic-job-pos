import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMap, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';



@Component({
  selector: 'page-googlemaps',
  templateUrl: 'googlemaps.html',
})
export class Googlemaps {

  constructor(public navCtrl: NavController, 
  			  public googleMaps: GoogleMaps,
  			  public platform: Platform) {
  	platform.ready().then(() => {
    	this.loadMap();
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Googlemaps');
  }

  ngAfterViewInit()
  {
  	this.loadMap();
  }

  loadMap()
  {
  	let element = document.getElementById('map');
  	let map: GoogleMap = this.googleMaps.create(element, {});

  	map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
    console.log('Map is ready!');
  });
  }

}
