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
  private postOneWayAirURI: string = `${resourceServerUrl}air/multipleSearchAir`;

  constructor(private http: HttpClient) {}

  postOneWayAir(model: any) {
    return this.http.post(this.postOneWayAirURI, model, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
