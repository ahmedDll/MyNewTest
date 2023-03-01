export interface PurchasingOrderD {
    orderSerial :number;
    branchCode:number;
    orderYear:number
    itemCode?:number
    itemKind ?:number
    quantity ?:number
    unitPrice?:number
    totalPrice?:number;
    quoteSrial ?:number
    quoteYear?:number
    discountPrecentage?:number
    discountValue?:number
    taxprecentage?:number
    taxes?:number
    netCost?:number
    notes?:string


}
