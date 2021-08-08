import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router} from '@angular/router'
import { ItemsService } from '@app/main-shop'
import { Subject, interval } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators'
import { IProducts } from '../interfaces/products.interface'

import {filter, orderBy} from 'lodash'
import { environment } from '@src/environments/environment';

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
    apiurl = `${environment.domain}${environment.products}`

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
                const listProducts = data.map(product => {
                    return {
                        ...product,
                        cartTotal: 0,
                        totalAmount: 0
                    }
                })
                const [a, b, c, d, e, f, ...rest] = listProducts

                // get few data from array
                this.listTempProducts = [a, b, c, d, e, f]
                this.listProducts = [a, b, c, d, e, f]
            })
        ).subscribe()
    }

    getImage(product: IProducts) {
        this._itemsService.getProducts(product._id, product.images[0]).pipe(
            tap((file: any) => console.log(file))
        ).subscribe()
    }

    searchProductName(search: any) {
        const name =search.target.value
        const prodList = this.listTempProducts
        if (Boolean(name)) {
            this.listProducts = filter(prodList, {name})
        } else {
            this.listProducts = this.listTempProducts
        }

    }

    sortProduct() {
        this.isnotAsc = !this.isnotAsc
        const prodList = this.listTempProducts
        this.listProducts = this.isnotAsc ? orderBy(prodList, ['name'], ['desc']) : orderBy(prodList, ['name'], ['asc'])
    }

    convertCentToRM(price: number) {
        return (price / 100).toFixed(2)
    }

    productPrice(item: IProducts) {
        return (item.cartTotal * +this.convertCentToRM(item.price)).toFixed(2)
    }

    addToCart(product: IProducts, index: number) {
        if (this.productCart.length) {
            const storedIds = this.productCart.map(product => product._id)
            if (storedIds.includes(product._id)) {
                this.productCart.map((productC: IProducts) => {
                    if (productC._id === product._id) {
                        productC.cartTotal += 1
                        productC.totalAmount = +this.productPrice(productC)
                    }
                })
            } else {
                product.cartTotal = 1
                product.totalAmount = +this.productPrice(product)
                this.productCart.push(product)
            }

        } else {
            product.cartTotal = 1
            product.totalAmount = +this.productPrice(product)
            this.productCart.push(product)
        }

        localStorage.setItem('carts', JSON.stringify(this.productCart))
    }

    removeStorage() {
        localStorage.removeItem('carts')
        this.productCart = []
    }

    viewCart() {
        if (this.productCart.length > 0 ) {
            this.router.navigate(['/cart'])
        }
    }

    fileImage(item: IProducts) {
        return `${this.apiurl}/${item._id}/${item.images[0]}`
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

}