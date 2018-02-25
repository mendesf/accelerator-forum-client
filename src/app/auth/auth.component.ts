import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { AuthService } from './auth.service';


export enum AuthAction { SignIn, SignUp }

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  private action: AuthAction;
  message: string;
  @Input() email: string;
  @Input() nickname: string;
  @Input() password: string;
  @Input() passwordConfirmation: string;

  constructor(private service: AuthService, private router: Router) {
    this.switchToSignIn();
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    try {
      let res: Response;
      if (this.isSignInActive) {
        res = await this.signIn();
      } else {
        if (this.password !== this.passwordConfirmation) {
          this.message = `Password does not match the confirm password.`;
          return;
        }
        res = await this.signUp();
      }

      if (res.ok) {
        this.router.navigate(['/posts']);
      } else {
        this.message = res.json().message;
      }
    } catch (err) {
      console.log(err);
    }
  }

  get isSignInActive(): boolean {
    return this.action === AuthAction.SignIn;
  }

  switchToSignIn(): void {
    this.action = AuthAction.SignIn;
  }

  switchToSignUp(): void {
    this.action = AuthAction.SignUp;
  }

  async signIn(): Promise<Response> {
    return await this.service.singIn({
      email: this.email,
      password: this.password
    });
  }

  async signUp(): Promise<Response> {
    return await this.service.singUp({
      email: this.email,
      nickname: this.nickname,
      password: this.password
    });
  }
}
