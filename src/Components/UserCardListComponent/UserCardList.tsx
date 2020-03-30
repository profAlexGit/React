import React from 'react';
import { observer} from 'mobx-react-lite';
import {useStore} from '../../hooks/use-store'

import {Row, Col, Layout} from 'antd';
const {Content} = Layout;

import {Card} from '../CardComponent/Card';
import Modal from './../ModalComponent/Modal';
import {Profile} from './../ProfileComponent/Profile';

import {user} from '../../Store';

export const UserCardList:React.FC = observer(() => {
    const Store = useStore();

    let users:user[] = Store.getUsers;

    if (users.length==0) {
        return (<h1>нет данных</h1>)
    } else {
        console.log('Данные получены')
        return (
            <Layout>
                <Row 
                    style = {{marginTop: '1rem'}}
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                    {
                        users.map((user: user) =>
                        <Col 
                            className="gutter-row" span = {6}
                            key = {user.id}
                        >
                            <Card 
                                user = {user}
                            />
                        </Col>
                        )
                    }
                </Row>
                
                <main>
                    {
                        Store.getProfileStatus && 
                        <Modal >
                            <Profile></Profile>
                        </Modal>
                    }
                </main> 
            </Layout>
        )
    }
})