import './skills.css';

import { IconH1, IconH2 } from '../components/bullet-heading/BulletHeading';
import pinkSphereBullet from '../assets/bullets/sp_pink.gif';
import blueTri from '../assets/bullets/bl_tri.gif';
import redTri from '../assets/bullets/rd_tri.gif';
import purpleTri from '../assets/bullets/pr_tri.gif';

import WebGLCanvas from '../components/webgl-canvas/WebGLCanvas';

import skelly from '../assets/images/skelly_computer.webp';

function Skills() {
    return(
        <section id='skills' className='skills container'>
          <IconH1 icon={null}>Skills</IconH1>
          <hr/>
          <div className='column-container'>
            <div>
                <IconH2 icon={blueTri}> Languages/Technologies</IconH2>
                <ul className='skill-list'>
                    <li>
                        C/C++, SQL, C#, .NET Framework (4.7+), .NET Core (6+),
                        ASP.NET, Entity Framework, Windows Forms</li>
                    <li>HTML, CSS & JavaScript (ES6+), React</li>
                </ul>
            </div>
            <div>
                <IconH2 icon={redTri}> Tools</IconH2>
                <ul className='skill-list'>
                    <li>
                        Git, Postman, SQL Management Studio, Linux, Windows, Windows Server, Docker, VirtualBox
                    </li>
                </ul>
            </div>
            <div>
                <IconH2 icon={purpleTri}>Software development</IconH2>
                <ul className='skill-list'>
                    <li>
                        Software Architecture, Desktop Applications, Distributed Systems,
                        OOP, REST APIs, UML, Low-Level Development, 
                        Optimization, Refactoring
                    </li>
                </ul>
            </div>
            <img className='skills-image centered-image' src={skelly}/>
          </div>
          <br/>
        <IconH2 icon={pinkSphereBullet}>Other skills and interests</IconH2>
        <p>
            I enjoy working close to the systems I build, from application architecture down to performance, rendering, and low-level programming.
            Saying I love learning how things work on a fundamental level would be a bit of an understatement. I believe 
            that <strong>understading why they work</strong> is just as important as <strong>understanding why they fail </strong> 
            when something goes wrong. Here's a list of some of the things I've studied and experimented with:
        </p>
          <div className='red-subsection other-skills'>
            <WebGLCanvas sizePixels={180}></WebGLCanvas>
            <ul>
                <li>
                Operating system design and implementation
                </li>
                <li>
                Performance-oriented software development, memory management and parallelization.
                </li>
                <li>
                Reverse engineering, compilers, low level systems and x86 assembly.
                </li>
                <li>
                Game engine architecture, 3D renderers (using OpenGL) and the applied mathematics behind computer graphics
                </li>
                <li>
                Linux-based systems, server management, virtualization and containerization
                </li>
                <li>
                Local area network design, Ethernet and wireless networks, Cisco equipment configuration
                </li>
            </ul>
            <br></br>
          </div>
        </section>
    );
}

export default Skills;