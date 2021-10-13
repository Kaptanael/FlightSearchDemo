import {
  HttpClient,
  HttpParams,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { resourceServerUrl } from '../../shared/app-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginURI: string = `${resourceServerUrl}user/authenticate`;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  //   login(model: any) {
  //     var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  //     return this.http.post(this.loginURI, model, { headers: reqHeader }).pipe(
  //       map((response: any) => {
  //         if (response) {
  //           console.log(response);
  //           localStorage.setItem('token', response.access_token);
  //           localStorage.setItem('username', response.userName);
  //         }
  //       })
  //     );
  //   }

  //   login(model: any): Observable<HttpResponse<any>> {
  //     var reqHeader = new HttpHeaders({ 'No-Auth': 'True' });
  //     return this.http.post(this.loginURI, model, {
  //       headers: new HttpHeaders().set('Content-Type', 'application/json')
  //       .set('No-Auth','True'),
  //       observe: 'response',
  //       responseType: 'text',
  //     });
  login(model: any) {    
    return this.http.post(this.loginURI, model, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('No-Auth', 'True')      
    });
  }

  loggedIn() {
    let token = localStorage.getItem('token')?.toString();
    if(token){
        return true;
    }
    return  false;
  }
}
