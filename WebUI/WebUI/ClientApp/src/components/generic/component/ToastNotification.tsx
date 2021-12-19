import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ToastNotification extends React.PureComponent<{}> 
{
  
    render()
    {
       
        return(
            <div>
                <ToastContainer  style={{zIndex:1000000}}/>
            </div>
        )
    }
}