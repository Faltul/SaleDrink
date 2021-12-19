export enum NotificationTypeEnum
{
    default="default",
    success="success",
    warning="warning",
    danger="danger",
    info="info",
}

export interface NotificationToast {
    type: NotificationTypeEnum;
    message: string;
    additionalMessage?: string;
    content?: React.ReactNode;

}