import React from 'react';
import styles from './SphereText.module.css';
import cx from 'classnames';


const SphereText = (props) => {
    return (
        <span className={props.isSpinning 
        ? cx(styles.sphereText,styles.spinActive) 
        : styles.sphereText}>
            {props.children}
        </span>
    );
}
 
export default SphereText;