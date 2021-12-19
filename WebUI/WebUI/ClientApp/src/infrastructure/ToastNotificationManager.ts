import * as React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import {  ToastNotificationContentDefault, ToastNotificationContentError, ToastNotificationContentSuccess } from '../components/generic/component/ToastNotificationContent';
import {NotificationTypeEnum, NotificationToast } from '../models/NotificationModels'


export class  ToastNotificationManager {
    
    private static ToastContent(notification: NotificationToast): React.ReactNode
    {
        switch (notification.type) {
            case NotificationTypeEnum.default:
                return React.createElement(ToastNotificationContentDefault,notification)
            case NotificationTypeEnum.danger:
                return React.createElement(ToastNotificationContentError,notification)
            case NotificationTypeEnum.success:
                return React.createElement(ToastNotificationContentSuccess,notification)
            default:
                return notification.message
        }
            
        
    }
    public static async SendToast (notification: NotificationToast, option?: ToastOptions) {
        switch (notification.type) {
            case NotificationTypeEnum.default:
                toast(this.ToastContent(notification),
                    option||{
                        position: "top-right",
                        progressStyle: {background:"#e3f3ff"},
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );  
                return;
            case NotificationTypeEnum.danger:
                toast(this.ToastContent(notification),
                    option||{
                        position: "top-right",
                        progressStyle: {background:"#e3f3ff"},
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );  
                return;
            case NotificationTypeEnum.success:
                toast(this.ToastContent(notification),
                    option||{
                        position: "top-right",
                        progressStyle: {background:"#e3f3ff"},
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                ); 
                return;
            case NotificationTypeEnum.warning:
                toast.warning(this.ToastContent(notification),
                    option||{
                        position: "top-right",
                        progressStyle: {background:"#e3f3ff"},
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                ); 
                return;
            default:
                toast.info(this.ToastContent(notification),
                    option||{
                        position: "top-right",
                        progressStyle: {background:"#e3f3ff"},
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                ); 
                return;
        }
    }
}

