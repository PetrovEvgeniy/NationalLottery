import React,{Fragment} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Slide
} from "@material-ui/core";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import Sphere from "../../Spheres/Sphere/Sphere";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DirectionModal = (props) => {
  return (
    <Fragment >
    <Dialog
      open={props.show}
      TransitionComponent={Transition}
    >
      <DialogTitle>
      <span role="img" aria-label="Pick direction emoji">⬆️⬇️</span>Please, select direction:
      </DialogTitle>
      <DialogContent dividers>
        <Grid
          container
          spacing={5}
          direction="row"
          justify="center"
          alignContent="center"
          alignItems="center"
        >
          <Sphere value={props.lastNumber}/>
          <Grid item>
            <IconButton onClick={() => {
              props.onChangeDirection("up")
              props.onClose()
              }}>
              HIGHER
              <FaArrowAltCircleUp
                style={{ color: "green", fontSize: "50px" }}
              />
            </IconButton>
            <IconButton onClick={() => {
              props.onChangeDirection("down")
              props.onClose()
              }}>
              LOWER
              <FaArrowAltCircleDown
                style={{ color: "green", fontSize: "50px" }}
              />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
    </Fragment>
  );
};

export default DirectionModal;
