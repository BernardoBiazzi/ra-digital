import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService,
    private router: Router) { }
  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['dashboard']);
    }
  }
}
