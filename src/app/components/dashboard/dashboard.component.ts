import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user!: User;
  public ra: string = '00220180' + Math.floor((Math.random() * 999999999) + 1);
  public validity: string = '31/12/' + new Date().getFullYear();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData;
    if (!this.user.cpf) this.user.cpf = '000.000.000-00';
    if (!this.user.curso) this.user.curso = 'CLIQUE E DIGITE O NOME';
    if (!this.user.displayName) this.user.displayName = 'Fulano de Tal';
  }

  keyUpCpf = (event: any) => {
    let inputValue = event.target.value as string;
    const maskedValue = this.maskCpf(inputValue);
    event.target.value = maskedValue;

    if (maskedValue.length == 14) {
      this.user.cpf = maskedValue;
      this.authService.updateUserData(this.user)
    }
  }

  keyUpCurso = this.debounce((event: any) => {
    this.user.curso = event.target.value.toUpperCase() as string;
    if (this.user.curso.length <= 1) return;
    this.authService.updateUserData(this.user);
  }, 1000);

  keyUpName = this.debounce((event: any) => {
    this.user.displayName = event.target.value as string;
    if (this.user.displayName.length <= 1) return;
    this.authService.updateUserData(this.user);
  }, 1000)

  maskCpf(cpf: string): string {
    // Remove all non-digit characters from the input string
    const cleaned = cpf.replace(/\D/g, '');
    // Apply the CPF mask (###.###.###-##)
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
    // If the input string doesn't match the expected format, return the original string
    return cpf;
  }

  debounce<T extends (...args: any[]) => any>(func: T, delay: number) {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    return function(this: unknown, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  buildEmail(): string {
    const nameLenght = this.user.displayName ? this.user.displayName.split(' ').length : 0;
    const names = this.user.displayName ? this.user.displayName.split(' ') : [];
    const firstName = names[0]?.toLowerCase();
    const lastName = names[nameLenght-1]?.toLowerCase();

    if (firstName && lastName && nameLenght > 1) {
      return firstName + '.' + lastName + '@fadba.edu.br';
    } else {
      return this.user.email.split('@')[0] + '@fadba.edu.br';
    }
  }

}
