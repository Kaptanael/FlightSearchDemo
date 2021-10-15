import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { resourceServerUrl } from '../shared/app-constant';


@Injectable({
  providedIn: 'root',
})
export class OneWayAirService {
  private postMultipleSearchAirURI: string = `${resourceServerUrl}air/multipleSearchAir`;
  private postMultipleSearchAirMulticityURI: string = `${resourceServerUrl}air/multipleSearchAirMulticity`;

  constructor(private http: HttpClient) {}

  postMultipleSearchAir(model: any) {
    return this.http.post(this.postMultipleSearchAirURI, model, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
  postMultipleSearchAirMulticityAir(model: any) {
    return this.http.post(this.postMultipleSearchAirMulticityURI, model, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
