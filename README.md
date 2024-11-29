npx -p @angular/cli ng new angular-app;
#lib ngx install
npm install @ngrx/operators  --save -f
npm install @ngrx/signals --save -f  

# สร้าง pages
ng g c list
# สร้าง routes
``` app.routes.ts ```
``` 
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
    path: 'list-edit/:id',
    component: ListEditComponent,
    pathMatch:'full'
  },
  // กรณีที่ใน app ไม่มี page นั่น
  {
    path: '**',
    redirectTo: 'list'//<-- ไปยังหน้า list ,
  },
];

```
# สร้าง http 
ng g s Data

# สร้าง environments
ng g environments 
 