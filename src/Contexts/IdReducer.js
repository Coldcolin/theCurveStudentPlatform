import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Id: {id: "", name: "visitor", stack: "", role: "", image:""},
}

const IdReducer = createSlice({
    name: "IdReducer",
    initialState,
    reducers: {
        addId: (state, {payload}) =>{
            state.Id = payload
        },
        signOut: (state) => {
                state.Id = {id: "", name: "visitor", stack: "", role: "", image: ""};
            },
    }
});

export const {addId, removeId, changeId, signOut} = IdReducer.actions

export default IdReducer.reducer