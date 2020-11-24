import React, {useState, useEffect} from 'react';
import {getAccessTokenApi} from '../../../Api/auth'
import { getUsersActiveApi} from '../../../Api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers'

import './Users.scss';

export default function Users(){
    const [usersActive, setUsersActive]= useState([]);
    const [usersInactive, setUsersInactive]= useState([]);
    const token= getAccessTokenApi();

    useEffect(()=>{
        getUsersActiveApi(token, true).then(response=>{
           setUsersActive(response.users);
        });
        getUsersActiveApi(token, false).then(response=>{
            setUsersInactive(response.users);
         });
    }, [token])
    return (
        <div className="users">
            <h1><ListUsers usersActive={usersActive} usersInactive={usersInactive} /></h1>
        </div>
    )
}

