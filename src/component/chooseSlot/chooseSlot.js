import React, { useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import ApiCalendar from "react-google-calendar-api";
import { user } from "../../reducers/userReducer";
import Button from "@material-ui/core/Button";
import { NotificationManager } from "react-notifications";
import TimeSlots from "./timeSlots";
import "./chooseSlot.css";

const ChooseSlot = (props) => {
  const userVal = useSelector(user);
  const [date, setDate] = useState(new Date());
  const [slotTime, setSlotTime] = useState(null);

  const bookAppointment = () => {
    let hour = parseInt(slotTime.split(" ")[0].split(":")[0]);
    if (slotTime.split(" ")[1] === "pm") {
      hour += 12;
    }
    let minute = parseInt(slotTime.split(" ")[0].split(":")[1]);

    let startDate = moment(date).set({
      hour: hour,
      minute: minute,
    });

    let endDate = moment(date).set({
      hour: minute ? hour + 1 : hour,
      minute: minute ? 0 : 30,
    });

    ApiCalendar.createEvent(
      {
        summary: `Book the meeting on ${userVal.meetingRoom}`,
        description: userVal.meetingDescription,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "Asia/Kolkata",
        },
      },
      "primary"
    )
      .then((resp) => {
        NotificationManager.success(
          "Succesfully Book the Meeting Room !",
          "BookMeeting",
          2000
        );
      })
      .catch((e) => {
        NotificationManager.error(
          "Error to Book the Meeting Room ",
          "BookMeeting"
        );
      });
  };

  return (
    <>
      <Calendar value={date} minDate={new Date()} onChange={setDate} />
      <p style={{ textAlign: "center" }}>
        {moment(date).format("dddd, Do MMMM")}
      </p>
      <br />
      <TimeSlots {...{ slotTime, setSlotTime }} />
      <br />
      <Button
        onClick={bookAppointment}
        variant="contained"
        color="secondary"
        style={{ margin: "10px 40% 30px 40%", width: "20%" }}
      >
        BOOK APPOINTMENT
      </Button>
    </>
  );
};

export default ChooseSlot;
