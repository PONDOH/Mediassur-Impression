import React, {useState} from 'react';

import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import { CloudOutlined, UsergroupAddOutlined, RiseOutlined, SettingOutlined, CarOutlined, CreditCardOutlined, FolderOpenOutlined, FundViewOutlined } from '@ant-design/icons';

import {URLS} from "constant"
import { Link } from '@material-ui/core';
import AddForm from './AddForm';

const { SubMenu } = Menu;

export default function Sider(props) {


    const[state, setState] = useState({
        currentItem: {},
        isAddDrawerVisible: false,
        openkeys: ['attestation'],
        //rootSubmenuKeys:[],
        rootSubmenukeys : ['attestation', 'lot', 'reporting', 'setting']
    })
    const history = useHistory()

    function handleClick(data){
        history.push(URLS[data.key])
    }

    function handleAddClose(){
        setState(state => ({...state, isAddDrawerVisible: false}))
    }

    // const onOpenChange = openKeys => {  
    //     const latestOpenKey = openKeys.find(key => openKeys.indexOf(key) === -1);
    //     let rootSubmenuKeys = state;
    //     if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         setState({...state, openKeys });
    //     } else {
    //         setState({...state,
    //         openKeys: latestOpenKey ? [latestOpenKey] : [],
    //       });
    //     }
    //   };

    return (
        <div>
            <div style={{
                width: "100%", 
                background: "#0174DF", 
                color: "white", 
                textAlign: "center",
                fontWeight: 700,
                padding: 10,
                fontSize: 17
            }}>
                DASHBOARD
            </div>

            <Menu
                onClick={handleClick}
                style={{ width: "100%"}}
                mode="inline"
                // openkeys={state.openkeys}
                // onOpenChange= {onOpenChange}
            >
                <SubMenu key="attestation" icon={<CreditCardOutlined />} title="Attestations">
                    <Menu.Item key="newAttestation" onClick={() => setState(state => ({...state, isAddDrawerVisible: true}))}>Nouvelle attestation</Menu.Item>
                    <Menu.Item key="importation">Importer un document</Menu.Item>
                </SubMenu>

                <SubMenu key="lot" icon={<FolderOpenOutlined />} title="Lot d'attestations">
                    <Menu.Item key="lot">Liste des lots</Menu.Item>
                    {/* <Menu.Item key="#">Lots non archivés</Menu.Item> */}
                </SubMenu>

                <SubMenu key="reporting" icon={<FundViewOutlined />} title="Reporting">
                    <Menu.Item key="reporting">Historique des attestations</Menu.Item>
                    {/* <Menu.Item key="lotHistory">Historique des lots</Menu.Item> */}
                </SubMenu>

                <SubMenu key="setting" icon={<SettingOutlined />} title="Paramètres">
                    <Menu.Item key="parametre">Acceder aux parametres</Menu.Item>
                </SubMenu>
            </Menu>
            {state.isAddDrawerVisible && (
                <AddForm
                    visible={state.isAddDrawerVisible} 
                    close={handleAddClose}
                />
            )}
        </div>
    );
}
