import { Injectable } from '@angular/core';
import { Response, RequestMethod } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

import { ParentService } from '../parent.service';

export interface User {
  _id: string;
  nickname: string;
}

interface SignInArgs {
  email: string;
  password: string;
}

type SignUpArgs = SignInArgs & { nickname: string };

@Injectable()
export class AuthService extends ParentService {

  static getUser(): User {
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    return jwtHelper.decodeToken(token);
  }

  async singIn(args: SignInArgs): Promise<Response> {
    const res = await this.post('api/signin', args);
    return this.saveTokenMiddleware(res);
  }

  async singUp(args: SignUpArgs): Promise<Response> {
    const res = await this.post('api/signup', args);
    return this.saveTokenMiddleware(res);
  }

  saveTokenMiddleware(res: Response): Response {
    if (res.ok) {
      const token = res.headers.get('x-access-token');
      localStorage.setItem('token', token);
    }
    return res;
  }
}
