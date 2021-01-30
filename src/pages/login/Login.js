import React from "react";
import ApiCalendar from "react-google-calendar-api";
import Button from "@material-ui/core/Button";
import { ReactComponent as Google } from "../../assets/google-icon.svg";

function Login(props) {
  return (
    <>
      <div
        style={{
          marginTop: "100px",
          textAlign: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={(e) => {
            ApiCalendar.handleAuthClick();
          }}
        >
          <Google style={{ height: "30px", width: "50px" }} />
          Login with Google
        </Button>
      </div>
    </>
  );
}

export default Login;
