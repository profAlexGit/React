import React, {Component, useState}  from 'react';
import ReactDOM from 'react-dom';
import { observer} from 'mobx-react-lite';

import {user} from '../../Store'
import {useStore} from '../../hooks/use-store'

import {Button} from './../ButtonComponent/Button';
import styles from './Profile.module.scss';


export const Profile:React.FC = observer(() => {

    const Store = useStore();
    const userForUpdate:user = Store.getUserForAction;

    const [first_name, setFirst] = useState(() => userForUpdate!.first_name);
    const [last_name, setLast] = useState(() => userForUpdate!.last_name);
    const [avatar, setAvatar] = useState(() => userForUpdate!.avatar);
    const [email, setEmail] = useState(() => userForUpdate!.email);
    const [id, setId] = useState(() => userForUpdate!.id);

    const onClose = () => {
        Store.toggle();
    }    

    const onSaveUser =() => {
        const user:user = {
            first_name,
            last_name,
            email,
            avatar,
            id
        }
        
        Store.updateUserInfo(user);
     }

    return(
        <div className = {styles.updateBlock}>
            <h3>Редактирование</h3>
            <div className = {styles.profile}>
                <Button 
                        className = {styles.closeBtn}
                        text = 'X'
                        click = {onClose}
                    />
                <img src={avatar} alt=""/>

                <div className = {styles.profileInfo}>
                        <label>
                            first name
                            <input 
                                type="text" 
                                value = {first_name}
                                name = 'first_name'
                                onChange = {(e) => setFirst(e.target.value)}
                            />
                        </label>
                        <label>
                            last name
                            <input 
                                type="text"
                                value = {last_name}
                                name = 'last_name'
                                onChange = {(e) => setLast(e.target.value)}
                            />
                        </label>
                        <label>
                            email
                            <input 
                                type="email"
                                value = {email}
                                name = 'email'
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            avatar
                            <input 
                                type="url"
                                value = {avatar}
                                name = 'avatar'
                                onChange = {(e) => setAvatar(e.target.value)}
                            />
                        </label>
                    </div>

                    <Button 
                        className = {styles.saveBtn}
                        text = 'Сохранить'
                        click ={onSaveUser}
                    />

            </div>
        </div>
    )
})



