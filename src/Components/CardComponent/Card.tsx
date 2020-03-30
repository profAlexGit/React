import React from 'react';
import {observer} from 'mobx-react-lite';
import { Card as CardItem} from 'antd';


import {user} from '../../Store';
import {UserInfoCard} from '../UserInfoCardComponent/UserInfoCard';
import {UserCardControl} from '../UserCardControlComponent/UserCardControl';

export const Card:React.FC<{user: user}> = observer((props) => {

    const avatar = props.user.avatar;
    const name = `${props.user.first_name} ${props.user.last_name}`
    const email = props.user.email;

    return (
        <CardItem
            hoverable
            style={{ 
                width: 240, 
                paddingTop: '1rem', 
                margin: '0 auto', 
                marginBottom:'1rem',
                backgroundColor: '#fafafa'
            }}
            cover={<img 
                style = {{objectFit: 'contain'}} alt="example" src={avatar} />}
        >   
            <UserInfoCard 
                name = {name}
                email = {email}
            />
            <UserCardControl 
                user = {props.user}
            />    
        </CardItem>
    )
})