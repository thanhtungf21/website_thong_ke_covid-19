import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
@Component({
  selector: 'app-world-wide',
  templateUrl: './world-wide.component.html',
  styleUrls: ['./world-wide.component.css']
})
export class WorldWideComponent implements OnInit {
  @Output('changed') changeValue: EventEmitter<string> = new EventEmitter();

  public TotalReport!: any;
  public AllCountry!: any;
  public selectedCountry!: any;


  constructor(private service: GetApiService) { }

  ngOnInit(): void {
    this.getAllReports();
    this.getAllCountryReports();
  }

  public getAllReports() {
    let res = this.service.totalReports().subscribe(total => {
      this.TotalReport = total;
    });
  }

  public getAllCountryReports() {
    this.service.getAllCountry().subscribe((report) => {
      this.AllCountry = report;
      this.selectedCountry = report.reduce((a, b) => b.countryregion == 'Vietnam' ? b : a, 0);
    });
  }

  
  OutputReport() {
    this.changeValue.emit(this.selectedCountry);
  }
}
