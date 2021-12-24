import { Component, Input, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-shadow.png'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() Report:any;
  private countryData:any;
  private map!: L.Map;
  private position: L.LatLngExpression = [14.058324,108.277199] //vietnam
  private maxConfirm: number = 0;
  
  constructor(private service: GetApiService) {
    
  }

  ngOnInit(): void {
    this.getMax();
    
    this.map = L.map('map', {
      center: this.position,
      zoom: 5,
      renderer: L.canvas()
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 12,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      noWrap: true
    }).addTo(this.map);
    this.circleConfirm();

    setTimeout(() =>{
      this.map.invalidateSize();
    }, 0)
  }

  ngOnChanges(): void {
    // console.log(this.countryValue);
    this.service.getDataFormCountry(this.Report.countrycode["iso2"]).subscribe(data => {
      this.countryData = data;
      this.position = [this.countryData[0].location["lat"], this.countryData[0].location["lng"]]
      // this.getLocation(this.position)
      this.addMarker(this.position);
      this.map.panTo(this.position);
    })
    
  }

  addMarker(position: any) {
    const Marker = L.marker(position as L.LatLngExpression)
    Marker.bindPopup('Name: '+ this.countryData[0].countryregion + ', Confirmed: ' + this.countryData[0].confirmed , {
      closeButton: true
    });

    Marker.addTo(this.map);
  }

  circleConfirm(){
    this.service.getCountry().subscribe((res: any) => {
      for (const c of res) {
        // console.log('Confirm:' + c.countryregion);
        L.circle(c.location as L.LatLngExpression, { radius: this.scaledRadius(c.confirmed, this.maxConfirm)}).addTo(this.map);
      }
    });
  }

  getMax(){
    this.service.getCountry().subscribe((res: any) => {
      for (const c of res) {
        if(this.maxConfirm < c.confirmed) {
          this.maxConfirm = c.confirmed;
        }
      }
    });
  }

  scaledRadius(val: number, maxVal: number): number {
    return 2000000 * (val / maxVal);
  }
}
