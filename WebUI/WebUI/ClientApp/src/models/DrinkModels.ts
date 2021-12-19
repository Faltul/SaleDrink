import {RefundBanknote, Banknote} from './BanknoteModels'




export interface Drink
{
    id: string;
    label: string;
    price:number;
    quantity: number;
    isActive: boolean;
}

export interface SaleDrinkRefund
{
    amount:number;
    refundBanknotes: RefundBanknote[]; 

}


export interface SaleDrinkCommand
{
    drinkId: string;
    banknotesId: string[]

}

export interface DrinkCreateCommand
{
    label: string;
    price:number;
    quantity: number;
    isActive: boolean;
}

export interface DrinkUpdateCommand
{
    id: string;
    label: string;
    price:number;
    quantity: number;
    isActive: boolean;
}


