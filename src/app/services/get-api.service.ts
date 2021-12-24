import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import * as L from 'leaflet';
@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  private map!: L.Map;

  showOnMap(position: any){
    this.map = L.map('map', {
      center: position,
      zoom: 5
    });
  
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      minZoom: 2,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.getLocation(position)
    tiles.addTo(this.map);
  }

  constructor(private http:HttpClient) { }

  public getAllCountry(): Observable<any>{
    return this.http.get("https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest");
  }
  public totalReports(): Observable<object>{
    return this.http.get("https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/brief");
  }
  public timeseriesReports(): Observable<any>{
    return this.http.get("https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/timeseries");
  }

  getLocation(position: any){
    L.marker(position as L.LatLngExpression).addTo(this.map)
  }

  getDataFormCountry(id: any){
    return this.http.get('https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso2='+ id +'&onlyCountries=true')
  }

  getCountry() {
    return this.http.get('https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/latest?iso=&onlyCountries=true')
  }
}
