import React, {Component} from 'react';
import {useStore} from '../../hooks/use-store';
import { observer} from 'mobx-react-lite';

import {Button} from '../ButtonComponent/Button'
import {user} from '../../Store';
import styles from './UserCardControl.module.scss';

const updBtnClass = `${styles.btn} ${styles.primary_btn}`;

export const UserCardControl:React.FC<{
    user: user
    }> = observer((props)=> {

    const Store = useStore();

    const updateUser = () => {
        Store.toggleProfile(props.user);
    }

    return (
        
            <Button 
                className = {updBtnClass}
                click = {updateUser}
                text = 'Изменить'
            />
        
    )
})