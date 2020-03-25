import React, {Component, useEffect} from 'react';
import { observer} from 'mobx-react-lite';
import {useStore} from '../../hooks/use-store'


import styles from './UserCardList.module.scss';
import {Card} from '../CardComponent/Card';
import Modal from './../ModalComponent/Modal';
import {Profile} from './../ProfileComponent/Profile';

import {user} from '../../Store';

export const UserCardList:React.FC = observer(() => {
    const Store = useStore();

    Store.changeFilterValue('');
    let users:user[] = Store.getUsers;

    if (users.length==0) {
        return (<h1>нет данных</h1>)
    } else {
        console.log('Данные получены')
        return (
            <>
            <div className = {styles.userList}>
                {
                users.map((user: user) =>
                <Card 
                    user = {user}
                    key = {user.id}
                    />)
            }
            </div>
            
            <main>
                {
                    Store.getProfileStatus && 
                    <Modal >
                        <Profile></Profile>
                    </Modal>
                }
            </main> 
            </>
        )
    }
})