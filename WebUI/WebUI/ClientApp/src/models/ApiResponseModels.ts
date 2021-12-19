export interface IApiResponse<T>
{
    result:boolean;
    data:T,
    messageId: string|null,
    error: IApiError|null,
}

export interface IApiError
{
    message: string|null,
    errorCode: string|null,
}