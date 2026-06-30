import './header.css';

import growingTree from '../../assets/images/growing_tree.gif';
import shakespeareIcon from '../../assets/icons/shkspere.gif';
import mailIcon from '../../assets/icons/mail4.gif';
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
                        <a href='#about'>
                            <IconButton icon={shakespeareIcon}>
                                About
                            </IconButton>
                        </a>
                    </li>
                    <li>
                        <IconButton icon={codeIcon}>
                            Experience
                        </IconButton>
                    </li>
                    <li>
                        <IconButton icon={mailIcon}>
                            Contact
                        </IconButton>
                    </li>
                    <li>
                        <IconButton icon={commentsIcon}>
                            Resume
                        </IconButton>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

function IconButton({icon, children}) {
    return (
        <button className='icon-button'>
            <img src={icon} className='icon-button__image'/>
            <p className='icon-button__text'>
                {children}
            </p>
        </button>
    );
}

export default Header;