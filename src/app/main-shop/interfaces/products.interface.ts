export interface IProducts {
    active: boolean
    brand: string
    category: string[]
    createdDate: string
    dangerLevel: number
    description: string
    expiry_date: null
    images: string[]
    inventory: number
    isBest: boolean
    isNew: boolean
    model: string
    moq: number
    name: string
    packagesize: number
    price: number
    priceByRegion: IPriceByRegion[]
    priceList: any
    promotions: null
    size: string
    sku: string
    tags: []
    tier: number[]
    version: string
    _id: string
    isAddCart?: boolean
}

interface IPriceByRegion {
    price: number
    _id: string
}