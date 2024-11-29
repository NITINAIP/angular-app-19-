import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@model/user';
import { UserStore } from 'app/core/store/user';

@Component({
  selector: 'app-list-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-edit.component.html',
  styleUrl: './list-edit.component.scss',
})
export class ListEditComponent implements OnInit {
  editForm: Partial<User> = {
    name: '',
    avatar: '',
    address: '',
    id: '',
  };
  #router = inject(Router);
  back(){
    this.#router.navigateByUrl(`list`)
  }
  userStore = inject(UserStore);
  id = input<string>(``);
  eff = effect(() => {
    console.log(this.id(), 'path param');
    if (this.userStore.userSelected()) {
      this.editForm = {
        ...this.userStore.userSelected(),
      };
    }
  });
  ngOnInit(): void {
    if (this.id()) {
      this.userStore.fetchDataById(this.id());
    }
  }
  submit(user: User) {
    this.editForm = {
      ...this.editForm,
      ...user,
    };
    this.userStore.updateUser(user);
  }
}
