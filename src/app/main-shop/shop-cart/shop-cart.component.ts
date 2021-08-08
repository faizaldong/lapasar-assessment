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
        const carts = localStorage.getItem('carts')
        if (this.getCartsStored.length) {
            this.listCarts = this.getCartsStored
        } else {
            this.router.navigate(['/list'])
        }
    }
    
    convertCentToRM(price: number) {
        return (price * 0.004163).toFixed(2);
    }

    productPrice(item: IProducts) {
        return item.cartTotal * +this.convertCentToRM(item.price)
    }

    setItemTotal(item: IProducts, event: string) {
        if (event === 'dec') {
            if (item.cartTotal == 1)
                return
            item.cartTotal -= 1
        } else {
            item.cartTotal += 1
        }
    }

    removeItem(product: IProducts, index: number) {
        this.listCarts.splice(index, 1)
        localStorage.setItem('carts', JSON.stringify(this.listCarts))
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
