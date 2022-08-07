import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IData } from '../IData';
import { Papa } from 'ngx-papaparse';
import { ChartType } from './chartType.enum';
import * as moment from 'moment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //master dat
  csvData = [];
  
  //shipmodequantity pie chart
  showShipModePieChart: boolean = false;
  myPieData: any[] = [];

  //category pie chart
  showcategoryPieChart: boolean = false;
  mycategoryData: any[] = [];


  //city bar chart
  showCityBarChart: boolean = false;
  chartColumns = ['City', 'Profitability'];
  myCityData: any[] = [];
  mostProfitableCityData: any[] = [];
  leastProfitableCityData: any[] = [];

  myPieType = ChartType.PieChart;
  myBarType = ChartType.BarChart;

  myoptions = {
    width: 500,
    height: 500,
    //title: 'Toppings I Like On My Pizza',
    is3D: true,
    //colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
  };

  myData = [
    ['Second Class', 266],
    ['Standard Class', 714],
    ['First Class', 231],
  ];


  constructor(private apiservice: ApiService, 
    private papa: Papa, 
    private cookie: CookieService,
    private route: Router) {

  }

  ngOnInit(): void {
    this.apiservice.getCsvData().
      subscribe({
        next: (data: any) => {
          this.papa.parse(data, {
            complete: (result) => {
              const parsed = result.data;
              const headers = parsed.shift();
              this.csvData = parsed.map((row: any) => {
                return row.reduce((all: any, col: any, idx: any) => {
                  switch (headers[idx]) {
                    case 'Order Date':
                    case 'Ship Date':
                      col = moment(col, "DD/MM/YY");
                      break;
                    case 'Row ID':
                    case 'Quantity':
                      col = parseInt(col, 10);
                      break;
                    case 'Sales':
                    case 'Discount':
                    case 'Profit':
                      col = parseFloat(col);
                      break;
                  }
                  return { ...all, [headers[idx]]: col};
                }, {})
              })
            }
          });
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.quantityOnShipMode();
          this.categoryPercentage();
          this.cityProfitability();
          console.log("done");
         }
      })
  }

  cityProfitability() {
    
    var map = new Map();
    var temp = this.csvData;    
    temp.forEach((data: any) => {
      if (map.has(data["City"]))
        map.set(data["City"], map.get(data["City"]) + Number(data["Profit"]));
      else
        map.set(data["City"], Number(data["Profit"]));
    })
    var tempData: (string | number)[][] = []
    map.forEach((value: number, key: string) => {
      const rowData = [key, value]
      tempData.push(rowData);
    })
    tempData.sort((a: any, b:any) => a[1] - b[1]);

    this.showCityBarChart = !this.showCityBarChart;

    this.myCityData = tempData;//tempData.splice(-10, 10);
    this.mostProfitableCityData = tempData.slice(-11,-1);
    this.leastProfitableCityData = tempData.slice(0,10);
    console.log(this.mostProfitableCityData);
    console.log(this.leastProfitableCityData);
    console.log('I reached city')

  }

  categoryPercentage() {
    
    var map = new Map();
    var temp = this.csvData;
    temp.forEach((data: any) => {
      if (map.has(data["Category"]))
        map.set(data["Category"], map.get(data["Category"]) + 1);
      else
        map.set(data["Category"], 1);
    })
    map.size
    var sum: number = map.size;
    if (this.mycategoryData.length == 0) {
      map.forEach((value: number, key: string,) => {
        const percentage: number = (value / sum) * 100;
        const rowData = [key, percentage]
        this.mycategoryData.push(rowData);
      })
    }
    console.log(this.mycategoryData);
    console.log('I reached cat')
    this.showcategoryPieChart = !this.showcategoryPieChart;
  }

  quantityOnShipMode() {
    
    var map = new Map();
    var temp = this.csvData;
    temp.forEach((data: any) => {
      if (map.has(data["Ship Mode"]))
        map.set(data["Ship Mode"], map.get(data["Ship Mode"]) + parseInt(data["Quantity"]));
      else
        map.set(data["Ship Mode"], parseInt(data["Quantity"]));
    })
    if (this.myPieData.length == 0) {
      map.forEach((value: number, key: string,) => {
        const rowData = [key, value];
        this.myPieData.push(rowData);
      });
    }
    console.log(this.myPieData);
    console.log('I reached quan')
    this.showShipModePieChart = !this.showShipModePieChart;
  }

  logout(){
    this.cookie.deleteAll();
    this.route.navigate(['/login']);
  }

}
