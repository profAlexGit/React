import React, {Component} from 'react'
import { observer} from 'mobx-react-lite';
import {useStore} from '../../hooks/use-store';

import {user} from '../../Store';
import {Button} from './../ButtonComponent/Button';
import {UserItem} from './../UserListItemComponent/UserListItem';
import {Filter} from './../FilterComponent/Filter';

import Modal from './../ModalComponent/Modal';
import {Profile} from './../ProfileComponent/Profile';

import styles from './UserList.module.scss';

export const UserList:React.FC = observer(() => {
    const Store = useStore();
    const updBtnClass = `${styles.btn} ${styles.primary_btn}`;
    let isFirst:boolean = true;

    const addNewUser = () => {
        console.log('добавление');
        Store.toggle();
    }

    let users:user[] = Store.getUsers;
        return (<>
            <div className = {styles.TableUserBlock}>
                <div className = {styles.filterBlock}>
                    <Filter />
                </div>

                <table>
                    <thead>
                         <tr>
                             <th>Фото</th>
                             <th>Имя</th>
                             <th>Фамилия</th>
                             <th>email</th>
                             <th></th>
                         </tr>
                     </thead>
                     <tbody>
                         { users.map((user: user) => 
                             <UserItem 
                                 user = {user}
                                 key = {user.id}
                             />
                             )
                         }
                     </tbody>
                 </table>
                
                 <Button 
                    className = {updBtnClass}
                    click = {addNewUser}
                    text = 'Добавить'
                />
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
})