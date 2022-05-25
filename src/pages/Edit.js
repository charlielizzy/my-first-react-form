import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const Edit = (props) => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Charlottee");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog(id);
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        body,
        author,
      };
      setLoading(true);
      await fetch(`http://localhost:3001/blogs/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
      setTimeout(() => {
        navigate(`/blogs/${id}`);
      }, 2000);
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
      setTitle(data.title);
      setAuthor(data.author);
      setBody(data.body);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <label>Content</label>
      <textarea onChange={(e) => setBody(e.target.value)} value={body} />
      <label>Author</label>
      <select onChange={(e) => setAuthor(e.target.value)} value={author}>
        <option>Carina</option>
        <option>Charlottee</option>
        <option>Tom</option>
      </select>
      <input
        type="submit"
        value={loading ? `Saving Blog...` : `Save`}
        disabled={loading}
        onClick={handleEdit}
      />
    </div>
  );
};

export default Edit;
