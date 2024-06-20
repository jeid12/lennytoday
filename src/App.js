import { Routes,BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AddEdetBlog from './pages/AddEdetBlog';
import About from './pages/About';
import Home from './pages/Home';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Header from './components/Header';

function App() {
  return (
    <Router>
          <div className="App">
            <Header/>
            <ToastContainer/>
            <Routes>
              <Route path="/" element={<Home />} />
              
              <Route path="/addblog" element={<AddEdetBlog />} />
              <Route path="/editblog/:id" element={<AddEdetBlog />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
              

            </Routes>
          </div>
  </Router>
  );
}

export default App;
