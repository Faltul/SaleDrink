

export class Settings {
 


    public static get RootUrl(): string {
        return `https://localhost:3000`;
    }

    public static get ApplicationAPIBaseUrl(): string {
        return `https://localhost:44380/api`;
    }

 


    public static get LowQuantityDrink(): number {
        return 1;
    }

    public static get MiddleQuantityDrink(): number {
        return 15;
    }

    public static get HighQuantityDrink(): number {
        return 25;
    }

    

  

    
}

