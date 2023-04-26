import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null,
    telegramToken: null,
    userBalance: null,
    tgNoticeStatus: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.telegramToken = action.payload.telegramToken;
            state.userBalance = action.payload.userBalance;
            state.tgNoticeStatus = action.payload.tgNoticeStatus;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.telegramToken = null;
            state.userBalance = null;
            state.tgNoticeStatus = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;