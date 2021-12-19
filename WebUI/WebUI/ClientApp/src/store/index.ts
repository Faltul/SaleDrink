import * as SaleDrinkStore from './SaleDrinkStore';
import * as ManagmentStore from './ManagmentStore';

export interface ApplicationState {
    saleDrink: SaleDrinkStore.SaleDrinkState | undefined;
    managment: ManagmentStore.ManagmentState | undefined;
}


export const reducers = {
    saleDrink: SaleDrinkStore.reducer,
    managment: ManagmentStore.reducer,

};


export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
