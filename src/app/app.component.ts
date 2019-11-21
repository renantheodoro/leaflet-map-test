import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'meudna-map';

  map: L.Map;

  constructor() {}

  ngOnInit() {
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
    const europeLat = 38.7222524;
    const europeLong = -9.13933658999997;

    const europeCorner1 = L.latLng(72.225842, -16.734994);
    const europeCorner2 = L.latLng(35.394257, 56.265224);

    const europeBounds = L.latLngBounds(europeCorner1, europeCorner2);

    const svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );
    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('id', 'europeAmoeba');
    svgElement.setAttribute('viewBox', '0 0 624.09 711.92');
    svgElement.innerHTML = `
      <defs>
          <style>.cls-1{fill:#5793ea;opacity:0.3;}</style>
      </defs>
      <title>cont-europa</title>
      <g id="Camada_2" data-name="Camada 2">
          <g id="Camada_2-2" data-name="Camada 2">
              <path class="cls-1" d="M622.09,382.44c0,58.58.66,275.79-54.94,306.92-58.48,32.75-211.25,2.1-291.76,2.1-66.76,0-131.27,37.71-218.61,10.73-74.3-23-54.34-127.77-54.34-196.67,0-54.43,6.68-156.79,51-194.72C106.08,265.8,204.73,72.64,281.08,33c75.56-39.22,201.35-44.45,253-10.46C645.23,95.62,622.09,319.39,622.09,382.44Z"/>
          </g>
      </g>
      `;

    const europeAmoeba = L.svgOverlay(svgElement, europeBounds, {
      interactive: true
    }).addTo(this.map);

    europeAmoeba.on('click', event => {
      this.goEurope();
    });

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

  moveTo(lat, long, animationDuration) {
    this.map.panTo([lat, long], {
      animate: true,
      duration: animationDuration
    });
  }

  flyTo(lat, long, zoom, animationDuration) {
    this.map.flyTo([lat, long], zoom, {
      animate: true,
      duration: animationDuration
    });
  }

  moveFlying(lat, long, zoom, animationDuration) {
    this.map.zoomOut(1);
    // setTimeout(() => {
    this.moveTo(lat, long, animationDuration);
    // setTimeout(() => {
    this.flyTo(lat, long, zoom, animationDuration);
    // }, animationDuration * 1000);
    // }, 1000);
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
