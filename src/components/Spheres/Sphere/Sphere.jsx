import React from "react";
import styles from "./Sphere.module.css";
import cx from 'classnames';
import SphereText from "./SphereText/SphereText";
import { Grid} from "@material-ui/core";

const GetStatusClass = (status) => {
  switch(status){
    
    case 'spinning': return styles.sphereSpinning
    case 'correct': return styles.sphereCorrect
    case 'incorrect': return styles.sphereIncorrect
    default: return styles.sphereInitialized
  }
}

const Sphere = (props) => {
  const statusClass = GetStatusClass(props.status);
  const isSphereSpinning = props.status === 'spinning';
  return (
      <Grid item>
        <div className={styles.capsule}>
          <div className={cx(styles.sphere,statusClass)}>     
              <SphereText {...props} isSpinning={isSphereSpinning}>{props.value}</SphereText>
          </div>
        </div>
      </Grid>
  );
};

export default Sphere;
