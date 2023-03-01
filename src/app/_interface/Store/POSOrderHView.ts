export interface POSOrderHView {
    orderSerial :number;
    orderYear:number ;
    orderDate?:Date 
    supplierName ?:string
    supplierCode ?:number
    storeName ?:string
    netCost?:number
    purchaseNoteYear?:number;
    purchaseNoteSerial ?:number

    closeYN?:boolean 
}
