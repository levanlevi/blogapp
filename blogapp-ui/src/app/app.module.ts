import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';
import { PostListComponent } from './post/list/post-list.component';
import { SinglePostComponent } from './post/single/single-post.component';
import { AuthGuard } from './security/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: PostListComponent },
      { path: 'post/:id', canActivate: [AuthGuard], component: SinglePostComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
  ],
  declarations: [
    AppComponent,
    PostListComponent,
    SinglePostComponent,
    LoginComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
