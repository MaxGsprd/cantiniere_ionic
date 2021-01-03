import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '\home',
    loadChildren: () => import('./layout/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./layout/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./layout/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'menus',
    loadChildren: () => import('./layout/menus/menus.module').then( m => m.MenusPageModule)
  },
  {
    path: 'profil',
    loadChildren: () => import('./layout/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
