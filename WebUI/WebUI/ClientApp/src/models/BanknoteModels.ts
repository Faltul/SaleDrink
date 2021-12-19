
export interface Banknote
{
    id: string;
    label: string;
    nominalValue: number;
    isActive: boolean;
}

export interface BanknoteShort
{
    label: string;
    nominalValue: number;
}

export interface RefundBanknote
{
    quantity: number;
    banknote: BanknoteShort; 
}


export interface BanknoteCreateCommand
{
    label: string;
    nominalValue: number;
    isActive: boolean;
}

export interface BanknoteUpdateCommand
{
    id: string;
    label: string;
    nominalValue: number;
    isActive: boolean;
}
