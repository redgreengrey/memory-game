import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "stop",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    pause: (state) => {
      state.value = "pause";
    },
    play: (state) => {
      state.value = "playing";
    },
    stop: (state) => {
      state.value = "stop";
    },
    win: (state) => {
      state.value = "win";
    },
  },
});

export const { pause, play, stop, win } = gameSlice.actions;

export default gameSlice.reducer;
