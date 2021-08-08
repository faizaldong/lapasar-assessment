import { Component, OnInit, OnDestroy } from '@angular/core'
import { ItemsService } from '@app/main-shop'
import { Subject, interval } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators'
import { IProducts } from '../interfaces/products.interface'

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss']
})

export class ShopListComponent implements OnInit, OnDestroy {
    isGrid = false
    listProducts: IProducts[] = []
    productCart: IProducts[] = []

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _itemsService: ItemsService
    ) {}

    ngOnInit() {
        this.getListProducts()
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    toggleList() {
        this.isGrid = !this.isGrid
    }

    getListProducts() {
        this._itemsService.getProducts().pipe(
            takeUntil(this.destroy$),
            tap((data: IProducts[]) => {
                this.listProducts = data
                const [a, b, c, d, e, f, g, h, i, j, k, ...rest] = this.listProducts
                this.listProducts = [a, b, c, d, e, f, g, h, i, j, k]
            })
        ).subscribe()
    }

    getImage(product: IProducts) {
        return
        this._itemsService.getProducts(product._id, product.images[0]).pipe(
            tap((file: any) => console.log(file))
        ).subscribe()
    }

    convertCentToRM(price: number) {
        return (price * 0.004163).toFixed(2);
    }

    addToCart(product: IProducts) {
        this.productCart.push(product)
    }

}