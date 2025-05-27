import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import api from '../lib/axios';
import { Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';


const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  console.log({ id });

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.log("Error fetching note:", error);
        toast.error("Failed to fetch Note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    }
    catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill all the fields");
      return;
    }
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: title,
        content: content,
      });
      toast.success("Note updated successfully!");
      navigate("/");
    }
    catch (error) {
      console.log("Error saving note:", error);
      toast.error("Failed to update note");
    }
    finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <Loader className="animate-spin size-10" />
      </div>
    );
  }

  console.log({ note });

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note Title" className="input input-bordered" value={title}
                  onChange={(e) => setTitle(e.target.value)} />

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea placeholder="Write your note here...." className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="card-actions justify-end"
                >
                  <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
};

export default NoteDetailPage;
