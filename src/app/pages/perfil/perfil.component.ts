import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { UsersService } from '../../services/users.service';
import { UsersDtoTs } from '../../dtos/users.dto';

@Component({
  selector: 'app-perfil',
  imports: [NgClass],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  perfil: UsersDtoTs = new UsersDtoTs();
  constructor(private readonly _service: UsersService) {}

  ngOnInit(): void {
    this._service.getProfile().subscribe((response) => {
      this.perfil = response;
    });
  }
}
