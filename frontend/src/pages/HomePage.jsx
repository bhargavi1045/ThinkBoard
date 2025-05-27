import React from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import api from '../lib/axios'
import NoteNotFound from '../components/NoteNotFound'
const HomePage = () => {
  const [isRateLimited,setRateLimited]=useState(false)
  const [notes,setNotes]=useState([])
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const fetchNotes=async()=>{
      try{
        const res=await api.get("/notes");
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
        {notes.length==0 && !isRateLimited && !loading && <NoteNotFound/>}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            notes.map(note=>(
              <NoteCard key={note._id} note={note} seNotes={setNotes} onDelete={(id) => {
            setNotes((prevNotes) => prevNotes.filter((n) => n._id !== id));
          }}/>
            ))
          }
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
