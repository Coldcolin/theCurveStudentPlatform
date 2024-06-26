import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Id: {id: "", name: "visitor", stack: "", role: "", image:""},
    allState: 1,
    assessState: 1
}

const IdReducer = createSlice({
    name: "IdReducer",
    initialState,
    reducers: {
        addId: (state, {payload}) =>{
            state.Id = payload
        },
        updateId: (state, action) =>{
            state.Id.name = action.payload.name;
            state.Id.image = action.payload.image;
        },
        signOut: (state) => {
                state.Id = {id: "", name: "visitor", stack: "", role: "", image: ""};
                state.allState = 1;
                state.assessState = 1;
            },
        changeAll: (state, {payload})=>{
            state.allState = payload
        } ,   
        changeAsses: (state, {payload})=>{
            state.assessState = payload
        }    
    }
});

export const {addId, removeId, changeId, signOut, changeAll, changeAsses, updateId} = IdReducer.actions

export default IdReducer.reducer