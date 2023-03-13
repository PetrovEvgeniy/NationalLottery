import React from 'react';
import styles from './GameStats.module.css';
import {FaArrowAltCircleUp, FaArrowAltCircleDown, FaArrowsAlt} from 'react-icons/fa'

const GameStats = (props) => {
    let directionIcon = <FaArrowsAlt/>
    if(props.direction === "up"){
        directionIcon = <FaArrowAltCircleUp/>
    }
    else if(props.direction === "down"){
        directionIcon = <FaArrowAltCircleDown/>
    }

    return ( <div className={styles.GameStats}>
        <h2>Direction: {directionIcon}</h2>
        <h2>Money: <span className={styles.money}>{props.money}€</span></h2>
    </div> );
}
 
export default GameStats;