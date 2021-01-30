import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { user, setMeetingInfo } from "../../reducers/userReducer";
import "./meetingRoomDetails.css";
import Button from "@material-ui/core/Button";

const MeetingRoomDetails = (props) => {
  const history = useHistory();
  const userVal = useSelector(user);
  const dispatch = useDispatch();

  const [meetingDesc, setMeetingDesc] = useState(null);
  const [meetingRoom, setMeetingRoom] = useState(null);

  const rooms = [
    {
      value: "t1",
      label: "Training Room-1",
    },
    {
      value: "t2",
      label: "Training Room-2",
    },
    {
      value: "m",
      label: "Meeting Room",
    },
  ];

  return (
    <div className={"meetingRoom"}>
      <h2> Meeting Room Booking </h2>

      <TextField
        id="training-room"
        select
        label="Meeting Room"
        onChange={(e) => setMeetingRoom(e.target.value)}
        SelectProps={{
          native: true,
        }}
        variant="outlined"
        style={{ margin: 8 }}
      >
        {rooms.map((option) => (
          <>
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          </>
        ))}
      </TextField>

      <TextField
        id="username"
        label="Name"
        style={{ margin: 8 }}
        placeholder="Enter Your Name"
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={userVal.userName}
        disabled
      />
      <TextField
        id="meeting-descr"
        label="Meeting Description"
        style={{ margin: 8 }}
        placeholder="Enter meeting description"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setMeetingDesc(e.target.value)}
        variant="outlined"
      />
      <br />
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        disabled={!(meetingRoom && meetingDesc)}
        onClick={() => {
          dispatch(
            setMeetingInfo({
              meetingRoom: meetingRoom,
              meetingDescription: meetingDesc,
            })
          );
          history.push("/bookSlot");
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default MeetingRoomDetails;
