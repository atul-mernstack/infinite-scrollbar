import React,{useEffect} from 'react';
import {List, ListItem, ListItemText} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/postSlice';

export const PostList=()=>{
    // Create a simple React.js application that fetches posts from the JSONPlaceholder API and displays them in an infinite scrolling list.
    // Requirements:
    // 1. Fetch posts from the JSONPlaceholder API:https://jsonplaceholder.typicode.com/posts
    // 2. Display the posts in a list, each post should display its id, title, and body.
    // 3. Implement infinite scrolling to fetch and display more posts when the user reaches the end of the list. Prevent duplicate requests for the same set of items (e.g., don't fetch the same page twice).
    // 4. Add a loading indicator that appears while fetching new posts. Remember to handle loading indicators and manage the state properly to prevent duplicate requests.
    // 5. Test your application to ensure it meets all the requirements and works as expected.
    // 6. Use MUI, axios, and redux.
    
    // Bonus Points:
    // • Use functional components and hooks.
    // • Handle API errors gracefully.
    // • Implement a search functionality to filter posts by title.
    
    const dispatch=useDispatch();
    const {data,status,error,limit}=useSelector(state=>state.posts);

    useEffect(()=>{
       
        if(status==='idle'){
            dispatch(fetchPosts(limit));
        }        
    },[status,dispatch,limit]);

    const handleScroll=()=>{
        if(window.innerHeight+document.documentElement.scrollTop===document.documentElement.offsetHeight)
        {
            dispatch(fetchPosts(limit));
    }
};

useEffect(()=>{
    window.addEventListener('scroll',handleScroll);
    return ()=>window.removeEventListener('scroll',handleScroll);
},[]);

    return(
        <List>
            {data.map((post)=>(
                    <ListItem key={post.id}>
                    <ListItemText primary={post.title} 
                    secondary={post.body} />
                 
                </ListItem>
            ))}

            {status==='Loading' &&<p>Loading....</p>}
           {status==='failed' && <p>Error: {error}</p>}
            
        </List>
    )
}
