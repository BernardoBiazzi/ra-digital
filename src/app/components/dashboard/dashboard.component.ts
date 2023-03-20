import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user!: User;

  constructor(public authService: AuthService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = this.authService.userData;
  }

}
