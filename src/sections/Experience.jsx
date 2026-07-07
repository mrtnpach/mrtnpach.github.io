import './experience.css';

import { IconH1, IconH2 } from '../components/bullet-heading/BulletHeading';
import aquaSphereBullet from '../assets/bullets/sp_aqua.gif';
import woodBullet from '../assets/bullets/sp_wood.gif';

import computerGirl from '../assets/images/computer_girl.gif';

function Experience() {
    return(
        <section id='experience' className='experience container'>
            <h1>Experience</h1>
            <hr/>
            <p className='p-dark-emerald'>
            <strong>5+ years</strong> of academic and professional experience building APIs, internal tools, and desktop/web applications using C#, .NET, ASP.NET and SQL.
            I also have experience in video game development, including programming, 3D modelling and level/environment design, as well as foundational knowledge of game engine development, 
            particularly rendering.
            </p>
            <br/>
            <IconH2 icon={aquaSphereBullet}>
            Freelance development (Dec 2025 - present)
            </IconH2>
            <p>
            Every now and then I get the chance to develop/maintain websites and applications for small and growing local business. 
            I gather and analyze requirements, design features and implement solutions using technologies such as .NET, PostgreSQL, SQLite, 
            HTML, CSS, JavaScript and React.
            </p>
            <br/>
            <IconH2 icon={aquaSphereBullet}>
            Scania Industrial Plant (Jun 2024 - Nov 2025)
            </IconH2>
            <p>
            Worked in a large-scale Manufacturing Execution System (MES) in a highly-dynamic manufacturing environment,
            alongside an amazing and talented development team.
            </p>
            <ul>
            <li>
                Designed and developed APIs and desktop applications to support manufacturing and operational workflows.
            </li>
            <li>
                Built and optimized internal libraries that improved development efficiency and code maintainability across
                multiple systems, using techniques such as reflection.
            </li>
            <li>
                Collaborated with the development team to define coding best practices and improve software quality across
                production-focused applications.
            </li>
            </ul>
            <br/>
            <IconH2 icon={aquaSphereBullet}>
            Deathmoon Studio (Feb 2018 - Apr 2018)
            </IconH2>
            <p>
            Before starting college, I had the pleasure of working as an intern developer for the video-game development studio Deathmoon Studio, 
            based in Tucumán. I contributed to coding, 3D modeling and mission design/writing for the game 
            "Revolución", set in 1810s Argentina. Despite my short time there, I have some fond memories of the experience and teammates.
            </p>
            <br/>
            <img src={computerGirl} className='centered-image experience-image'/>
            {/* <br/>
            <IconH2 icon={woodBullet}>Education</IconH2>
            <ul>
                <li>2018 - 2025 | <strong>Information Systems Engineer</strong> | Universidad Tecnológica Nacional</li>
                <li>2011 - 2017 | <strong>Electronics Technician</strong> | Instituto Técnico Lorenzo Massa</li>
            </ul>
            <IconH2 icon={woodBullet}>Languages</IconH2>
            <ul>
                <li><strong>Spanish</strong> | Native</li>
                <li><strong>English</strong> | C1 (CEFR) - Cambridge English Level 2 Certificate in ESOL International (First)</li>
            </ul> */}
        </section>
    );
}

export default Experience;