import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { PostListComponent } from './post/list/post-list.component';
import { SinglePostComponent } from './post/single/single-post.component';
import { AuthGuard } from './security/auth.guard';
import { PostCreateComponent } from './admin/post/create/post-create.component';
import { AdminContainerComponent } from './admin/container/admin-container.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminPostListComponent } from './admin/post/list/post-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        children: [
          { path: '', redirectTo: 'posts', pathMatch: 'full' },
          { path: 'posts', component: PostListComponent },
          { path: 'post/:id', component: SinglePostComponent }
        ]
      },
      { path: 'login', component: LoginComponent },
      {
        path: 'admin',
        component: AdminContainerComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'posts', component: AdminPostListComponent },
          { path: 'post/create', component: PostCreateComponent }
        ]
      },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]),
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PostListComponent,
    SinglePostComponent,
    LoginComponent,
    PostCreateComponent,
    DashboardComponent,
    AdminContainerComponent,
    AdminPostListComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
