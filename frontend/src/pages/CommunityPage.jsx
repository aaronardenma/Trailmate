import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Post from "@/components/Post";

export default function CommunityPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState("");
    

    const [showModal, setShowModal] = useState(false);


    const fetchPosts = () => {
        setLoading(true);
        fetch("http://localhost:5001/api/posts/getPosts")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch posts:", err);
                setLoading(false);
            });
    };

    const handleYourPosts = () => {
        navigate('/yourPosts')
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError("Title and description are required.");
            return;
        }
        setPosting(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5001/api/posts/add", {
                method: "POST",
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({title, description, dateOfPost: new Date(), photoUrl}),
            });
            if (!res.ok) throw new Error("Failed to post");
            setTitle("");
            setDescription("");
            setPhotoUrl("");
            setShowModal(false);
            fetchPosts();
        } catch (err) {
            setError(err.message || "Error posting");
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className="w-full p-6 bg-[#DAD7CD] min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-[#588157]">Community Posts</h1>

            <div className="flex justify-center gap-6 mb-10">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#588157] text-white px-6 py-3 rounded font-semibold hover:bg-[#E6E6E6] transition"
                >
                    Make a Post
                </button>

                <button
                    onClick={() => handleYourPosts()}
                    className="bg-[#588157] text-white  px-6 py-3 rounded font-semibold hover:bg-[#E6E6E6] transition"
                >
                    Your Posts
                </button>
            </div>

            {showModal && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center text-[#344E41]">
                            Create New Post
                        </h2>
                        {error && <p className="mb-3 text-red-600 text-center">{error}</p>}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="p-3 border rounded"
                                disabled={posting}
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-3 border rounded resize-y"
                                rows={4}
                                disabled={posting}
                            />
                            <input
                                type="text"
                                placeholder="Photo URL (optional)"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="p-3 border rounded"
                                disabled={posting}
                            />
                            <button
                                type="submit"
                                disabled={posting}
                                className="bg-[#A3B18A] text-white font-semibold py-3 rounded hover:bg-[#859966] transition"
                            >
                                {posting ? "Posting..." : "Post"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid gap-8">
                {loading ? (
                    <p className="text-center text-gray-600">Loading posts...</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-600">No posts found.</p>
                ) : (
                    posts.map((post) => (<Post post={post}  />
                    ))
                )}
            </div>
        </div>
    );
}
