import React, {Component} from 'react';

import {Button} from '../ButtonComponent/Button';
import { observer} from 'mobx-react-lite';

import {useStore} from '../../hooks/use-store'
import {user} from '../../Store';
import styles from './UserListItem.module.scss'

export const UserItem:React.FC<{user: user}> = observer((props) => {
    const Store = useStore();

    const delBtnClass = `${styles.btn} ${styles.cancel_btn}`;
    const user = props.user;

    const deleteUser = () => {
        Store.deleteUser(props.user.id);
    }
    
    return (
        <tr>
            <td>
                <img src={user.avatar} alt="avatar"/>
            </td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>
                <Button 
                className = {delBtnClass}
                click ={deleteUser}
                text = 'Удалить'
            />
            </td>
        </tr>
    )
})