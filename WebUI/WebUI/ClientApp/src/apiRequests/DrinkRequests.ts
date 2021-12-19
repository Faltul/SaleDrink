import axios, { AxiosError, CancelTokenSource } from 'axios';
import { ApiUrls } from '../constants/ApiUrls'
import { ApiResponseHelper } from '../infrastructure/utils/ApiResponseHelper'
import { IApiResponse } from '../models/ApiResponseModels'
import { Drink, SaleDrinkCommand, SaleDrinkRefund, DrinkCreateCommand, DrinkUpdateCommand } from "../models/DrinkModels"

export class DrinkRequests {
  private cancelTokenSource?: CancelTokenSource


  public Init(): void {
    this.cancelTokenSource = axios.CancelToken.source();
  }

  public Abort(): void {
    this.cancelTokenSource?.cancel();

  }

  public async GetDrinks(): Promise<IApiResponse<Drink[]>> {
    return await axios.get<IApiResponse<Drink[]>>(`${ApiUrls.GetDrinks}`,
      { cancelToken: this.cancelTokenSource?.token })
      .then(response => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          return { result: true, data: [], error: null, messageId: null }
        }
        return { result: false, data: [], error: ApiResponseHelper.GeneratorAxiosError(error), messageId: null }
      })
  }
  public async SaleDrink(sale: SaleDrinkCommand): Promise<IApiResponse<SaleDrinkRefund | null>> {

    return await axios.post<IApiResponse<SaleDrinkRefund | null>>(`${ApiUrls.SaleDrink}`,
      {
        ...sale
      },
      { cancelToken: this.cancelTokenSource?.token })
      .then(response => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          return { result: true, data: null, error: null, messageId: null }
        }
        return { result: false, data: null, error: ApiResponseHelper.GeneratorAxiosError(error), messageId: null }
      })
  }


  public async CreateDrink(drink: DrinkCreateCommand): Promise<IApiResponse<string | null>> {

    return await axios.post<IApiResponse<string | null>>(`${ApiUrls.CreateDrink}`,
      {
        ...drink
      },
      { cancelToken: this.cancelTokenSource?.token })
      .then(response => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          return { result: true, data: null, error: null, messageId: null }
        }
        return { result: false, data: null, error: ApiResponseHelper.GeneratorAxiosError(error), messageId: null }
      })
  }

  public async UpdateDrink(drink: DrinkUpdateCommand): Promise<IApiResponse<{} | null>> {

    return await axios.put<IApiResponse<{} | null>>(`${ApiUrls.UpdateDrink}`,
      {
        ...drink
      },
      { cancelToken: this.cancelTokenSource?.token })
      .then(response => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          return { result: true, data: null, error: null, messageId: null }
        }
        return { result: false, data: null, error: ApiResponseHelper.GeneratorAxiosError(error), messageId: null }
      })
  }

  public async DeleteDrink(drinkId: string): Promise<IApiResponse<{} | null>> {

    return await axios.delete<IApiResponse<{} | null>>(`${ApiUrls.UpdateDrink}?drinkId=${drinkId}`,

      { cancelToken: this.cancelTokenSource?.token })
      .then(response => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        if (axios.isCancel(error)) {
          return { result: true, data: null, error: null, messageId: null }
        }
        return { result: false, data: null, error: ApiResponseHelper.GeneratorAxiosError(error), messageId: null }
      })
  }

}