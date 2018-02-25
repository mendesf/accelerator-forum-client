import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  user = AuthService.getUser();
  searchText = '';
  @Input() activeLink = '';
  @Output() search = new EventEmitter();

  constructor(
    private router: Router,
    private location: Location) { }

  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  goHome(): void {
    const homeUrl = '/posts';
    if (this.location.path() !== homeUrl) {
      this.router.navigate([homeUrl]);
    } else {
      this.search.emit();
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  async onSearch(event: Event): Promise<void> {
    event.preventDefault();
    console.log(this.searchText);
    this.search.emit(this.searchText);
  }

}
