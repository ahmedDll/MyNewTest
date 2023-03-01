import { Iinvoice } from "./Iinvoice";
import { ReceivingPermissionH } from "./ReceivePermissionH";

export interface InvoiceView{
  invoice:Iinvoice
  receivingPermissionH:ReceivingPermissionH[]
}
