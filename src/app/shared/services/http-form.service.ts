import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HttpFormService {
  post(data: FormData): void { console.log(data) }
}
