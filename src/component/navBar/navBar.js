import React from "react";
import ApiCalendar from "react-google-calendar-api";
import Button from "@material-ui/core/Button";

function NavBar(props) {
  const logout = () => {
    ApiCalendar.handleSignoutClick();
  };

  return (
    <div style={{ backgroundColor: "#f50057", height: "50px" }}>
      {props.sign && (
        <Button
          style={{
            top: "10px",
            right: "10px",
            position: "absolute",
          }}
          variant="contained"
          size="small"
          onClick={logout}
        >
          Logout
        </Button>
      )}
    </div>
  );
}

export default NavBar;
