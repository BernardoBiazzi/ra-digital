import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user!: User;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData;
    if (!this.user.cpf) this.user.cpf = '000.000.000-00';
    if (!this.user.curso) this.user.curso = 'CLIQUE E DIGITE O NOME';
  }

  debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return function(this: unknown, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  keyUpCpf(event: any) {
    let inputValue = event.target.value as string;
    const maskedValue = this.maskCpf(inputValue);
    event.target.value = maskedValue;

    if (maskedValue.length == 14) {
      this.user.cpf = maskedValue;
      this.authService.updateUserData(this.user)
    }
  }

  keyUpCurso = this.debounce((curso: string) => {
    this.user.curso = curso.toUpperCase();
    if (this.user.curso.length <= 1) return;
    this.authService.updateUserData(this.user)
  }, 1000);

  maskCpf(cpf: string): string {
    // Remove all non-digit characters from the input string
    const cleaned = cpf.replace(/\D/g, '');

    // Apply the CPF mask (###.###.###-##)
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    }

    // If the input string doesn't match the expected format, return the original string
    return cpf;
  }

}
