import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import styles from './NavPanel.module.scss';

export const NavPanel:React.FC = () => {

    return (
        <div className ={styles.navPanel}>
            <Link className = {styles.link} to = '/usercard'>Картотека</Link>
            <Link className = {styles.link} to = '/userlist'>Таблица</Link>
        </div>
    )
}