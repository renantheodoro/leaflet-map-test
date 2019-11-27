import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import * as M from 'materialize-css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meudna-map';

  map: L.Map;

  form = {
    region: {
      name: '',
      lat: null,
      long: null,
      zoom: null
    },

    ameba: {
      url: '',
      bounds: {
        bound1: {
          lat: null,
          long: null
        },
        bound2: {
          lat: null,
          long: null
        }
      }
    }
  };

  constructor() {}

  ngOnInit() {
    M.updateTextFields();

    this.map = L.map('map', {
      center: [0, 0],
      attributionControl: false,
      zoomControl: false,
      dragging: true,
      // zoomSnap: 2,
      zoomAnimation: true,
      // zoomDelta: 0.5,
      inertia: true,
      scrollWheelZoom: true
      // zoomAnimationThreshold: 5
      // fadeAnimation: false,
    }).fitWorld();

    // Europa
    // const europeLat = 38.7222524;
    // const europeLong = -9.13933658999997;

    const europeCorner1 = L.latLng(72.225842, -16.734994);
    const europeCorner2 = L.latLng(35.394257, 56.265224);

    const europeBounds = L.latLngBounds(europeCorner1, europeCorner2);

    // const imageUrl = '';

    // const europeAmoeba = L.imageOverlay(imageUrl, europeBounds).addTo(this.map);

    // europeAmoeba.on('click', event => {
    //   this.goEurope();
    // });

    L.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        id: 'mapbox.light',
        maxZoom: 50,
        minZoom: 2,
        accessToken:
          'pk.eyJ1IjoicmVuYW50aGVvZG9ybyIsImEiOiJjazJxZ3MxejMwZXhqM2N1aW0wNHo3dGh2In0.Btx6bQIIVyYNmQaNAkkaRA'
      }
    ).addTo(this.map);
  }

  moveTo(lat, long, animationDuration = 2) {
    this.map.panTo([lat, long], {
      animate: true,
      duration: animationDuration
    });
  }

  flyTo(lat, long, zoom, animationDuration = 2) {
    this.map.flyTo([lat, long], zoom, {
      animate: true,
      duration: animationDuration
    });
  }

  moveFlying(lat, long, zoom, animationDuration = 2) {
    this.map.zoomOut(1);
    // setTimeout(() => {
    this.moveTo(lat, long, animationDuration);
    // setTimeout(() => {
    this.flyTo(lat, long, zoom, animationDuration);
    // }, animationDuration * 1000);
    // }, 1000);
  }

  insertAmeba(amebaUrl, amebaBound1, amebaBound2) {
    const bound1 = L.latLng(
      parseFloat(amebaBound1.lat),
      parseFloat(amebaBound1.long)
    );
    const bound2 = L.latLng(
      parseFloat(amebaBound2.lat),
      parseFloat(amebaBound2.long)
    );

    const regionBounds = L.latLngBounds(bound1, bound2);

    // console.log('bound1', bound1);
    // console.log('bound2', bound2);
    // console.log('regionBounds', regionBounds);

    // const imageUrl = 'https://cdn.onlinewebfonts.com/svg/img_147665.png';

    const europeAmoeba = L.imageOverlay(amebaUrl, regionBounds).addTo(this.map);

    const ameba = L.imageOverlay(amebaUrl, regionBounds, {
      interactive: true
    }).addTo(this.map);

    // ameba.on('click', event => {
    //   this.goEurope();
    // });
  }

  goRegion() {
    this.insertAmeba(
      this.form.ameba.url,
      this.form.ameba.bounds.bound1,
      this.form.ameba.bounds.bound2
    );
    this.moveFlying(
      this.form.region.lat,
      this.form.region.long,
      this.form.region.zoom
    );
  }

  goJapan() {
    // Japão
    const japan = {
      lat: 36.3910315,
      long: 133.9473275,
      zoom: 5
    };

    const animationDuration = 2; // seconds

    this.moveFlying(japan.lat, japan.long, japan.zoom, animationDuration);
  }

  goSouthKorea() {
    // Coréia do Sul
    const korea = {
      lat: 35.7982133,
      long: 125.6303262,
      zoom: 7
    };

    const animationDuration = 2; // seconds

    this.moveFlying(korea.lat, korea.long, korea.zoom, animationDuration);
  }

  goBrazil() {
    // Brasil
    const brazil = {
      lat: -12.6913323,
      long: -55.9046858,
      zoom: 4
    };

    const animationDuration = 2; // seconds

    this.moveFlying(brazil.lat, brazil.long, brazil.zoom, animationDuration);
  }

  goEurope() {
    // Europa
    const europe = {
      lat: 48.1050061,
      long: 4.1862144,
      zoom: 3
    };

    const animationDuration = 2; // seconds

    this.moveFlying(europe.lat, europe.long, europe.zoom, animationDuration);
  }
}
