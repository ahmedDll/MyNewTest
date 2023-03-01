export interface ReceivePermissionD {
      branchCode: number;
      receivingPermissionYear: number;
      type: number;
      receivingPermissionSerial: number;
      lineNo: number;
      itemCode: number;
      uomCode: number | null;
      uomRate: number | null;
      displayQty: number | null;
      quantity: number | null;
      unitPrice: number | null;
      displayUnitPrice: number | null;
      totalPrice: number | null;
      discountPrecentage: number | null;
      discountValue: number | null;
      taxPrecentage: number | null;
      taxes: number | null;
      netCost: number | null;
      notes: string;
      lotNo: number | null;
      expireDate: string | null;
      cprice: number | null;
      fprice: number | null;
  }