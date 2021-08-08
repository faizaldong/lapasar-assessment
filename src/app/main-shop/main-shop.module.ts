import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpClientModule }    from '@angular/common/http';
import { ShopCartComponent, ShopListComponent, MainShopRoutingModule} from '@src/app/main-shop'


@NgModule({
  declarations: [
    ShopCartComponent,
    ShopListComponent
  ],
  imports: [
    MainShopRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class MainShopModule { }
