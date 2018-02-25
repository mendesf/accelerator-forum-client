import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import 'rxjs/add/operator/toPromise';

import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { EditModalModule } from './edit-modal/edit-modal.module';
import { HashtagLinkModule } from './hashtag-link/hashtag-link.module';
import { ScrollModule } from './scroll/scroll.module';
import { PostService, PostContainerComponent, PostListComponent, PostHeaderComponent } from './post';
import { CommentService, CommentListComponent } from './comment';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PostContainerComponent,
    PostListComponent,
    CommentListComponent,
    PostHeaderComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    routing,
    AuthModule,
    EditModalModule,
    HashtagLinkModule,
    ScrollModule
  ],
  providers: [PostService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
