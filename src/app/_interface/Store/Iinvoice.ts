export interface Iinvoice{
branchCode  :number
year  :number
type  :number
serial :number
invoiceDate :Date
total  :number
 totalDisc  :number
totalTax  :number
 netPrice  :number
 gaPosted  :boolean
 custCode  :number
 suppCode  :number
 name  :string
 safeTrxTypeCode?  :number 
 safeYear?  :number
 safeSerial?  :number
 autogeneration?  :boolean
 safeTrxTypeCode1?  :number 
 safeYear1?  :number
 safeSerial1?  :number
 trxYear?  :number
 journalCode?  :number
 trxPeriod?  :number
 trxSerial?  :number
 periodid:number;
 otherDisc?:number;
 payamount?:number;

}
