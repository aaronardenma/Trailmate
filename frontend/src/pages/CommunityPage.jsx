import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function CommunityPage() {
    let user_id = window.localStorage.getItem("user_id")
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [showComment, setShowComment] = useState([]);
    const [comment, setComment] = useState("");
    const [userLinks, setUserLink] = useState({});

    const [showModal, setShowModal] = useState(false);

    const handleSaveComment = async (post) => {
        setShowInput(false);
        setShowComment([])

        try {
            const res = await fetch(`http://localhost:5001/api/posts/updatePostComments/${post._id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    comments: comment,
                    user_id: user_id
                }),
            });

            if (!res.ok) throw new Error("Failed to like post");
            const updatedPost = await res.json();
            fetchPosts()
        } catch (err) {
            console.error("Error liking post:", err);
        }
    }

    const fetchPosts = () => {
        console.log("user_id " + user_id)

        setLoading(true);
        fetch("http://localhost:5001/api/posts/getPosts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch posts:", err);
                setLoading(false);
            });
    };

    const handleLike = async (post) => {
        try {

            const res = await fetch(`http://localhost:5001/api/posts/updatePostLikes/${post._id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    // likes: post.likes,
                    // comments: post.comments,
                    user_id: user_id
                }),
            });

            if (!res.ok) throw new Error("Failed to like post");
            const updatedPost = await res.json();
            fetchPosts()
        } catch (err) {
            console.error("Error liking post:", err);
        }
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
            const userId = localStorage.getItem("user_id");
            const res = await fetch("http://localhost:5001/api/posts/addPost", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userId, title, description, dateOfPost: new Date(), photoUrl}),
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


    // TODO: This is the new logic
    const handleUserLinks = async (e) => {
        try {
            setLoading(true);
            fetch(`http://localhost:5001/api/posts/getUser/${post._id}`)
                .then((res) => res.json())
                .then((data) => {
                    setUserLink(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch user profile:", err);
                    setLoading(false);
                });
        } catch (err) {
            console.error("Error liking post:", err);
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-[#DAD7CD] min-h-screen">
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
                    posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300"
                        >
                            {post.photoUrl && (
                                <img
                                    src={post.photoUrl}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                                <p className="text-gray-700 mt-2">{post.description}</p>
                                <p className="mt-3 text-sm text-gray-600">
                                    Posted by:{" "}
                                    <span className="font-semibold">
                                        {post.userId?.firstName
                                            ? `${post.userId.firstName} ${post.userId.lastName}`
                                            : "Unknown User"}
                                    </span>
                                </p>
                                <p className="mt-1 text-gray-500 text-sm flex items-center gap-2">
                                    Likes: {post.likes}
                                    <button
                                        onClick={() => handleLike(post)}
                                        className="ml-2 text-sm bg-[#A3B18A] text-white px-3 py-1 rounded hover:bg-[#859966] transition"
                                    >Like
                                    </button>
                                </p>

                                <p className="mt-1 text-gray-500 text-sm flex items-center gap-2">
                                    {(
                                        <button
                                            onClick={() => {
                                                // setShowInput(true);
                                                setShowComment([post._id]);
                                            }}
                                            className="ml-2 text-sm bg-[#A3B18A] text-white px-3 py-1 rounded hover:bg-[#859966] transition"
                                        >Comment
                                        </button>
                                    )}

                                    {showComment.find(id => id === post._id) && (
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Comments..."
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full border p-3 rounded"
                                            />
                                            <button
                                                onClick={() => handleSaveComment(post)}
                                                className="ml-2 text-sm bg-[#A3B18A] text-white px-3 py-1 rounded hover:bg-[#859966] transition"
                                            > Save
                                            </button>
                                        </div>
                                    )}
                                </p>

                                {post.comments && post.comments.length > 0 && (
                                    <div className="mt-4 p-3 bg-gray-100 rounded">
                                        <strong>Comments :</strong>{" "}
                                        {/*<span>{post.comments[0]}</span>*/}
                                        <span>{post.comments.map((comment, index) => (
                                            <ul key={index}>
                                                {comment}
                                            </ul>
                                        ))}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
