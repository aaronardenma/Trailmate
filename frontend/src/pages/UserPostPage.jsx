import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Toast({ message, onClose }) {
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(onClose, 2000);
        return () => clearTimeout(timer);
    }, [message, onClose]);

    if (!message) return null;
    return (
        <div className="fixed bottom-5 right-5 bg-green-700 text-white px-5 py-3 rounded shadow-lg z-50">
            {message}
        </div>
    );
}

export default function UserPostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState(null);
    const [toast, setToast] = useState("");
    const [formData, setFormData] = useState({ title: "", description: "", photoUrl: "" });

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5001/api/posts/getPostsForUser`, {
                method: 'GET',
                credentials: 'include'
            });
            const data = await res.json();
            setPosts(data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        console.log("reached delete")
        if (!window.confirm("Delete this post?")) return;
        const res = await fetch(`http://localhost:5001/api/posts/deletePost/${postId}`, { method: "DELETE" });
        setToast("Post deleted");
        fetchPosts();
    };

    const startEdit = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            description: post.description,
            photoUrl: post.photoUrl || "",
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5001/api/posts/updatePost/${editingPost._id}`, {
            method: "PUT",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...formData }),
        });
        if (res.ok) {
            setToast("Post updated");
            setEditingPost(null);
            fetchPosts();
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-6 bg-[#F5F5F5] min-h-screen">
            <Toast message={toast} onClose={() => setToast("")} />
            <h1 className="text-4xl font-bold text-center mb-8 text-[#588157]">Your Trail Posts</h1>

            {loading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-600">You haven’t posted anything yet.</p>
            ) : (
                <div className="space-y-8">
                    {posts.map((p) => (
                        <div key={p._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#BFD8B8]">
                            {p.photoUrl && (
                                <img
                                    src={p.photoUrl}
                                    alt={p.title}
                                    className="w-full h-52 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-[#344E41]">{p.title}</h2>
                                <p className="text-gray-700 mt-2">{p.description}</p>

                                <div className="flex items-center text-sm text-gray-500 mt-3 space-x-6">
                                    <span>👍 {p.likes || 0} likes</span>
                                    {p.comments && p.comments.length > 0 && (
                                        <span>
                                            💬 First comment: <em>{p.comments[0].comment}</em>
                                        </span>
                                    )}
                                </div>

                                <div className="flex space-x-4 mt-6">
                                    <button
                                        onClick={() => startEdit(p)}
                                        className="bg-[#6B9080] text-white px-4 py-2 rounded hover:bg-[#52796F] transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p._id)}
                                        className="bg-[#BC4749] text-white px-4 py-2 rounded hover:bg-[#9A3E3E] transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {editingPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 text-2xl"
                            onClick={() => setEditingPost(null)}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-[#344E41]">Edit Post</h2>
                        <form className="space-y-4" onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                placeholder="Title"
                                value={formData.title}
                                onChange={(e) => setFormData((f) => ({ ...f, title: e.target.value }))}
                                className="w-full border p-3 rounded"
                            />
                            <textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData((f) => ({ ...f, description: e.target.value }))}
                                className="w-full border p-3 rounded resize-y h-28"
                            />
                            <input
                                type="text"
                                placeholder="Photo URL"
                                value={formData.photoUrl}
                                onChange={(e) => setFormData((f) => ({ ...f, photoUrl: e.target.value }))}
                                className="w-full border p-3 rounded"
                            />
                            <button
                                type="submit"
                                className="bg-[#A3B18A] text-white font-semibold py-2 px-6 rounded hover:bg-[#859966] transition"
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
