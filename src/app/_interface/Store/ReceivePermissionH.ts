export interface ReceivingPermissionH {
      branchCode: number;
      receivingPermissionYear: number;
      type: number;
      invType: number ;
      invYear: number ;
      invSerial: number;
      receivingPermissionSerial: number;
      receivingPermissionDate: Date;
      supplierCode: number | null;
      storeCode: number;
      custCode: number | null;
      costCenterCode: number | null;
      toStore: number | null;
      toBranchCode: number | null;
      qCSerial: number | null;
      qCYear: number | null;
      notes: string;
      netPrice: number | null;
      createDate: string | null;
      createUserId: number | null;
      closeYN: boolean | null;
      updateDate: string | null;
      updateUserId: number | null;
      totaltax: number | null;
      totaldisc: number | null;
      posted: boolean | null;
      safeCode:number ;
      trxYear:number | 0 ;
      journalCode:number | 0 ;
      trxPeriod:number | 0;
      trxSerial:number| 0 ;
      periodid:number | 0;
      otherDisc:number | 0;
      rType:number | 0;
      rSerial:number | 0;
      rYear:number | 0;
      bankCode:number | 0;
      payType:number | 0;
      salesRep:number | 0;

      otherDiscPer :number | 0;
      invoiceDate :Date ;
      invoiceSerial :string
  }