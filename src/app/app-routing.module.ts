import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import {AdminPage} from 'src/app/layout/admin/admin.page';

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
    canActivate: [AuthGuard],
    data: { lunchLadyRole: true } ,
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
    path: 'profil/:idUser',
    canActivate: [AuthGuard],
    loadChildren: () => import('./layout/profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./layout/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./layout/inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'meal/:mealId',
    loadChildren: () => import('./layout/detail-meal/detail-meal.module').then( m => m.DetailMealPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./layout/cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'gestion-commande',
    loadChildren: () => import('./layout/pages_admin/gestion-commande/gestion-commande.module').then( m => m.GestionCommandePageModule)
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
