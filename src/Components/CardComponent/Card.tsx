import React, {Component, Props} from 'react';
import {observer} from 'mobx-react-lite';


import {user} from '../../Store';
import {UserInfoCard} from '../UserInfoCardComponent/UserInfoCard';
import {UserCardControl} from '../UserCardControlComponent/UserCardControl';

import styles from './Card.module.scss';


export const Card:React.FC<{user: user}> = observer((props) => {

    const avatar = props.user.avatar;
    const name = `${props.user.first_name} ${props.user.last_name}`
    const email = props.user.email;

    return (
        <div className = {styles.userCard}>
            <UserInfoCard 
                avatar = {avatar} 
                name = {name}
                email = {email}
                />
            <UserCardControl 
                user = {props.user}
             />
        </div>
    )
})