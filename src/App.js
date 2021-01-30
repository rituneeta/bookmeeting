import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login/Login";
import BookMeeting from "./pages/bookMeeting/BookMeeting";
import ChooseSlot from "./component/chooseSlot/chooseSlot";
import ApiCalendar from "react-google-calendar-api";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { setUserData } from "../src/reducers/userReducer";
import NavBar from "./component/navBar/navBar";

function App() {
  const dispatch = useDispatch();
  const [sign, setSign] = useState(ApiCalendar.sign);

  useEffect(() => {
    ApiCalendar.onLoad(() => {
      if (ApiCalendar.sign) {
        setSign(ApiCalendar.sign);
        setData();
      }
      ApiCalendar.listenSign((val) => {
        setSign(val);
        setData();
        if (val) {
          NotificationManager.success("Succesfully Login!", "login", 2000);
        }
      });
    });
  }, []);

  const setData = () => {
    let user = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile();
    dispatch(
      setUserData({
        userName: user.getName(),
        userEmail: user.getEmail(),
      })
    );
  };

  return (
    <>
      <NavBar sign={sign} />
      <Router>
        <Switch>
          {!sign ? (
            <>
              <Route exact path="/" component={Login} />
              <Route render={() => <Redirect to="/" />} />
            </>
          ) : (
            <>
              <Route path="/booking" component={BookMeeting} />
              <Route path="/bookSlot" component={ChooseSlot} />
              <Route render={() => <Redirect to="/booking" />} />
            </>
          )}
        </Switch>
      </Router>
      <NotificationContainer />
    </>
  );
}

export default App;
