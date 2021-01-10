import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { AdminPage } from 'src/app/layout/admin/admin.page';

const routes: Routes = [
  {
    path: '\accueil',
    loadChildren: () => import('./layout/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: '/accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    loadChildren: () => import('./layout/home/home.module').then( m => m.HomePageModule)
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
    loadChildren: () => import('./layout/profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
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
    path: 'new-meal',
    loadChildren: () => import('./layout/new-meal/new-meal.module').then( m => m.NewMealPageModule)
  },
  {
    path: 'new-menu',
    loadChildren: () => import('./layout/new-menu/new-menu.module').then( m => m.NewMenuPageModule)
  },
  {
    path: 'new-ingredient',
    loadChildren: () => import('./layout/new-ingredient/new-ingredient.module').then( m => m.NewIngredientPageModule)
  },
  {
    path: 'modif-menu/:menuId',
    loadChildren: () => import('./layout/modif-menu/modif-menu.module').then( m => m.ModifMenuPageModule)
  },
  {
    path: 'modif-meal/:mealId',
    loadChildren: () => import('./layout/modif-meal/modif-meal.module').then( m => m.ModifMealPageModule)
  },
  {
    path: '**',
    redirectTo: 'accueil',
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
