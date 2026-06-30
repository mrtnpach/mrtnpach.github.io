import { useState } from 'react';

import './App.css';
import './sections/about.css';
import portrait from './assets/images/me.png';
import tree from './assets/images/tree.gif';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Header/>
      {/* <div className='mobile-menu container'></div> */}
      <main>
        <section id='about' className='about container'>
          <h2 className='about__subtitle'>Martín Pacheco</h2>
          <h1 className='about__title'>Information Systems Engineer</h1>
          <div className='container blue-subsection about__container'>
            <img className='about__portrait' src={portrait}></img>
            <p className='about__content'>
              Information Systems Engineering graduate and .NET Developer 
              with 5 years of academic and professional experience building
              APIs, internal tools, and desktop/web applications using C#,
              NET, ASP.NET, SQL Server and React. Interested in backend 
              roles focused on scalable, performance-oriented business 
              systems.
              </p>
          </div>
        </section>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
