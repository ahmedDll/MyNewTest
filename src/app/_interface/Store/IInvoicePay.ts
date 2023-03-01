export interface IInvoicePay {
    serial: number;
    invoiceBranchCode: number;
    invoiceYear: number;
    invoiceType: number;
    invoiceSerial: number;
    safeTrxTypeCode: number;
    safeYear: number;
    safeSerial: number;
    payDate: string | null;
    invoiceAmont: number | null;
    payAmont: number | null;
    diffAmont: number | null;
    name: string;
    custCode: number | null;
    safeCode: number | null;
    bankCode: number | null;
    payType: number | null;
}