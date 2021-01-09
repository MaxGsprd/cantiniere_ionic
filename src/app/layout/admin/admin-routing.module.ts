import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'gestion-commande',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages_admin/gestion-commande/gestion-commande.module').then(m => m.GestionCommandePageModule)
          }
        ]
      },
      {
        path: 'gestion-utilisateur',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages_admin/gestion-utilisateur/gestion-utilisateur.module').then(m => m.GestionUtilisateurPageModule)
          }
        ]
      },
      {
        path: 'gestion-menu',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages_admin/gestion-menu/gestion-menu.module').then(m => m.GestionMenuPageModule)
          }
        ]
      },
      {
        path: 'gestion-meal',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages_admin/gestion-meal/gestion-meal.module').then(m => m.GestionMealPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: 'gestion-commande',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'gestion-commande',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
