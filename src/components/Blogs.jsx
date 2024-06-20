
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";

const Blogs = ({ title, categories, description, id, imageurl, excerpt, handleDelete }) => {
  console.log("Image URL:", imageurl); // Debugging line
  return (
    <MDBCol size={4}>
      <MDBCard className='h-100 mt-2' style={{ maxWidth: "22rem" }}>
        <MDBCardImage
          src={imageurl}
          alt={title}
          position='top'
          style={{ maxWidth: "100%", height: "180px" }}
        />
        <MDBCardBody>
          <MDBCardTitle>{title}</MDBCardTitle>
          <MDBCardText>{excerpt(description)}
            <Link to={`/blog/${id}`}>Read More...</Link>
          </MDBCardText>
          <p>{categories}</p>
          <span>
            <MDBBtn className='mt-1' tag="a" color='none' onClick={() => handleDelete(id)}>
              <MDBIcon
                fas
                icon='trash'
                style={{ color: "#dd4b39" }}
                size='lg'
              />
              Delete
            </MDBBtn>
            <MDBBtn className='mt-1' tag="a" color='none' >
            <Link to={`/editBlog/${id}`}>
              <MDBIcon
                fas
                icon='edit'
                style={{ color: "#55acdd", marginLeft: "10px" }}
                size='lg'
              />
                 Edit
            </Link>
            </MDBBtn>
          </span>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}

export default Blogs;