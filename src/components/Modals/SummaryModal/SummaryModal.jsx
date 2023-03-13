import React,{Fragment} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Slide,
  Grid,
  Button
} from "@material-ui/core";
import ZahariImage from '../../../images/zahari.png';

import styles from './SummaryModal.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const SummaryModal = (props) => {
  return (
    <Fragment >
    <Dialog
      open={props.show}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <b><span role="img" aria-label="Star emoji">&#11088;</span>{props.money === 200000 ? 'JACKPOT!!!' :'Congratulations!'}</b>
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignContent="center"
          alignItems="center"
        >
          <Grid item>
            <img className={styles.image} src={ZahariImage} alt="Zahari Baharov"/>
          </Grid>
          <Grid item>
            <h2>You have won <span className={styles.money}>{props.money}€</span></h2>
            <Button onClick={props.onNewGameStart} size="medium" variant="outlined" color="default">TRY AGAIN</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
    </Fragment>
  );
};

export default SummaryModal;
