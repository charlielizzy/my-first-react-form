import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetchBlog(id);
    }, 1000)
  }, [id])

  const fetchBlog = async(id) => {
    try {
      const response = await fetch(`http://localhost:3001/blogs/${id}`);
      if (!response.ok) {
        throw Error('could not fetch the data for that resource');
      } 
      const data = await response.json();
      setBlog(data);
      setError(null);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  }

  if (isPending) return <div>Loading...</div>

  if (error) return <div>{error}</div>

  return (
    <div className="blog-details">
      { blog && (
        <article>
          <h2>{ blog.title }</h2>
          <p>Written by { blog.author }</p>
          <div>{ blog.body }</div>
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;