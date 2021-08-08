import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-shop-list',
    templateUrl: './shop-list.component.html',
    styleUrls: ['./shop-list.component.scss']
})

export class ShopListComponent implements OnInit {
    isGrid = false

    ngOnInit() {
        console.log('ONINIT LIST')
    }

    toggleList() {
        this.isGrid = !this.isGrid
    }

}