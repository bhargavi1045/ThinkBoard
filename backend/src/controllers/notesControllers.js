import Note from "../models/Note.js";
export async function getAllNotes(req,res){
    try{
        const notes=await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    }catch(err){
        console.error("Error in getAllNotes",err);
        res.status(500).json({message: "Internal Server Error" });
    }
}

export async function createNotes(req,res){
    try{
        const{title, content}=req.body
        const note=new Note({title: title, content: content});
        if(!title || !content){
            return res.status(400).json({message: "Title and content are required"});
        }
        const savedNote = await note.save();
        res.status(201).json(savedNote);

    }catch(err){
        console.error("Error in createNotes", err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNotes(req,res){
   try{
        const{title,content}=req.body;
        const updatedNote=await Note.findByIdAndUpdate(req.params.id,{title:title, content:content}, {new:true});
        if(!updatedNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note updated successfully"});
   }catch(err){
        console.error("Error in updateNotes", err);
        res.status(500).json({message: "Internal Server Error"});
   }
}

export async function deleteNotes(req,res){
    try{
        const deleteNote=await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json({message: "Note deleted successfully"});
    }
    catch(err){
        console.error("Error in deleteNotes", err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getNoteById(req,res){
     try{
        const note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }
        res.status(200).json(note);
     }
        catch(err){
            console.error("Error in getNoteById", err);
            res.status(500).json({message: "Internal Server Error"});
        }
}