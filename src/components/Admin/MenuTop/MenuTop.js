import React from 'react';
import YelderLogo from '../../../Assets/img/png/YelderLogo.png'
import {Button, Icon} from 'antd';

import './MenuTop.scss'
import {logout} from '../../../Api/auth'

export default function MenuTop(props){
    const {menuCollapsed, setMenuCollapsed}=props;

    const logoutUser=()=>{
        logout();
        window.location.reload();
    }
    return(
            <div className="menu-top">
                <div className="menu-top__left">
                   <img
                   className="menu-top__left-logo"
                   src={YelderLogo}
                   alt="YelderDaSilva"/>
            <Button type="link" onClick={()=>setMenuCollapsed(!menuCollapsed)}>
                <Icon type={menuCollapsed ?"menu-unfold":"menu-fold"}/>
            </Button>
                </div>
                <div className="menu-top__right">
                    <Button type="link" onClick={logoutUser}>
                        <Icon type="poweroff"/>
                    </Button>
                </div>

            </div>
    )
}