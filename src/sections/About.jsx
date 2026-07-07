import './about.css';
import portrait from '../assets/images/me.png';
import { IconH2 } from '../components/bullet-heading/BulletHeading';

function About() {
    return(
        <section id='about' className='about container'>
            <h1>About</h1>
            <hr/>
            <div className='container blue-subsection about__container'>
                <img className='about__portrait' src={portrait}></img>
                <div>
                    <h2 className='about__subtitle'>Martín Pacheco</h2>
                    <h1 className='about__title'>Information Systems Engineer</h1>
                    <p className='about__content'>
                    Specialized in software engineering, with over 5 years of combined experience and a 
                    strong interest in system  administration, networks, business processes and quality 
                    management.
                    <br/>
                    Also a digital artist, with experience in drawing, 3D modeling and environment design,
                    often exploring horror and abstract themes.
                    <br/>
                    I enjoy understanding how systems work, whether they are complex applications, 
                    computer graphics pipelines or creative environments.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default About;