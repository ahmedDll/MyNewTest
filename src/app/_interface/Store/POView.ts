import { PurchasingOrderD } from "./PurchasingOrderD";

export interface POView {
    orderSerial :number;
    orderYear:number ;
    orderDate?:Date
    supplierCode ?:number
    storeCode ?:number
    netCost?:number
    purchaseNoteYear?:number;
    purchaseNoteSerial ?:number
    TechnicalSerial?:number
    TechnicalYear?:number
    branchCode:number
    type:number;
    tempNoteID:number
    notes:string
    Details?:PurchasingOrderD[]

}
