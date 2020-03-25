import React, {Component} from 'react';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../hooks/use-store'

import {user} from '../../Store';

import  './UserInfoCard.module.scss';

export const UserInfoCard:React.FC<{
    name: string, 
    avatar: string, 
    email: string
    }> = observer((props) => {

    return (
        <>
            <div>
                <img src={props.avatar} alt=""/>
                <h4>{props.name}</h4>
                <p>{props.email}</p>
            </div>
        </>
    )
})