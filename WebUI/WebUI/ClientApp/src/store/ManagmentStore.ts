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



export interface ManagmentState {
    key: string|null;
}


export interface SetKeyAction {
    type: 'SET_KEY',
    key:string

}

type KnownAction = SetKeyAction ;




export const actionCreators = {

    SetKeyAction: (key: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({
            type: 'SET_KEY',
            key: key
        });

    },
   

};


const unloadedState: ManagmentState = {
    key: null
};

export const reducer: Reducer<ManagmentState> = (state: ManagmentState | undefined, incomingAction: Action): ManagmentState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SET_KEY':
            return {
                ...state,
                key: action.key
            };
        default:
            return state;
    }

};
