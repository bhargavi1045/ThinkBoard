import React from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const HomePage = () => {
  const [isRateLimited,setRateLimited]=useState(false)
  const [notes,setNotes]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const fetchNotes=async()=>{
      try{
        const res=await axios.get("http://localhost:5001/api/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      }catch(error){
        console.log("error fetching notes",error);
        if(error.response.status==429){
          setRateLimited(true);
        }else{
          toast.error("Failed to load notes")
        }
      } finally{
        setLoading(false);
      }
    };
    fetchNotes();
  },[])
  return (
    <div className="min-h-screen">
      <Navbar/>
      {isRateLimited && <RateLimitedUI/>}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            notes.map(note=>(
              <NoteCard key={note._id} note={note}/>
            ))
          }
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
