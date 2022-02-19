import React, {Fragment} from 'react';
import Class from './Header.module.css';

import mealsImage from '../../../assets/images/meals.jpeg';
import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';

const Header = (props) => { 
    return <Fragment>
        <header className={Class.header}>
            <h1>The Ordering</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={Class['main-image']}>
            <img alt="Table full of food" src={mealsImage}/>
        </div>
    </Fragment>
};

export default Header;