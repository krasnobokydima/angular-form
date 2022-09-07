import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class HttpFormService {
  constructor(private http: HttpClient) { }

  post(data: FormData): void {
    console.log(data)
    console.log('12')
  }
}
