import React from 'react';
import {
  MDBCol,
  MDBCard,
  MDBCardTitle,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBRow
  
} from 'mdb-react-ui-kit';
import { Link } from "react-router-dom";
function About() {
  return (
    <div>
      <h2>Welcome to the LennyToday Updates&News</h2>
      <p>
      LennyToday Updates&News is your go-to source for insightful articles, captivating photos,
        and engaging videos covering a wide range of topics. From travel and fashion to
        sports, food, technology, and more, we bring you the latest trends and in-depth
        stories that matter.
      </p>
      <h3>YouTube Channel</h3>
      <p>
        Subscribe to our YouTube channel for exclusive video content. Whether you're
        looking for travel tips, fashion trends, sports highlights, or delicious recipes,
        our channel has something for everyone.
      </p>
      <iframe
        title="https://www.youtube.com/@lennytoday. "
        width="560"
        height="315"
        src="https://www.youtube.com/embed/aeB-JkgPAVg"
        
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <h3>Photo Gallery</h3>
      <div>
      <MDBRow>
      <MDBCol size={4}>
        <MDBCard className='h-100 mt-2' style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            src="/images/lenny.jpg"
            alt='CEO'
            position='top'
            style={{ maxWidth: "100%", height: "300px" }}
          />
          <MDBCardBody>
            <MDBCardTitle>Founder/CEO</MDBCardTitle>
            <MDBCardText>
              I see lenny today as the world enlightmate and i understand how information is power.....
              <Link to={``} target='_blank'>Read More...</Link>
            </MDBCardText>
            <p>{`Leonard NSHIMIYIMANA`}</p>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol size={4}>
        <MDBCard className='h-100 mt-2' style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            src="/images/ceo.jpg"
            alt='developer'
            position='top'
            style={{ maxWidth: "100%", height: "300px" }}
          />
          <MDBCardBody>
            <MDBCardTitle>Developer</MDBCardTitle>
            <MDBCardText>
              He is a passionate developer and loves learning new technologies. Today, he is involved from the beginning.
              <Link to={`https://jeid.livetoserves.com`} target='_blank'>Read More...</Link>
            </MDBCardText>
            <p>{`Likes Him`}</p>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      <MDBCol size={4}>
        <MDBCard className='h-100 mt-2' style={{ maxWidth: "22rem" }}>
          <MDBCardImage
            src="/images/ceo.jpg"
            alt='developer'
            position='top'
            style={{ maxWidth: "100%", height: "300px" }}
          />
          <MDBCardBody>
            <MDBCardTitle>Developer</MDBCardTitle>
            <MDBCardText>
              He is a passionate developer and loves learning new technologies. Today, he is involved from the beginning.
              <Link to={`https://jeid.livetoserves.com`} target='_blank'>Read More...</Link>
            </MDBCardText>
            <p>{`Likes Him`}</p>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
      </div>
      <h3>Watch Our Latest Videos</h3>
      <div>
        {/* Embed more videos or create a video gallery */}
        <iframe
          title="Latest Video 1"
          width="300"
          height="200"
          src="https://www.youtube.com/embed/Fv67y4JiLto"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginRight: '10px' }}
        ></iframe>
        <iframe
          title="Latest Video 2"
          width="300"
          height="200"
          src="https://www.youtube.com/embed/x974sFpyryE"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ marginRight: '10px' }}
        ></iframe>
        {/* Add more videos as needed */}
      </div>
      <h3>Connect With Us</h3>
      <p>
        Stay updated with the latest news, articles, and behind-the-scenes stories.
        Follow us on social media for more exclusive content and updates.
      </p>
      {/* Add social media links */}
    </div>
  );
}

export default About;
