import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../api.service';
import { IData } from '../IData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  csvData: any[] = [];
  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    this.apiservice.getCsvData().
    subscribe({
      next: (data:any) => {
        const llist: string[] = data.split('\n');
        console.log('indi',typeof(llist[1].split(',')), llist[1].split(',')[6])
        llist.forEach((e: string) => {
          var ilist: string[] = e.split(',');
          var b: IData = this.mapDataToIData(ilist);
          this.csvData.push(b);
        });
        this.csvData = this.csvData.slice(1);
        //console.log(this.csvData);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>{}
    })
  }

  mapDataToIData( a: string[]): IData {
    console.log('a', a);
    let data!: IData;
    data.rowid = parseInt(a[0]);
    data.orderId = a[1];
    data.orderDate = new Date(a[2]);
    data.shipdate = new Date(a[3]);
    data.shipMode = a[4];
    data.customerId = a[5];
    data.customerName = a[6];
    data.segment = a[7];
    data.country = a[8];
    data.city = a[9];
    data.state = a[10];
    data.postalCode = a[11];
    data.region = a[12];
    data.productId = a[13];
    data.categoty = a[14];
    data.subCategory = a[15];
    data.productname = a[16];
    data.sales = parseFloat(a[17]);
    data.quantity = parseInt(a[18]);
    data.discount = parseFloat(a[19]);
    data.profit = parseFloat(a[20]);

    return data;
  }

  ab = {
    'shipMode': 4,
    'quantity': 18,
  } 

  quantityOnShipMode() {
    var map = new Map();
    this.csvData.forEach(( a: []) => {
      if(map.has(a[this.ab.shipMode]))
        map.set(a[this.ab.shipMode],map.get(a[this.ab.shipMode]) + a[this.ab.quantity]);
      else
        map.set(a[this.ab.shipMode],a[this.ab.quantity])
      }
    );

    console.log("map", map);
  }

}
