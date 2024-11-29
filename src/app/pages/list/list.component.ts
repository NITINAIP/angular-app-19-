import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@model/user';
import { UserStore } from 'app/core/store/user';

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  ngOnInit(): void {
    this.userStore.fetchData();
  }
  #router = inject(Router)
  userStore = inject(UserStore)

  onEdit(user:User){
    this.  #router.navigateByUrl(`list-edit/${user.id}`)
  }
  onCreate(){
    this.  #router.navigateByUrl(`list-create`)
  }
  onDelete(user:User){
    const i = confirm(`ต้องการลบใช่หรือไม่?`)
    if(i){
      this.userStore.deleteUser(user.id)

    }
  }
}
