import axios, { AxiosError, CancelTokenSource } from 'axios';
import { ApiUrls } from '../constants/ApiUrls'
import { ApiResponseHelper } from '../infrastructure/utils/ApiResponseHelper'
import { IApiResponse } from '../models/ApiResponseModels'
import { Banknote, BanknoteCreateCommand, BanknoteUpdateCommand } from "../models/BanknoteModels"

export class BanknoteRequests {
  private cancelTokenSource?: CancelTokenSource


  public Init(): void {
    this.cancelTokenSource = axios.CancelToken.source();
  }

  public Abort(): void {
    this.cancelTokenSource?.cancel();

  }

  public async GetBanknotes(): Promise<IApiResponse<Banknote[]>> {
    return await axios.get<IApiResponse<Banknote[]>>(`${ApiUrls.GetBanknotes}`,
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

  public async CreateBanknote( banknote: BanknoteCreateCommand): Promise<IApiResponse<string | null>> {
    return await axios.post<IApiResponse<string | null>>(`${ApiUrls.CreateBanknote}`,
      {
        ...banknote
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

  public async UpdateBanknote(banknote: BanknoteUpdateCommand): Promise<IApiResponse<{} | null>> {
    return await axios.put<IApiResponse<{} | null>>(`${ApiUrls.UpdateBanknote}`,
      {
        ...banknote
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

  public async DeleteBanknote(banknoteId: string): Promise<IApiResponse<{} | null>> {
    return await axios.delete<IApiResponse<{} | null>>(`${ApiUrls.DeleteBanknote}?banknoteId=${banknoteId}`,

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