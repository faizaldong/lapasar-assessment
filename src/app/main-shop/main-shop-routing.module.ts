import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopCartComponent, ShopListComponent} from '@src/app/main-shop'

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
      path: 'list',
      component: ShopListComponent
  },
  {
      path: 'cart',
      component: ShopCartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainShopRoutingModule { }
