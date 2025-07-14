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
    const [trailSearch, setTrailSearch] = useState("");
    const [trailSuggestions, setTrailSuggestions] = useState([]);
    const [selectedTrail, setSelectedTrail] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [allTrails, setAllTrails] = useState([]);

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

    useEffect(() => {
        const fetchAllTrails = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/trails/getTrails");
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                const data = await res.json();
                setAllTrails(data);
            } catch (err) {
                console.error("Error fetching all trails for client-side search:", err);
            }
        };
        fetchAllTrails();
        fetchPosts(); 
    }, []);

    const handleYourPosts = () => {
        navigate('/yourPosts')
    }

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
                body: JSON.stringify({
                    title,
                    description,
                    dateOfPost: new Date(),
                    photoUrl,
                    trailId: selectedTrail ? selectedTrail._id : null,
                  }),                  
            });
            if (!res.ok) throw new Error("Failed to post");
            setTitle("");
            setDescription("");
            setPhotoUrl("");
            setShowModal(false);
            setSelectedTrail(null); 
            setTrailSearch("");
            fetchPosts();
        } catch (err) {
            setError(err.message || "Error posting");
        } finally {
            setPosting(false);
        }
    };

    const handleTrailSearchChange = (e) => {
        const val = e.target.value;
        setTrailSearch(val);
        setSelectedTrail(null); 

        if (val.trim() === "") {
          setTrailSuggestions([]);
          return;
        }
      
        const filteredSuggestions = allTrails.filter(trail =>
            trail.name.toLowerCase().includes(val.toLowerCase())
        );
        setTrailSuggestions(filteredSuggestions);
    };
      
    const handleSelectTrail = (trail) => {
        setSelectedTrail(trail);
        setTrailSearch(trail.name);
        setTrailSuggestions([]); 
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
                            onClick={() => {
                                setShowModal(false);
                                setSelectedTrail(null); 
                                setTrailSearch(""); 
                                setTitle("");
                                setDescription("");
                                setPhotoUrl("");
                                setError("");
                            }}
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
                            <div className="relative">
                                {selectedTrail && (
                                    <p className="text-sm text-gray-600 mb-1">
                                        Selected Trail: <span className="font-semibold">{selectedTrail.name}</span>
                                        <button 
                                            type="button" 
                                            onClick={() => {
                                                setSelectedTrail(null);
                                                setTrailSearch("");
                                                setTrailSuggestions([]);
                                            }}
                                            className="ml-2 text-red-500 hover:text-red-700 text-xs"
                                        >
                                            (clear)
                                        </button>
                                    </p>
                                )}
                                <input
                                    type="text"
                                    placeholder="Search for a trail"
                                    value={trailSearch}
                                    onChange={handleTrailSearchChange}
                                    className="p-3 border rounded w-full"
                                    disabled={posting}
                                    autoComplete="off"
                                />
                                {trailSuggestions.length > 0 && trailSearch.trim() !== "" && !selectedTrail && ( 
                                    <ul className="absolute z-10 bg-white border rounded max-h-48 overflow-y-auto w-full mt-1 shadow-lg">
                                    {trailSuggestions.map((trail) => (
                                        <li
                                        key={trail._id}
                                        onClick={() => handleSelectTrail(trail)}
                                        className="p-2 cursor-pointer hover:bg-[#A3B18A]"
                                        >
                                        {trail.name}
                                        </li>
                                    ))}
                                    </ul>
                                )}
                            </div>
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
                    posts.map((post) => (<Post key={post._id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
}