import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Charlottee");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title,
        body,
        author,
      };
      setLoading(true);
      await fetch("http://localhost:3001/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
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
          value={loading ? `Posting Blog...` : `Post`}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default Create;
