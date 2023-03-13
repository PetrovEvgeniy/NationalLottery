import React from 'react';
import LogoImage from '../../images/logo.png';

import styles from './Logo.module.css';

const Logo = () => <img className={styles.logo} src={LogoImage} alt="National Lottery logo"/>
 
export default Logo;