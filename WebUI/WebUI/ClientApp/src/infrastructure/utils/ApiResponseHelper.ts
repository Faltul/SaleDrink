import {IApiError, IApiResponse } from '../../models/ApiResponseModels'
import {ErrorMessage } from '../../constants/ErrorMessage'
import {AxiosError} from 'axios';
import {forEach} from 'lodash';
import { NotificationTypeEnum, NotificationToast } from '../../models/NotificationModels'




export class  ApiResponseHelper {
    
    public static GetErrorMessage<T>(error: IApiError|null): string
    {

        if (!error)
        {
            return '';
        }
        return `${error.message?error.message:''}`
            
    } 

    public static GetErrorGuid<T>(error: IApiError|null): string
    {

        if (!error)
        {
            return '';
        }
        return `${error.errorCode?error.errorCode:''}`
            
    } 
    
    public static GeneratorAxiosError<T>(error: AxiosError): IApiError
    {
        
        let result: IApiError ={
            message:ErrorMessage.ApiRequestError,
            errorCode: null
        }
        return result     
    }
    
    public static GetDefaultObjectResponse<T>(): IApiResponse<T|null>
    {
        
        return {result: true, data: null, error: null, messageId: null} 
    }   

    public static GetDefaultArrayResponse<T>(): IApiResponse<T[]>
    {
        return {result: true, data: [], error: null, messageId: null} 
    }
    
}

