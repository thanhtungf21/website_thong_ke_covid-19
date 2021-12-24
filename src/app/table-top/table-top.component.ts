import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';

@Component({
  selector: 'app-table-top',
  templateUrl: './table-top.component.html',
  styleUrls: ['./table-top.component.css']
})
export class TableTopComponent implements OnInit {

  constructor(private service: GetApiService) { }
  AllCountry;
  MostConfirm;
  MostRecovered;
  MostDeaths;
  AtLeastConfirm;
  AtLeastRecovered;
  AtLeastDeaths;
  ngOnInit(): void {
    this.getAllCountryReports();
  }
  public getAllCountryReports() {
    this.service.getAllCountry().subscribe((report) => {
      this.AllCountry = report;
      this.getTableValue();
    });
  }

  public getTableValue(){
    this.getMostConfirm();
    this.getAtLeastConfirm();
    this.getMostRecovered();
    this.getAtLeastRecovered();
    this.getMostDeaths();
    this.getAtLeastDeaths();
  }

  public getMostConfirm(){
    function compare( a, b ) {
      if ( a["confirmed"] < b["confirmed"] ){
        return 1;
      }
      if ( a["confirmed"] > b["confirmed"] ){
        return -1;
      }
      return 0;
    }
    this.MostConfirm=this.AllCountry.sort(compare).slice(0,10);
  }
  public getAtLeastConfirm(){
    function compare( a, b ) {
      if ( a["confirmed"] > b["confirmed"] ){
        return 1;
      }
      if ( a["confirmed"] < b["confirmed"] ){
        return -1;
      }
      return 0;
    }
    this.AtLeastConfirm=this.AllCountry.sort(compare).slice(0,10);
  }

  public getMostRecovered(){
    function compare( a, b ) {
      if ( a["recovered"] < b["recovered"] ){
        return 1;
      }
      if ( a["recovered"] > b["recovered"] ){
        return -1;
      }
      return 0;
    }
    this.MostRecovered=this.AllCountry.sort(compare).slice(0,10);
  }
  public getAtLeastRecovered(){
    function compare( a, b ) {
      if ( a["recovered"] > b["recovered"] ){
        return 1;
      }
      if ( a["recovered"] < b["recovered"] ){
        return -1;
      }
      return 0;
    }
    this.AtLeastRecovered=this.AllCountry.sort(compare).slice(0,10);
  }
  public getMostDeaths(){
    function compare( a, b ) {
      if ( a["deaths"] < b["deaths"] ){
        return 1;
      }
      if ( a["deaths"] > b["deaths"] ){
        return -1;
      }
      return 0;
    }
    this.MostDeaths=this.AllCountry.sort(compare).slice(0,10);
  }
  public getAtLeastDeaths(){
    function compare( a, b ) {
      if ( a["deaths"] > b["deaths"] ){
        return 1;
      }
      if ( a["deaths"] < b["deaths"] ){
        return -1;
      }
      return 0;
    }
    this.AtLeastDeaths=this.AllCountry.sort(compare).slice(0,10);
  }
}
