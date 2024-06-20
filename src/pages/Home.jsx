
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol, MDBContainer, MDBTypography } from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import Blogs from '../components/Blogs';
import Search from '../components/Search';
import Category from '../components/Category';

function Home() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const options = ["Travel", "Fashion", "Sports", "Food", "Technology"];

  useEffect(() => {
    loadBlogsData();
  }, []);

  const loadBlogsData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/blogs");
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

  console.log("data", data);

  const handleDelete = async (id) => {
    // Handle delete logic
    if(window.confirm("are you sure you want to delete that blog??")){
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
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
      const response = await axios.get(`http://localhost:5000/blogs?q=${searchValue}`);
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
              {data && data.map((item, index) => (
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
        <MDBCol size="3" >
        <Category options={options} handleCategory={handleCategory} />
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default Home;