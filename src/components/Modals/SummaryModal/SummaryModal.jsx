import React,{Fragment, useEffect} from "react";
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
import CountUp from "react-countup";

//Sounds
import winSoundPath from '../../../sounds/casino-win.wav';
import winJackpotSoundPath from '../../../sounds/jackpot-win.wav';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const SummaryModal = (props) => {

  let isJackpotWon = props.money === 200000;

  let winSound = new Audio(winSoundPath);
  winSound.volume = 0.1;
  let jackpotWinSound = new Audio(winJackpotSoundPath);
  jackpotWinSound.volume = 0.45;


  if(props.show){
    if(isJackpotWon){
      jackpotWinSound.play();
    }
    else{
      winSound.play();
    }
  }
  

  return (
    <Fragment >
    <Dialog
      open={props.show}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <b><span role="img" aria-label="Star emoji">&#11088;</span>{isJackpotWon ? 'JACKPOT!!!' :'Congratulations!'}</b>
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
            <h2>You just won <span className={styles.money}>{<CountUp end={props.money}/>}€</span></h2>
            <Button onClick={props.onNewGameStart} size="medium" variant="outlined" color="default">TRY AGAIN</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
    </Fragment>
  );
};

export default SummaryModal;
