import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export abstract class ParentService {

  protected headers: Headers;

  constructor(private http: Http, private router: Router) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    const token = localStorage.getItem('token');
    this.headers.set('x-access-token', token);
  }

  get(url): Promise<Response> {
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body?: object | string): Promise<Response> {
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body?: object | string): Promise<Response> {
    return this.request(url, RequestMethod.Put, body);
  }

  async request(url: string, method: RequestMethod, body?: object | string): Promise<Response> {
    const options = new RequestOptions();
    options.method = method;
    options.headers = this.headers;

    if (body) {
      if (typeof body === 'object') {
        options.body = JSON.stringify(body);
      } else if (typeof body === 'string') {
        options.body = body;
      }
    }
    try {
      const res = await this.http
        .request(url, options)
        .toPromise();

      return res;
    } catch (err) {
      if (err.status && err.status === 401) {
        localStorage.removeItem('token');
        this.router.navigate(['/auth']);
      }
      return err;
    }
  }
}
