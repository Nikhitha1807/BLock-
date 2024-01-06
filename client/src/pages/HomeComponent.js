// src/components/HomeComponent.js
import React from 'react';
import './HomeComponent.css';

function HomeComponent() {
  const imageUrl = 'https://community.nasscom.in/sites/default/files/styles/960_x_600/public/media/images/loud%20%2811%29_0.png?itok=n_SwQmH7';
  <img src={imageUrl} alt="BlockDrive" style={{ width: '500px', height: '500px' }} />


  return (
    <div className="home">
     <header className="header">
  <nav>
    
   
    <ul>
      <li><a href="/"><b>Home </b></a></li>
      <li><a href="/about"><b>Learn More</b></a></li>
         
         <li><a href="/home"><b>File Upload</b></a></li>
      
    </ul>
  </nav>
</header>

      <main className="main-content">
        <section className="hero">
          <div className="content-container">
            <div className="image-container">
            <img src={imageUrl} alt="BlockDrive" style={{ width: '500px', height: '450px' }} />
            </div>
            <div className="card-container">
              <div className="card">
              <h1 style={{ color: 'white' }}><u><i>BlockDrive</i></u></h1>

              
                  <p style={{ fontSize: '18px' }}><b>Introducing a revolutionary decentralized file storage system powered by blockchain technology.</b></p>
    <p style={{ fontSize: '18px' }}><b>Users can upload their file, share their files without the fear of security issues.</b></p>
    <p style={{ fontSize: '18px' }}><b>Unlike traditional centralized storage, our system addresses security, ownership control, and accessibility concerns.</b></p>

            </div>
            </div>
          </div>
        </section>
        <section className="features">
          {/* Add your feature content here */}
        </section>
      </main>
      
    </div>
  );
}

export default HomeComponent;