import store  from "../index"
import { Settings } from "./Settings"


import { matchPath } from "react-router-dom"

export class ApiUrls {

    private static GetKey(): string
    {
        var state = store.getState().managment;
        if (state.key)
        {
            return state.key;
        }
        else
        {
            return ""; 
        }
    }

    public static ApplicationAPIBaseUrl: string = Settings.ApplicationAPIBaseUrl

    public static GetDrinks: string = `${ApiUrls.ApplicationAPIBaseUrl}/Drink/GetDrinks`
    public static SaleDrink: string = `${ApiUrls.ApplicationAPIBaseUrl}/Drink/SaleDrink`
    public static get CreateDrink(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Drink/${ApiUrls.GetKey()}/CreateDrink`;
    } 
    public static get UpdateDrink(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Drink/${ApiUrls.GetKey()}/UpdateDrink`;
    } 
    public static get DeleteDrink(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Drink/${ApiUrls.GetKey()}/DeleteDrink`;
    } 
    public static get GetDrinksInformation(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Drink/${ApiUrls.GetKey()}/GetDrinks`;
    } 

    public static GetBanknotes: string = `${ApiUrls.ApplicationAPIBaseUrl}/Banknote/GetBanknotes`
    public static get CreateBanknote(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Banknote/${ApiUrls.GetKey()}/CreateBanknote`;
    } 
    public static get UpdateBanknote(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Banknote/${ApiUrls.GetKey()}/UpdateBanknote`;
    } 
    public static get DeleteBanknote(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Banknote/${ApiUrls.GetKey()}/DeleteBanknote`;
    } 
    public static get GetBanknotesInformation(): string
    {
        return  `${ApiUrls.ApplicationAPIBaseUrl}/Banknote/${ApiUrls.GetKey()}/GetBanknotesInformation`;
    } 

    public static SaleDrinkHub: string = `${ApiUrls.ApplicationAPIBaseUrl}/hubs/Notification`

  
}