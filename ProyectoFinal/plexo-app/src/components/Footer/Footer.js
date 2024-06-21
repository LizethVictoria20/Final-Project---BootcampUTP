import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const teamMembersLeft = [
  { name: 'TheYiro', github: 'https://github.com/TheYiro' },
  { name: 'LizethVictoria20', github: 'https://github.com/LizethVictoria20' },
  { name: 'davidpatjus', github: 'https://github.com/davidpatjus' },
  { name: 'SMCkillua', github: 'https://github.com/SMCkillua' }
];

const teamMembersRight = [
  { name: 'Sickcop', github: 'https://github.com/Sickcop' },
  { name: 'Vanessago2001', github: 'https://github.com/Vanessago2001' },
  { name: 'andresjararuiz', github: 'https://github.com/andresjararuiz' },
  { name: 'Gocalli', github: 'https://github.com/Gocalli' }
];

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container text-center">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            {teamMembersLeft.map((member, index) => (
              <div key={index}>
                <FaGithub color='#7429BA'/> <a className="text-decoration-none text-dark" href={member.github} rel="noopener noreferrer">{member.name}</a>
              </div>
            ))}
          </div>
          <div className= "col-md-4 mb-3 mb-md-0">
          <Link to="/">
            <img
              src="https://i.ibb.co/R4NNzs0/plexologo-removebg-preview.png" 
              alt="PLEXO STORE Logo"
              style={{ width: '50%', maxWidth: '800px' }} 
              className="mb-2"
            />
            </Link>
              <p class="fs-6 fw-bold text-dark">© 2024 PLEXO STORE. All Rights Reserved.</p>
          </div>
          <div className="col-md-4">
            {teamMembersRight.map((member, index) => (
              <div key={index}>
                <FaGithub color='#7429BA'/> <a className="text-decoration-none text-dark"href={member.github} rel="noopener noreferrer">{member.name}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

