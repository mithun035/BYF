import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILogin } from './ILogin';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: String
  constructor(private http: HttpClient, private router: Router) { 
    this.baseUrl = "https://interview.bigyellowfish.io";
  }

  loginUser(body: any) {
    let defaultHeaders = new HttpHeaders();
    defaultHeaders = defaultHeaders.append('Accept', 'application/json');
    const requestOptions = { headers: defaultHeaders, withCredentials: false };
    return this.http.post<ILogin>(this.baseUrl + "/api/User/authenticate", body, requestOptions);
  }

  getCsvData(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get(this.baseUrl + "/api/Content/GetCSVData",{ headers, responseType: 'text'});
  }
}
