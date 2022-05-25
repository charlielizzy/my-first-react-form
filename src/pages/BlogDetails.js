import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      fetchBlog(id);
    }, 1000);
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBlog = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/blogs/${id}`);
      if (!response.ok) {
        throw Error("could not fetch the data for that resource");
      }
      const data = await response.json();
      setBlog(data);
      setError(null);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  if (isPending) return <div>Loading...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="blog-details">
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>Delete</button>
          <Link to={`/blogs/${id}/edit`}>Edit</Link>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
