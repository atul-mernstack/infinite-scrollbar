import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchPosts=createAsyncThunk(
    'posts/fetchPosts',
    async (limit) =>{
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
        //console.log(res.data);
        return res.data;
    }
);

const postSlice=createSlice({
    name : 'posts',
    initialState:{
        data :[],
        status :'idle',
        error : null,
        limit :5,

    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending, (state)=>{
            state.status='Loading';
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status='Success';
            state.data=state.data.concat(action.payload);
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed';
            state.error=action.error.payload;
        })
    }
})

export default postSlice.reducer;