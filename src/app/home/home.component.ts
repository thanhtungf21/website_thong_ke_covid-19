import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  CountryReport;

  constructor(private service: GetApiService) { }

  ngOnInit(): void {
    this.getDefaultVietNam();
  }

  public getDefaultVietNam() {
    this.service.getAllCountry().subscribe((report) => {
      this.CountryReport = report.reduce((a, b) => b.countryregion == 'Vietnam' ? b : a, 0);
    });
  }
  
  changeMessage($event) {
    this.CountryReport = $event;
  }

}
