
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';
import LatestBlog from '../components/LatestBlog';

function Home() {
  const [data, setData] = useState([]);
  const [latestBlog, setLatestBlog] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const options = ["Travel", "Fashion", "Sports", "Food", "Technology"];

  useEffect(() => {
    loadBlogsData();
    fetchLatestBlog()
  }, []);

  const loadBlogsData = async () => {
    try {
      const response = await axios.get("https://lennytodaydata.onrender.com/blogs");
      console.log('response', response);
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Something went wrong??");
      }
    } catch (error) {
      console.error('Error fetching data', error);
      toast.error("Something went wrong??");
    }
  };

  const fetchLatestBlog=async () =>{
      const totalBlog = await axios.get("https://lennytodaydata.onrender.com/blogs");
      const start = totalBlog.data.length -4;
      const end = totalBlog.data.length;

      const response = await axios.get(`https://lennytodaydata.onrender.com/blogs?_start=${start}&_end=${end}`);
      if (response.status === 200) {
        setLatestBlog(response.data);
      } else {
        toast.error("Something went wrong??");
      }
  }

  console.log("data", data);

  const handleDelete = async (id) => {
    // Handle delete logic
    if(window.confirm("are you sure you want to delete that blog??")){
      const response = await axios.delete(`https://lennytodaydata.onrender.com/blogs/${id}`);
      console.log('response', response);
      if (response.status === 200) {
       toast.success("blog deleted sucessfully!")
       loadBlogsData()
      } else {
        toast.error("Something went wrong??");
      }

    }
  };

  const excerpt = (str) => {
    if (str.length > 50) {
      str = str.substring(0, 50) + " ... ";
    }
    return str;
  };


  const onInputChange = (e) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      loadBlogsData();
    }
  };


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://lennytodaydata.onrender.com/blogs?q=${searchValue}`);
      if (response.status === 200) {
        setData(response.data);
      } else {
        toast.error("Something went wrong??");
      }
    } catch (error) {
      console.error('Error fetching data', error);
      toast.error("Something went wrong??");
    }
  };

  const handleCategory = async (category) =>{
    const response  =await axios.get(`https://lennytodaydata.onrender.com/blogs/?categories=${category}`);
    if(response.status === 200){
      setData(response.data)
    }else{
      toast.error("something went wrong ?")
    }
  }

  return (
    <>
   <Search searchValue={searchValue} onInputChange={onInputChange} handleSearch={handleSearch} />
      <MDBRow>
        {data.length === 0 && (
          <MDBTypography className='text-center mb-0' tag="h2">
            No Blog Found!!
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow>
              {data 
              && data.map((item, index) => (
                <Blogs
                  key={index}
                  {...item}
                  excerpt={excerpt}
                  handleDelete={handleDelete}
                />
              ))}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
        <MDBCol size="3">
  <h4 className='text-start'>Latest Post</h4>
  {latestBlog && 
    latestBlog.map((item, index) => (
      <LatestBlog key={index} {...item} />
    ))
  }
  <Category options={options} handleCategory={handleCategory} />
</MDBCol>
      </MDBRow>
    </>
  );
}

export default Home;