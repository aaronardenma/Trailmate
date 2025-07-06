import { Link } from "react-router-dom";
import UserPreview from "./UserPreview";
import { useEffect, useState } from "react";

export default function Post({ post, handleSaveComment, handleLike }) {
  //   console.log("comment: ", comment);
  //   console.log("showComment: ", showComment);
  //   console.log("post.comments: ", post.comments);
  const [postComments, setPostComments] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/comments/post/${post._id}`,
          {
            method: "GET",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch comments");
        }

        const data = await res.json();
        console.log("Comments data:", data);

        // Extract comments array from response
        setPostComments(data.comments || []);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchLikeStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/posts/postLikeStatus/${post._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user like status");
        }
        const data = await res.json();
        console.log("like status", data.liked);
        setLikeStatus(data.liked);
      } catch (err) {
        console.error(err);
        setLikeStatus(false);
      }
    };
    fetchPostComments();
    fetchLikeStatus();
  }, []);

  return (
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
        <div className="flex mt-3 text-sm text-gray-600">
          Posted by:
          <UserPreview
            user={post.userId}
            trigger={
              <p className="hover:underline cursor-pointer w-fit ml-2">
                {post.userId?.firstName
                  ? `${post.userId?.firstName} ${post.userId?.lastName}`
                  : "Unknown User"}
              </p>
            }
          />
        </div>
        <p className="mt-1 text-gray-500 text-sm flex items-center gap-2">
          Likes: {post.likes}
          <button
            onClick={() => handleLike(post)}
            className="ml-2 text-sm bg-[#A3B18A] text-white px-3 py-1 rounded hover:bg-[#859966] transition cursor-pointer"
          >
            {likeStatus ? "Unlike" : "Like"}
          </button>
        </p>

        <div className="mt-1 text-gray-500 text-sm flex items-center gap-2">
          {/* {
            <button
              onClick={() => {
                // setShowInput(true);
                setShowCommentInput(!showCommentInput);
              }}
              className="ml-2 text-sm bg-[#A3B18A] text-white px-3 py-1 rounded hover:bg-[#859966] transition"
            >
              Comment
            </button>
          } */}

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
            <textarea
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-fit border p-3 rounded text-sm resize-none"
              rows={2}
            />
            <button
              disabled={!comment.trim()}
              onClick={() => handleSaveComment(post)}
              className=" text-sm bg-[#A3B18A] text-white p-2 rounded hover:bg-[#859966] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </div>

        {postComments && postComments.length > 0 && (
          <div className="mt-4 p-3 bg-gray-100 rounded">
            <strong className="text-gray-800">Comments:</strong>
            <div className="mt-2 space-y-2">
              {postComments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="bg-white p-2 rounded border"
                >
                  <p className="text-gray-700">{comment.comment}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    By:{" "}
                    <UserPreview
                      user={comment.userID}
                      trigger={
                        comment.userID?.firstName ? (
                          <p className="ml-1 cursor-pointer hover:underline w-fit">
                            {comment.userID.firstName} {comment.userID.lastName}{" "}
                            • {new Date(comment.date).toLocaleDateString()}
                          </p>
                        ) : (
                          "Unknown User"
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
