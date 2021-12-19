import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { orderBy } from 'lodash';
import { Banknote } from '../models/BanknoteModels';
import { Drink } from '../models/DrinkModels';
import { NotificationTypeEnum, NotificationToast } from '../models/NotificationModels'
import { ToastNotificationManager } from '../infrastructure/ToastNotificationManager'
import { ApiResponseHelper } from '../infrastructure/utils/ApiResponseHelper'
import { BanknoteRequests } from '../apiRequests/BanknoteRequests';
import { DrinkRequests } from '../apiRequests/DrinkRequests';



export interface SaleDrinkState {
    isLoading: boolean;
    banknotes: Banknote[];
    drinks: Drink[];
}


export interface InitSaleDrinkAction {
    type: 'INIT_SALE_DRINK';
}

export interface UnMountSaleDrinkAction {
    type: 'UNMOUNT_SALE_DRINK';
}

export interface RequestSaleDrinkDataAction {
    type: 'REQUEST_SALE_DRINK_DATA';
}

export interface ReceiveSaleDrinkDataAction {
    type: 'RECEIVE_SALE_DRINK_DATA';
    banknotes: Banknote[];
    drinks: Drink[];
}

export interface ErrorSaleDrinkDataAction {
    type: 'ERROR_SALE_DRINK_DATA';
}

export interface ChangeBanknotesAction {
    type: 'CHANGE_BANKNOTES';
    banknotes: Banknote[];
}

export interface ChangeDrinksAction {
    type: 'CHANGE_DRINKS';
    drinks: Drink[];
}



type KnownAction = InitSaleDrinkAction | UnMountSaleDrinkAction |
    RequestSaleDrinkDataAction | ReceiveSaleDrinkDataAction |
    ErrorSaleDrinkDataAction | ChangeBanknotesAction | ChangeDrinksAction;

const apiBanknoteRequest = new BanknoteRequests();
const apiDrinkRequest = new DrinkRequests();


export const actionCreators = {

    InitSaleDrinkAction: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        apiBanknoteRequest.Init();
        apiDrinkRequest.Init();

        dispatch({
            type: 'INIT_SALE_DRINK',
        });

    },
    UnMountSaleDrinkAction: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        apiBanknoteRequest.Abort();
        apiDrinkRequest.Abort();
        dispatch({
            type: 'UNMOUNT_SALE_DRINK',
        });

    },
    GetSaleDrinkDataAction: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({ type: 'REQUEST_SALE_DRINK_DATA' });
        let result = await Promise.all([
            apiBanknoteRequest.GetBanknotes(),
            apiDrinkRequest.GetDrinks(),
        ])
        if (!result.some(item => item.result === false)) {
            dispatch({
                type: 'RECEIVE_SALE_DRINK_DATA',
                banknotes: orderBy(result[0].data, item => item.nominalValue),
                drinks: orderBy(result[1].data, item => item.label),
            });

        }
        else {
            let apiError = result.find(item => item.result === false);
            if (apiError) {
                let notificationError: NotificationToast = {
                    type: NotificationTypeEnum.danger,
                    message: `Данные по товару. ${ApiResponseHelper.GetErrorMessage(apiError.error)}`,
                    additionalMessage: ApiResponseHelper.GetErrorGuid(apiError.error)
                }
                ToastNotificationManager.SendToast(notificationError);
            }

            dispatch({ type: 'ERROR_SALE_DRINK_DATA' });
        }


    },
    ChangeBanknoteAction: (banknote: Banknote): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        let banknotes = getState().saleDrink?.banknotes?.slice()||[];
        let index = banknotes.findIndex(item=>item.id===banknote.id);
        if (index>=0)
        {
            banknotes[index]=banknote;
        }
        dispatch({
            type: 'CHANGE_BANKNOTES',
            banknotes: banknotes
        });

    },

    ChangeDrinkAction: (drink: Drink): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        let drinks = getState().saleDrink?.drinks?.slice()||[];
        let index = drinks.findIndex(item=>item.id===drink.id);
        if (index>=0)
        {
            drinks[index]=drink;
        }
        dispatch({
            type: 'CHANGE_DRINKS',
            drinks: drinks
        });

    },

};


const unloadedState: SaleDrinkState = {
    isLoading: false, banknotes: [],
    drinks: []
};

export const reducer: Reducer<SaleDrinkState> = (state: SaleDrinkState | undefined, incomingAction: Action): SaleDrinkState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'INIT_SALE_DRINK':
            return {
                ...state,
            };

        case 'REQUEST_SALE_DRINK_DATA':
            return {
                ...state,
                isLoading: true,
            };
        case 'RECEIVE_SALE_DRINK_DATA':
            return {
                ...state,
                isLoading: false,
                banknotes: action.banknotes,
                drinks: action.drinks,
            };
        case 'ERROR_SALE_DRINK_DATA':
            return {
                ...state,
                isLoading: false,
                banknotes: [],
                drinks: []
            }
        case 'CHANGE_BANKNOTES':
            return {
                ...state,
                banknotes: action.banknotes,
            };
        case 'CHANGE_DRINKS':
            return {
                ...state,
                drinks: action.drinks,
            };
        case 'UNMOUNT_SALE_DRINK':
            return {
                ...unloadedState
            }
        default:
            return state;
    }

};
