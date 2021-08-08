import { Component, OnInit, OnDestroy } from '@angular/core'
import { ItemsService } from '@app/main-shop'
import { Subject, interval } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators'
import { IProducts } from '../interfaces/products.interface'

import * as _ from 'lodash'

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss']
})

export class ShopListComponent implements OnInit, OnDestroy {
    isGrid = false
    isnotAsc = true
    listProducts: IProducts[] = []
    listTempProducts: IProducts[] = []
    productCart: IProducts[] = []

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private _itemsService: ItemsService
    ) {}

    ngOnInit() {
        this.getListProducts()
        this.getTotalCarts()
        // localStorage.removeItem('carts')
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    toggleList() {
        this.isGrid = !this.isGrid
    }

    getTotalCarts() {
        const carts = localStorage.getItem('carts')
        if (carts)
            this.productCart = JSON.parse(carts)
    }

    getListProducts() {
        this._itemsService.getProducts().pipe(
            takeUntil(this.destroy$),
            tap((data: IProducts[]) => {
                console.log('on first load product in Cart ',this.productCart)
                this.listProducts = data.map(product => {
                    return {
                        ...product,
                        // isAddCart: (this.productCart.length && this.productCart.map((productC: IProducts) => productC._id == product._id)) ? true : false
                    }
                })
                const [a, b, c, d, e, f, g, h, i, j, k, ...rest] = this.listProducts
                this.listTempProducts = [a, b, c, d, e, f, g, h, i, j, k]
                this.listProducts = [a, b, c, d, e, f, g, h, i, j, k]
                console.log('on first load ',this.listProducts)

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

    searchProductName(search: any) {
        const name =search.target.value
        const prodList = this.listTempProducts
        if (Boolean(name)) {
            this.listProducts = _.filter(prodList, {name})
        } else {
            this.listProducts = this.listTempProducts
        }

    }

    sortProduct() {
        this.isnotAsc = !this.isnotAsc
        const prodList = this.listTempProducts
        this.listProducts = this.isnotAsc ? _.orderBy(prodList, ['name'], ['desc']) : _.orderBy(prodList, ['name'], ['asc'])
    }

    addToCart(product: IProducts, index: number) {
        this.listProducts[index].isAddCart = true
        this.productCart.push(product)
        localStorage.setItem('carts', JSON.stringify(this.productCart))
        console.log('after add to cart ',this.listProducts)
    }

}