import Axios from "./Axios";
import { useState,useEffect } from "react";

const useFetchUser=(userId)=>{
  console.log(userId)
     const [user,setUser]=useState(null);
 
    //Get data from API
    useEffect(() => {
      const fetchUser = async () => {
        const res = await Axios.get(`api/getUser/${userId}`);
        setUser(res.data);    
      };
        fetchUser();
      }, [userId]);

      //return user Data
     return  user ? user : null;  
      
}

export default useFetchUser;