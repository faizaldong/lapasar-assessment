import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { ShopCartComponent, ShopListComponent, MainShopRoutingModule} from '@src/app/main-shop'


@NgModule({
  declarations: [
    ShopCartComponent,
    ShopListComponent
  ],
  imports: [
    MainShopRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class MainShopModule { }
