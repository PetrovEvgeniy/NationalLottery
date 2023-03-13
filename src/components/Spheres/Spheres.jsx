import React, { Component } from 'react';
import Sphere from './Sphere/Sphere'
import styles from './Spheres.module.css'
import { Grid } from "@material-ui/core";

class Spheres extends Component {
    state = { 
        data: null
    }

    render() { 
        const {data} = this.props;
        const spheres = data.map((sp,i) => {
            return <Sphere key={i} value={sp.value} status={sp.currentStatus}/>
        },[]);

        return (
            <div className={styles.spheres}>
            <Grid 
            container 
            spacing={1}
            direction="row"
            justify="center"
            alignContent="center" 
            alignItems="center">
                {spheres}
            </Grid>
        </div>
             );
    }
}
 
export default Spheres;