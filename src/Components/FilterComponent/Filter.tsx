import React, {Component} from 'react';
import { observer} from 'mobx-react-lite';

import {useStore} from '../../hooks/use-store';
import {user} from '../../Store';


export const Filter:React.FC = observer(() => {
    const Store = useStore();

    const filterChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        switch(e.target.value) {
            case 'first_name': {
                Store.changeFilterAttr('first_name')
                break;
            }
            case 'last_name': {
                Store.changeFilterAttr('last_name')
            }
        }
    }

    const onFilterInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        Store.changeFilterValue(e.target.value);
    }

    return(
        <>
            <select 
                    value = {Store.filterAttr}
                    onChange ={filterChange}
                >
                    <option value="first_name">Имя</option>
                    <option value="last_name">Фамилия</option>
                </select>
                <input 
                    type = 'text'
                    onChange ={onFilterInput}
                    value = {Store.filterValue}
                />
        </>
    )
})