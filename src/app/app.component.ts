import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { GetApiService } from './services/get-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MockProject';
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
