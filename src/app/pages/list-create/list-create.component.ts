import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '@model/user';
import { UserStore } from 'app/core/store/user';

@Component({
  selector: 'app-list-create',
  imports: [CommonModule,FormsModule],
  templateUrl: './list-create.component.html',
  styleUrl: './list-create.component.scss'
})
export class ListCreateComponent {
  userForm: Partial<User> = {
    name: '',
    avatar: '',
    address: '',
  };
  #router = inject(Router);
  userStore = inject(UserStore);
  back(){
    this.#router.navigateByUrl(`list`)
  }

  eff = effect(() => {
   
  });
  ngOnInit(): void {

  }
  submit(user: User) {
    this.userForm = {
      ...this.userForm,
      ...user,
    };
    this.userStore.createUser(user);
    console.log(this.userStore.data());
    
  }

}
