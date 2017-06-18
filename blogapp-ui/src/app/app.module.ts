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
import { PostCreateComponent } from './admin/post/post-create.component';
import { DashboardComponent } from './admin/container/dashboard.component';

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
        component: DashboardComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'create', component: PostCreateComponent }
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
    DashboardComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
