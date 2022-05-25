import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import BlogDetails from "./pages/BlogDetails";
import Edit from "./pages/Edit";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/blogs/:id/edit" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
