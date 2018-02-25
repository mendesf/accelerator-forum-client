import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent],
  providers: [AuthGuard, AuthService],
})
export class AuthModule { }
