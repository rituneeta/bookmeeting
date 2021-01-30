import React from "react";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Button from "@material-ui/core/Button";

function TimeSlots(props) {
  const slotList = [...Array(19)].map((val, ind) => {
    return moment(
      `${10 + Math.floor(ind / 2)}:${ind % 2 === 0 ? "00" : "30"}`,
      "HH:mm"
    ).format("hh:mm a");
  });
  return (
    <>
      <p style={{ textAlign: "center", fontSize: "25px" }}>
        Please select your preferred slot
      </p>
      <Grid container justify="center">
        <Grid item xs={7}>
          <Grid container justify="center" spacing={2}>
            {slotList.map((slot) => (
              <Grid key={slot} item>
                <Button
                  variant={props.slotTime === slot ? "contained" : "outlined"}
                  color={props.slotTime === slot ? "secondary" : undefined}
                  onClick={() => props.setSlotTime(slot)}
                >
                  {slot}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default TimeSlots;
