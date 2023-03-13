import React from "react";
import { Button, Grid } from "@material-ui/core";
import styles from "./Controls.module.css";

import GameStats from "../GameStats/GameStats";

const Controls = (props) => {
  return (
    <Grid
      className={styles.controls}
      container
      spacing={3}
      direction="column"
      justify="center"
      alignContent="center"
      alignItems="center"
    >
      <Grid item>
        <GameStats money={props.earnedMoney} direction={props.direction} />
      </Grid>
      <Grid item>
        <Button
          disabled={props.gameRunning}
          onClick={props.onStart}
          size="large"
          variant="contained"
          color="primary"
        >
          Start
        </Button>
      </Grid>
      <Grid item>
        <Button
          disabled={!props.gameRunning}
          onClick={props.onStop}
          size="large"
          variant="contained"
          color="secondary"
        >
          Stop
        </Button>
      </Grid>
    </Grid>
  );
};

export default Controls;
