import './footer.css';

import voidBlinkie from '../../assets/blinkies/void.gif';

function Footer() {
    return(
        <footer className='footer container'>
            <div className='footer__container'>
                <p>© 1999 Martín Pacheco</p>
            </div>
            <div className='footer__container'>
                <img src={voidBlinkie} className='footer__blinky'/>
            </div>
        </footer>
    );
}

export default Footer;