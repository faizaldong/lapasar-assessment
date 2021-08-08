import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router} from '@angular/router'
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
        private router: Router,
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
                this.listProducts = data.map(product => {
                    return {
                        ...product,
                        cartTotal: 0
                    }
                })
                const [a, b, c, d, e, f, g, h, i, j, k, ...rest] = this.listProducts
                this.listTempProducts = [a, b, c, d, e, f, g, h, i, j, k]
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
        if (this.productCart.length) {
            const storedIds = this.productCart.map(product => product._id)
            // console.log('storedIds ', storedIds)
            // console.log('selected item ', product._id)
            if (storedIds.includes(product._id)) {
                this.productCart.map((productC: IProducts) => {
                    if (productC._id === product._id) {
                        productC.cartTotal += 1
                    }
                })
            } else {
                product.cartTotal = 1
                this.productCart.push(product)
            }

        } else {
            // console.log('new productCart', product)
            product.cartTotal = 1
            this.productCart.push(product)
        }

        // console.log('total in cart', this.productCart)

        localStorage.setItem('carts', JSON.stringify(this.productCart))
    }

    removeStorage() {
        localStorage.removeItem('carts')
    }

    get getTotalCarts(): any[] {
        let localCarts = localStorage.getItem('carts')
        if (localCarts && JSON.parse(localCarts).length) {
            this.productCart = JSON.parse(localCarts)
            return this.productCart
        } else {
            return []
        }
    }

    viewCart() {
        if (this.productCart.length > 0 ) {
            this.router.navigate(['/cart'])
        }
    }

}