import { useState } from 'react';

import './App.css';

import tree from './assets/images/tree.gif';
import drawing from './assets/images/drawing.gif';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

import { IconH1, IconH2 } from './components/bullet-heading/BulletHeading';

import About from './sections/About';
import Experience from './sections/Experience';
import Skills from './sections/Skills';

function App() {
  return (
    <>
      <Header/>
      {/* <div className='mobile-menu container'></div> */}
      <main>
        <About></About>
        <Skills></Skills>
        <Experience></Experience>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
