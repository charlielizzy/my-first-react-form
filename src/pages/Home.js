import BlogList from "../components/BlogList";
import { useEffect, useState } from 'react'

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setTimeout(() => {
      fetchBlog();
    }, 1000)
  }, [])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`http://localhost:3001/blogs`);
      if (!response.ok) {
        throw Error('could not fetch the data for that resource');
      }
      const data = await response.json();
      setBlogs(data);
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
    <div className="home">
      { blogs && <BlogList blogs={blogs} /> }
    </div>
  );
}
 
export default Home;
