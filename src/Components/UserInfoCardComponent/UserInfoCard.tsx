import React from 'react';
import {observer} from 'mobx-react-lite';

import {user} from '../../Store';

import  './UserInfoCard.module.scss';

export const UserInfoCard:React.FC<{
    name: string,  
    email: string
    }> = observer((props) => {

    return (
        <>
            <div>
                <h4>{props.name}</h4>
                <p>{props.email}</p>
            </div>
        </>
    )
})