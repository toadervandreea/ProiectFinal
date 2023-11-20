import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  NODE_API_SERVER = 'http://localhost:3002/users';

  constructor(private httpClient: HttpClient) {}
  
  readUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.NODE_API_SERVER}`);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.httpClient.post(`${this.NODE_API_SERVER}/login`, credentials);
                                  
  }

  signUp(signUpData: { email: string, password: string }): Observable<any> {
    console.log('SignUp data:', signUpData);
    const dataWithoutId: Omit<typeof signUpData, 'id'> = signUpData;
    return this.httpClient.post(`${this.NODE_API_SERVER}/signup`, dataWithoutId);
                                          
  }

}


