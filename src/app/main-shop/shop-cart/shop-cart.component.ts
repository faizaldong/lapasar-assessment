import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { IProducts } from '../interfaces/products.interface'
import * as _ from 'lodash'

@Component({
    selector: 'app-shop-cart',
    templateUrl: './shop-cart.component.html',
    styleUrls: ['./shop-cart.component.scss']
})

export class ShopCartComponent implements OnInit {
    listCarts: IProducts[] = []

    constructor(
        private router: Router
    ) {}

    ngOnInit() {
        this.getAllProductCart()
    }

    getAllProductCart() {
        if (this.getCartsStored.length) {
            this.listCarts = this.getCartsStored
        } else {
            this.router.navigate(['/list'])
        }
    }
    
    convertCentToRM(price: number) {
        return price / 100
    }

    productPrice(item: IProducts) {
        return (item.cartTotal * +this.convertCentToRM(item.price)).toFixed(2)
    }

    setItemTotal(item: IProducts, event: string) {
        if (event === 'dec') {
            if (item.cartTotal == 1)
                return
            this.listCarts.map((cart: IProducts) => {
                if (cart._id === item._id) {
                    cart.cartTotal -= 1
                    cart.totalAmount = +this.productPrice(cart)
                }
            })
        } else {
            this.listCarts.map((cart: IProducts) => {
                if (cart._id === item._id) {
                    cart.cartTotal += 1
                    cart.totalAmount = +this.productPrice(cart)
                }
            })
        }

        localStorage.setItem('carts', JSON.stringify(this.listCarts))
    }

    removeItem(product: IProducts, index: number) {
        this.listCarts.splice(index, 1)
        localStorage.setItem('carts', JSON.stringify(this.listCarts))
    }

    get totalAmount() {
        let total = 0
        if (this.listCarts.length)
            return (total += this.listCarts.reduce((sum, current) => sum + current.totalAmount, 0.0)).toFixed(2)
        return 0
    }

    get getCartsStored(): IProducts[] {
        let localCarts = localStorage.getItem('carts')
        if (localCarts && JSON.parse(localCarts).length) {
            return JSON.parse(localCarts)
        } else {
            return []
        }
    }
}
