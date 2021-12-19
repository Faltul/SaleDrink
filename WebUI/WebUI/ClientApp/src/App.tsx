import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import SaleDrink from './components/userInterface/SaleDrink';
import ManagmentContainer from './components/adminInterface/ManagmentContainer';

import './custom.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'rsuite/dist/styles/rsuite-default.min.css'

export default () => (
    <Layout>
        <Route exact path='/' component={SaleDrink} />
        <Route path='/Managment/:key?' component={ManagmentContainer} />

    </Layout>
);
