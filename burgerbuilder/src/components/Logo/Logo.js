import React from 'react';

import burgerLogo from '../../assets/images/Logo.png';
import classes from './Logo.css'; 

const logo = ( props ) => (
    <div className = {classes.Logo}>
        <img src = {burgerLogo} alt='myBurgerLogo'/>
    </div>
);

export default logo;