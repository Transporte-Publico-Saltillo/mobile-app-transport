import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
declare var google: any;

interface WayPoint {
  location:{
    lat: number,
    lng: number
  };
  stopover: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map: any;

  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();

  origin = { lat: 25.428656942650456, lng: -100.97584302293542 }; //FCFM
  destination = { lat: 25.428656942650456, lng: -100.97584302293542 }; //FCFM

  wayPoints: WayPoint[] = [
    { 
      location: { lat: 25.434602, lng: -100.978752}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434595, lng: -100.978752}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434593, lng: -100.978713}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434587, lng: -100.97866}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434572, lng: -100.978591}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434564, lng: -100.978561}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434558, lng: -100.9785}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.43452, lng: -100.978347}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434507, lng: -100.978271}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434484, lng: -100.978172}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434455, lng: -100.977966}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434412, lng: -100.977874}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434387, lng: -100.97776}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434347, lng: -100.977569}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434316, lng: -100.977455}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434288, lng: -100.977348}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434223, lng: -100.977119}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.43419, lng: -100.977005}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434143, lng: -100.976875}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434059, lng: -100.976615}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.434028, lng: -100.976493}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.433998, lng: -100.976371}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.433954, lng: -100.976127}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.433944, lng: -100.975997}, 
      stopover: false, 
     }, 
     { 
      location: { lat: 25.433935, lng: -100.975868}, 
      stopover: false, 
     }, 
  ];

  @ViewChild('map', {read: ElementRef, static: false}) mapRef : ElementRef;
/*
  infoWindows: any = [];
  markers: any = [
    {
      title: "Alberca olimpica",
      latitude: "25.42812693734505",
      longitude: "-100.98212656594488"
    },
    {
      title: "FCFM",
      latitude: "25.428656942650456",
      longitude: "-100.97584302293542"
    },
    {
      title: "Walmart",
      latitude: "25.424885739807426", 
      longitude: "-100.97986250192612"
    }
  ];
*/
  constructor() {}

  ionViewDidEnter(){
    this.showMap();
  }
/*
  addMarkersToMap(markers){
    for (let marker of markers){
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker){
    let infoWindowContent = '<div id="content">' + 
                              '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' + 
                              '<p>Latitude: ' + marker.latitude + '</p>' + 
                              '<p>Longitude: ' + marker.longitude + '</p>' + 
                              '<ion-button id="navigate">Navigate</ion-button>' + 
                            '</div>';

    let infoWindow = new google.maps.infoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }
  closeAllInfoWindows(){
    for(let window of this.infoWindows){
      window.close();
    }
  }
*/
  showMap() {
    const location = new google.maps.LatLng(25.428684379468855, -100.97584808627138);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.directionsDisplay.setMap(this.map);
    //this.addMarkersToMap(this.markers);

    google.maps.event.addListenerOnce(this.map, 'idle', () =>{
      this.calculateRoute();
    });
  }
  private calculateRoute(){

    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      waypoints: this.wayPoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
  }, (response, status) => {
    if (status === google.maps.DirectionsStatus.OK){
      this.directionsDisplay.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
      }
    });
  }
}