import React from 'react';
import Navbar from '../components/NavBar';

const LandingPage = () => {
  return (
    <div>
      <div className="fixed-top">
        <Navbar elements={[
          { to: '/registration', label: 'SignUp' },
          { to: '/login', label: 'SignIn' },
        ]} />
      </div>
      <div className="header d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(135deg, #ffffff, #cccccc, #000000)', minHeight: '100vh' }}>
        <div className="container text-center">
          <div className="row align-items-center" style={{ paddingTop: '8rem' }}>
            <div className="col-md-6">
              <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%2Fimages%3Fk%3Dblack%2Bcredit%2Bcard%2Btemplate&psig=AOvVaw0rpjCy8b3VXsbswrniZ3g9&ust=1714584291218000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDWoq666oUDFQAAAAAdAAAAABAE" alt="" className="img-fluid w-100" />
            </div>
            <div className="col-md-6">
              <div className="text-center">
                <h1 className="text-heading">Banking Made Easy</h1>
                <p className="text-paragraph">Experience seamless banking at your fingertips.</p>
                <a href="/registration" className="btn btn-primary">Explore Now  &#8594;</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
