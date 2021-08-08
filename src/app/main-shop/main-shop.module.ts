import { NgModule } from '@angular/core';
import { ShopCartComponent, ShopListComponent, MainShopRoutingModule} from '@src/app/main-shop'


@NgModule({
  declarations: [
    ShopCartComponent,
    ShopListComponent
  ],
  imports: [
    MainShopRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class MainShopModule { }
