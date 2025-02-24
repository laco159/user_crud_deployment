import React from 'react';
import UserTable from './components/UserTable';
import { HeaderContent, Header, Icon, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import './styles/general.css'


const App = () => {
    return (
        <>
            <Header
                as="h2"
                block
            >
                <Icon name="users" />
                <HeaderContent>User Management</HeaderContent>
            </Header>
            <UserTable />
        </>
    );
};

export default App;
