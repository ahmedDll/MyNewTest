export interface IItem {

    itemCode: number;
    itemName : string;
    itemKind:number;
    measruingUnit:number;
    sTax : any;
    notes: string;
    notactive:boolean;
    createDate: Date;
    createUserId:number;
    updateDate:Date;
    updateUserId:number;
    mainGroupCode:number;
    subGroupCode :number;
}
