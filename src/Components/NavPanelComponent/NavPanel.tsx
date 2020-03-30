import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { Menu } from 'antd';
import 'antd/dist/antd.css';

export const NavPanel:React.FC = () => {

    return (
        <Menu 
            theme = "dark"  
            mode="horizontal"
            defaultSelectedKeys={['usercard']}
            >
            <Menu.Item key = "usercard" >
                <Link style = {{color: '#fff'}} to = '/usercard'>Картотека</Link>
            </Menu.Item>
            
            <Menu.Item key = "userlist">
                <Link style = {{color: '#fff'}}  to = '/userlist'>Таблица</Link>
            </Menu.Item>
        </Menu>
    )
}