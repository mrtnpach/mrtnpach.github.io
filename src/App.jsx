import { useState, useRef, useEffect } from 'react';
import Render from './webgl/rendering';
import { vertexShaderSource, fragmentShaderSource } from './webgl/shaders';
import { mat4 } from 'gl-matrix';

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
      <section className='container'>
        <WebGLCanvas></WebGLCanvas>
      </section>
      <Footer></Footer>
      <div className='persistent-bottom'>
        This site is under construction...
      </div>
    </>
  )
}

function WebGLCanvas() {

  const canvasRef = useRef(null);

  useEffect(() => 
  {
    const canvas = canvasRef.current;
    Render(canvas);
  }, []);

  return(
    <canvas
      ref={canvasRef}
      width={256}
      height={256}
      className='webgl-canvas'
    >

    </canvas>
  );
}

export default App
