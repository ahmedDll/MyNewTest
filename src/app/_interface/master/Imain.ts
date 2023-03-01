import { ISub } from 'src/app/_interface/master/Isub';
export interface IMain {

    mainBodyCode: number,
    mainBodyAraName: string,
    mainBodyEngName: string,
    notActive:boolean,

    userId:number,
    dateAndTime:Date,
    createUserId:number,
    createDateAndTime:Date,
    subBodies:ISub[]
}
