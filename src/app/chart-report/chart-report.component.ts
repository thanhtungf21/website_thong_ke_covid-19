import { Component, OnInit, Input } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
@Component({
  selector: 'app-chart-report',
  templateUrl: './chart-report.component.html',
  styleUrls: ['./chart-report.component.css']
})
export class ChartReportComponent{
  @Input() Report;

  selectedCountry;
  TimeSeriesReport;
  multi;
  FidenceInterval=[];
  CountryCampuchia;
  statisticCal=[];
  view: any[] = [500, 300]; 
  colorScheme = {
    domain: ['rgb(103, 58, 183)', 'rgb(0, 150, 136)', 'rgb(233, 30, 99)']
  };
  constructor(private service: GetApiService) {
  }

  ngOnChanges() {
    console.log(this.Report);
    this.getAllTimeseries();
    this.getSelectCountryReports();
  }
  public getAllTimeseries() {
    this.service.timeseriesReports().subscribe((report) => {
      this.TimeSeriesReport = report.reduce((a, b) => (b["countryregion"] === this.Report["countryregion"] && b["provincestate"] === this.Report["provincestate"]) ? b["timeseries"] : a, []);
      this.createValueLine();
    });
  }
  public getSelectCountryReports() {
    this.service.getAllCountry().subscribe((report) => {
      this.selectedCountry = report.reduce((a, b) => (b["countryregion"] === this.Report["countryregion"]
       && b["provincestate"] === this.Report["provincestate"]) ? b : a, 0);
      // this.CalConfidenceInterval();
      // this.CountryCampuchia = report.reduce((a, b) => b.countryregion == 'Cambodia' ? b : a, 0);
      // this.StatisticWithCampuchia();
    });
  }

  public createValueLine(){
    this.multi=new Array();
    this.multi.push(this.getValue("confirmed"));
    this.multi.push(this.getValue("recovered"));
    this.multi.push(this.getValue("deaths"));
  }

  public getValue(str: string) {
    let series = [], line = {};
    let arrTime : string[] =Object.keys(this.TimeSeriesReport);
    let arrValue : string[] = Object.values(this.TimeSeriesReport);
    for(let i=0;i<arrTime.length;i++)
    {
      let element = {};
      element["name"] = (arrTime[i]);
      element["value"] = arrValue[i][str];
      series.push(element);
    }
    line["name"] = str;
    line["series"] = series;
    return line;
  }
  

  public CalConfidenceInterval(){
    // N is the number of infected people in the country
    var n=this.selectedCountry["confirmed"]
    // P isnumber of people who have recovered
    var PGach=this.selectedCountry["recovered"]/n;
    // calculate the standard Error
    var STE=Math.sqrt((PGach*(1-PGach))/n);
    // Construct the confidence interval
    var Zscore=2.56;
    // LowerLimit of the confidenc interval
    var LowerLimit=PGach-(Zscore*STE);
    // UpperLimit of the confidenc interval
    var UpperLimit=PGach+(Zscore*STE);
    this.FidenceInterval[0]=LowerLimit;
    this.FidenceInterval[1]=UpperLimit;
  }
  // public StatisticWithCampuchia(){
  //   var SelectRecovered=this.selectedCountry["recovered"];
  //   var CampuchiaRecovered=this.CountryCampuchia["recovered"];
  //   var SelectConfirm=this.selectedCountry["confirmed"];
  //   var CampuchiaConfirm=this.CountryCampuchia["confirmed"];

  //   var PGachSelect=SelectRecovered/SelectConfirm;
  //   var PGachCampuchia=CampuchiaRecovered/CampuchiaConfirm;

  //   var nSelect=SelectConfirm;
  //   var nCampuchia=CampuchiaConfirm;
  //   var PGach = (SelectRecovered+CampuchiaRecovered)/(SelectConfirm+CampuchiaConfirm);

  //   var statistic=(PGachSelect-PGachCampuchia)/(Math.sqrt((PGach*(1-PGach)*((1/nSelect)+(1/nCampuchia)))));
  //   //alpha =0.01
  //   var ZScore=2.56;
  //   this.statisticCal[0]=statistic;
  //   this.statisticCal[1]=ZScore;

  //   var result;
  //   if(statistic>ZScore || statistic< -ZScore){
  //     result="we can reject the null hypothesis";
  //   }
  //   else if(statistic == 0){
  //     result="";
  //   }
  //   else{
  //     result="we can not reject the null hypothesis";
  //   }
  //   this.statisticCal[2]=result;
  // }
}
