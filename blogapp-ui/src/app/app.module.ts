import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { PostListComponent } from './post/list/post-list.component';
import { SinglePostComponent } from './post/single/single-post.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'home', component: PostListComponent },
      { path: 'post/:id', component: SinglePostComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]),
  ],
  declarations: [
    AppComponent,
    PostListComponent,
    SinglePostComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
