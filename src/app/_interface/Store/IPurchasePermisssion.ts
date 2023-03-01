import { IPurchasePermisssionD } from "./IPurchasePermisssionD";

export interface IPurchasePermisssion{
     receiptSerial :number
    receiptYear :number
     pOSerial :number
    pOYear :number
     receiptDate:Date
    supplierCode:number
     storeCode :number
     details:IPurchasePermisssionD[];

}