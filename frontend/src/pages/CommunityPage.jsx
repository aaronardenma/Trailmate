import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Post from "@/components/Post";
import PopoverCalendar from "@/components/PopoverCalendar";
import Select from "react-select";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function CommunityPage() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [posting, setPosting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrailForPost, setSelectedTrailForPost] = useState(null);
    const [trailsForPostModal, setTrailsForPostModal] = useState([]);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [dateRange, setDateRange] = useState({from: null, to: null});

    const fetchPosts = async () => {
        setLoading(true);
        setError(null);

        try {
            let url = "http://localhost:5001/api/posts/searchAndFilter?";
            const params = new URLSearchParams();

            if (debouncedSearchTerm) {
                params.append("q", debouncedSearchTerm);
            }

            const [startDate, endDate] = [dateRange.from, dateRange.to];

            if (startDate) {
                params.append("startDate", startDate.toISOString());
            }
            if (endDate) {
                params.append("endDate", endDate.toISOString());
            }

            url += params.toString();
            console.log("Fetching URL:", url);

            const res = await fetch(url, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setPosts(data);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to fetch posts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchTrailsForModal = async () => {
        try {
            const res = await fetch("http://localhost:5001/api/trails/getTrails", {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch trails for modal");
            }
            const data = await res.json();
            setTrailsForPostModal(data.map((trail) => ({value: trail._id, label: trail.name})));
        } catch (err) {
            console.error("Error fetching trails for modal:", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [debouncedSearchTerm, dateRange]);

    useEffect(() => {
        if (showModal && trailsForPostModal.length === 0) {
            fetchTrailsForModal();
        }
    }, [showModal, trailsForPostModal.length]);

    const handleYourPosts = () => {
        navigate('/yourPosts');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setError("Title and description are required.");
            return;
        }
        if (!selectedTrailForPost) {
            setError("Please select a trail for your post.");
            return;
        }

        setPosting(true);
        setError(null);
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
                    trailId: selectedTrailForPost.value,
                }),
            });
            if (!res.ok) throw new Error("Failed to post");

            setTitle("");
            setDescription("");
            setPhotoUrl("");
            setSelectedTrailForPost(null);
            setShowModal(false);

            fetchPosts();
        } catch (err) {
            setError(err.message || "Error posting. Please try again.");
        } finally {
            setPosting(false);
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setDateRange({from: null, to: null});
    };

    const isFilterActive = searchTerm !== "" || dateRange.from !== null || dateRange.to !== null;

    return (
        <div className="w-full p-6 bg-[#DAD7CD] min-h-screen">
            <h1 className="text-4xl font-bold mb-6 text-center text-[#588157]">Community Posts</h1>

            <div className="flex justify-center gap-6 mb-10">
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#588157] text-white px-6 py-3 rounded font-semibold hover:bg-[#A3B18A] transition"
                >
                    Make a Post
                </button>

                <button
                    onClick={handleYourPosts}
                    className="bg-[#588157] text-white px-6 py-3 rounded font-semibold hover:bg-[#A3B18A] transition"
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
                                className="p-3 border rounded focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                                disabled={posting}
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="p-3 border rounded resize-y focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                                rows={4}
                                disabled={posting}
                            />
                            <div>
                                <label htmlFor="modalTrailSelect"
                                       className="block text-sm font-medium text-gray-700 mb-1">
                                    Select Associated Trail
                                </label>
                                <Select
                                    id="modalTrailSelect"
                                    options={trailsForPostModal}
                                    value={selectedTrailForPost}
                                    onChange={setSelectedTrailForPost}
                                    isClearable
                                    isSearchable
                                    placeholder="Search or select a trail..."
                                    className="w-full"
                                    isDisabled={posting}
                                    styles={{
                                        control: (baseStyles) => ({
                                            ...baseStyles,
                                            borderColor: '#D1D5DB',
                                            '&:hover': {
                                                borderColor: '#A3B18A',
                                            },
                                            boxShadow: 'none',
                                            '&:focus': {
                                                borderColor: 'transparent',
                                                boxShadow: '0 0 0 2px #A3B18A',
                                            },
                                        }),
                                        option: (baseStyles, state) => ({
                                            ...baseStyles,
                                            backgroundColor: state.isFocused ? '#E0E0E0' : 'white',
                                            color: 'black',
                                        }),
                                    }}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Photo URL (optional)"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                className="p-3 border rounded focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                                disabled={posting}
                            />
                            <button
                                type="submit"
                                disabled={posting}
                                className="bg-[#A3B18A] text-white font-semibold py-3 rounded hover:bg-[#859966] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {posting ? "Posting..." : "Post"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Filter Posts</h2>
                    {isFilterActive && (
                        <button
                            onClick={handleClear}
                            className="text-sm text-gray-600 hover:text-gray-900 underline transition"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="trailSearch" className="block text-sm font-medium text-gray-700 mb-1">
                        </label>
                        <input
                            type="text"
                            id="trailSearch"
                            placeholder="Search Trails..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        </label>
                        <PopoverCalendar date={dateRange} setDate={setDateRange}/>
                    </div>
                </div>
            </div>

            <div className="grid gap-8">
                {loading ? (
                    <p className="text-center text-gray-600">Loading posts...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-600">No posts found matching your criteria.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Post key={post._id} post={post}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
