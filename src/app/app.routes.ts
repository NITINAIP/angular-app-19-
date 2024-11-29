import { Routes } from '@angular/router';
import { ListCreateComponent } from '@pages/list-create/list-create.component';
import { ListEditComponent } from '@pages/list-edit/list-edit.component';
import { ListComponent } from '@pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch:'full'
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'list-create',
    component: ListCreateComponent,
  },
  {
    path: 'list-edit/:id',
    component: ListEditComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
