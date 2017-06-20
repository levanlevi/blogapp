import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  providers: [AuthService]
})
export class LoginComponent {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authService.login(this.model.username, this.model.password)
      .subscribe(data => {
        if (localStorage.getItem('currentUser'))
          this.router.navigate([this.returnUrl]);
        else {
          // TODO show wrong user or password
        }
      },
      error => {// TODO Show error
        this.loading = false;
      });
  }
}
