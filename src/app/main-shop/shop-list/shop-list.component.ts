import { Component, OnInit, OnDestroy } from '@angular/core'
import { ItemsService } from '@app/main-shop'
import { tap } from 'rxjs/operators'

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss']
})

export class ShopListComponent implements OnInit, OnDestroy {
    isGrid = false

    constructor(
        private _itemsService: ItemsService
    ) {}

    ngOnInit() {
        this.getListProducts()
    }

    ngOnDestroy() {

    }

    toggleList() {
        this.isGrid = !this.isGrid
    }

    getListProducts() {
        this._itemsService.getProducts().pipe(
            tap(data => {
                console.log(data)
            })
        ).subscribe()
    }

}