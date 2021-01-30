import { createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    userName: "",
    userEmail: "",
    meetingRoom: "",
    meetingDescription: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
    },
    setMeetingInfo: (state, action) => {
      state.meetingRoom = action.payload.meetingRoom;
      state.meetingDescription = action.payload.meetingDescription;
    },
  },
});

export const { setUserData, setMeetingInfo } = userReducer.actions;

export const user = (state) => state.user;

export default userReducer.reducer;
