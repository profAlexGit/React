import React, {useState} from 'react'
import { observer} from 'mobx-react-lite';
import {useStore} from '../../hooks/use-store';

import {user} from '../../Store';

import { Table, Input, Button, Popconfirm} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

import Modal from './../ModalComponent/Modal';
import {Profile} from './../ProfileComponent/Profile';

import { FilterDropdownProps } from 'antd/lib/table/interface';
import { ColumnProps } from 'antd/lib/table';
import {Layout} from 'antd';

const {Sider, Content} = Layout;
const {Column} = Table;

export const UserList:React.FC = observer(() => {
    const Store = useStore();
    const [searchText, setText] = useState('');
    const [searchedColumn, setColumn] = useState('');
    const [users, setUsers] = useState(Store.getUsers);
    
    //let isFirst:boolean = true;
    //let newUser:user;

    interface column extends user {
        getColumnSearchProps?: {}
    }

    const addNewUser = () => {
        console.log('добавление');
        Store.toggle();
        let timer = setTimeout(function time() {
            if (Store.getProfileStatus) {
                timer = setTimeout(time, 500);
                console.log('timer');
                return
            }
            if (!Store.getNewUser.first_name) {
                timer = setTimeout(time, 500);
                console.log('timer');
            }
            clearTimeout(timer);
            setUsers([...Store.getUsers]);
        },500)
    }

    const handleSearch = (selectedKeys: any, confirm: () => void, dataIndex: string) => {
        confirm();
        setText(selectedKeys[0]);
        setColumn(dataIndex);
    }

    const handleReset = (clearFilters:(()=>void)|undefined) => {
        clearFilters!();
        setText('');
    }

    const handleDelete = (id:number) => {
        setUsers(users.filter((item: user) => item.id !== id));
        console.log(users)
    }

    const deleteUser = (id: number) => {
        Store.deleteUser(id);
        console.log(id);
        handleDelete(id);
    }
    
    let searchInput: Input;

    const  getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}:FilterDropdownProps) => (
            <div style = {{padding: '8px'}}>
                <Input 
                    ref = {(node: Input) => {
                        searchInput = node;
                    }}
                    placeholder = {`Search ${dataIndex}`}
                    value = {selectedKeys[0]}
                    onChange = {e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter = {() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style = {{width: '188px', marginBottom: '8px', display: 'block'}}
                />
                <Button
                    type = 'primary'
                    onClick = {() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon = {<SearchOutlined />}
                    size = "small"
                    style = {{width: '90px', marginRight: '8px'}}
                >
                    Найти
                </Button>
                <Button
                    onClick = {() => handleReset(clearFilters)}
                    size = "small"
                    style = {{width: '90px'}}
                >
                    Сброс
                </Button>
            </div>
        ),
        filterIcon: (filtered:boolean) => <SearchOutlined 
            style = {{color: filtered ? '#1890ff' : undefined }} 
        />,
        onFilter: (value: string|number|boolean, record: any) => 
                    record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .includes(value.toString().toLowerCase()),
        onFilterDropdownVisibleChange: (visible:boolean) => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },

        render: (text:string) => 
            searchedColumn === dataIndex ? (
                <Highlighter 
                    highlightStyle ={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords = {[searchText]}
                    autoEscape
                    textToHighlight = {text.toString()}
                />
            ) : (text),
    });

    const columns:ColumnProps<column>[] = [
        {
            title: 'Фотография',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, record) => (
                <img src={record.avatar} alt="avatar"/>
              )
        },
        {
            title: 'Имя',
            dataIndex: 'first_name',
            key: 'first_name',
            ...getColumnSearchProps('first_name')
        },
        {
            title: 'Фамилия',
            dataIndex: 'last_name',
            key: 'last_name',
            ...getColumnSearchProps('last_name')
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: '',
            key: 'delete',
            render: (text, record) => (
                <Popconfirm title="Вы уверены, что хотите удалить?" onConfirm={() => deleteUser(record.id)}>
                    <a>Delete</a>
                </Popconfirm>
            )
        }
    ]

        return (<Layout>
                <Sider style = {{marginTop: '1rem', padding: '1rem', position: 'fixed'}}>
                    <Button
                        style = {{width: '100%'}}
                        type = "primary"
                        onClick = {addNewUser}
                    >
                        Добавить
                    </Button>
                </Sider>
                
                <Content>
                    <Table 
                        style = {{margin: '0 auto', marginTop: '1rem', width: '70%'}}
                        columns = {columns}
                        dataSource = {users}
                        pagination = {false}
                        rowKey = {record => record.id}
                    />
                </Content>

            <main>
                {
                    Store.getProfileStatus && 
                    <Modal >
                        <Profile users = {users} setUsers = {setUsers}></Profile>
                    </Modal>
                }
            </main> 
        </Layout>
        )    
})