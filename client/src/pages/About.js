import React from 'react';
import './About.css';

function About() {
   
  const features = [
    {
      title: 'Efficient File Sharing:',
      description: ' Our solution will streamline file sharing, enabling users to share files directly with others without intermediaries. Smart contracts will manage access permissions, facilitating secure and efficient file sharing among authorized users.',
    },
    {
      title: 'Decentralized Storage:',
      description: 'Our application will utilize a decentralized storage system, distributing user files across multiple nodes in the network. By eliminating reliance on a central server, the risk of single points of failure is reduced, ensuring enhanced data availability.',
    },
    {
      title: 'Data Control and Privacy:',
      description: 'Users will have complete control over their data. By using the hash value generated by pinata, we will guarantee data privacy and security. Smart contracts will govern access control mechanisms, empowering users to define permissions and selectively share files with others.',
    },
    // Add more features as needed
  ];

  return (
    <main className="main-content">
    <div className="about">
        
      <header className="header">
        <nav>
          <ul>
            <li><a href="/"><b>Home</b></a></li>
            <li><a href="/about"><b>Learn More</b></a></li>
         
         <li><a href="/home"><b>File Upload</b></a></li>
           
          </ul>
        </nav>
      </header>
      <section className="features">
       
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div className="feature-card-box" key={index}>
              <h1><u>{feature.title}</u></h1>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </main>
  );
}

export default About;