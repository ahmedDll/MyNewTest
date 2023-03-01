import { IEventDetails } from "./ieventDetails";

export interface IPromotionEvents {
    serial: number;
    eventTopic: string;
    startDate: string;
    endDate: string;
    eventDescription: string;
    maxParticipants: number;
    imagePath: string;
    stations: number[];
    promotionDetails: IEventDetails[];
}