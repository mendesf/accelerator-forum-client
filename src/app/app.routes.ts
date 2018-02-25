import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { PostContainerComponent } from './post/post-container.component';

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'posts', component: PostContainerComponent, },
      { path: 'users/:userId', component: PostContainerComponent, },
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'posts', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(appRoutes);
