import React, {Component} from 'react';
import {useStore} from '../../hooks/use-store';
import { observer} from 'mobx-react-lite';

import {user} from '../../Store';
import {Button} from 'antd'

export const UserCardControl:React.FC<{
    user: user,
    }> = observer((props)=> {

    const Store = useStore();

    const updateUser = () => {
        Store.toggleProfile(props.user);
    }

    return (
            <Button 
                type = 'primary'
                onClick = {updateUser}
            >
                Изменить
            </Button>
        
    )
})