import './header.css';

import ButtonLink from '../button-link/ButtonLink';

import growingTree from '../../assets/images/growing_tree.gif';
import shakespeareIcon from '../../assets/icons/shkspere.gif';
import docIcon from '../../assets/icons/tech_doc.gif';
import codeIcon from '../../assets/icons/codebtn.gif';
import commentsIcon from '../../assets/icons/comments.gif';

function Header() {
    return (
        <>
            <header className='header container'>
                <img className='header__image' src={growingTree}></img>
                <h1>mrtnpach's website</h1>
            </header>
            <Menu></Menu>
        </>
    );
}

function Menu(){
    return(
        <div className='menu container'>
            <nav>
                <ul className='header__menu'>
                    <li>
                        <ButtonLink icon={shakespeareIcon} href={'#about'}>
                            About
                        </ButtonLink>
                    </li>
                    <li>
                        <ButtonLink icon={commentsIcon} href={'#skills'}>
                            Skills
                        </ButtonLink>
                    </li>
                    <li>
                        <ButtonLink icon={codeIcon} href={'#experience'}>
                            Experience
                        </ButtonLink>
                    </li>
                    <li>
                        <ButtonLink 
                            icon={docIcon} 
                            href={'../../public/Martin_Pacheco_CV.pdf'}
                            inNewTab={true}
                        >
                            Resume
                        </ButtonLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
}


export default Header;