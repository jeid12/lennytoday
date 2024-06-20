import React, { useState, useEffect, useCallback } from 'react';
import {
  MDBIcon, MDBContainer,
  MDBRow, MDBCol, MDBCard, MDBCardText,
  MDBCardTitle, MDBCardBody,
  MDBCardImage, MDBTypography
} from "mdb-react-ui-kit";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import Badge from '../components/Badge';
import { toast } from 'react-toastify';

const Blog = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const [relatedPost, setRelatedPost] = useState([]);

  const getSingleBlog = useCallback(async () => {
    try {
      const response = await axios.get(`https://lennytodaydata.onrender.com/blogs/${id}`);
      const relatedPostData = await axios.get(`https://lennytodaydata.onrender.com/blogs/?categories=${response.data.categories}&_start=0&_end=3`);

      if (response.status === 200) {
        setBlog(response.data);
        setRelatedPost(relatedPostData.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id, getSingleBlog]);

  const excerpt = (str) => {
    if (str.length > 55) {
      str = str.substring(0, 55) + " ... ";
    }
    return str;
  };

  const styleInfo = {
    display: "inline",
    marginLeft: "5px",
    float: "right",
    marginTop: "7px"
  };

  return (
    <MDBContainer style={{ border: "1px solid #d1ebe8" }}>
      <Link to="/">
        <strong style={{ float: 'left', color: 'black' }} className='mt-3'>
          Go Back
        </strong>
      </Link>

      <MDBTypography tag="h2" className='text-muted mt-2' style={{ display: "inline-block" }}>
        {blog && blog.title}
      </MDBTypography>
      <img
        src={blog && blog.imageurl}
        className=" img-fluid rounded"
        alt={blog && blog.title}
        style={{ width: "100%", maxHeight: "600px" }}
      />
      <div style={{ marginTop: "20px" }}>
        <div style={{ height: "43px", background: "#f6f6f6" }}>
          <MDBIcon
            style={{ float: "left" }}
            className="mt-3"
            far
            icon="calendar-alt"
            size="lg"
          />
          <strong style={{ float: "left", marginTop: "12px", marginLeft: "2px" }}>
            {blog && blog.date}
          </strong>
          <Badge styleInfo={styleInfo}>{blog && blog.categories}</Badge>
        </div>
        <MDBTypography className='lead md-0'>
          {blog && blog.description}
        </MDBTypography>
      </div>
      {
        relatedPost && relatedPost.length > 0 && (
          <>
            {relatedPost.length > 1 && <h1>Related Posts</h1>}
            <MDBRow className="row-cols-1 row-cols-md-3 g-4">
              {relatedPost.filter((item) => item.id !== id).map((item, index) => (
                <MDBCol key={index}>
                  <MDBCard>
                    <Link to={`/blog/${item.id}`}>
                      <MDBCardImage
                        src={item.imageurl}
                        alt={item.title}
                        position='top'
                      />
                    </Link>
                    <MDBCardBody>
                      <MDBCardTitle>{item.title}</MDBCardTitle>
                      <MDBCardText>{excerpt(item.description)}</MDBCardText>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBRow>
          </>
        )
      }
    </MDBContainer>
  );
};

export default Blog;