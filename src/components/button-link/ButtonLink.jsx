import './button-link.css';

function ButtonLink({icon, href, inNewTab = false, children}) {
    return (
        <a className='icon-button' href={href} target={inNewTab ? '_blank' : ''}>
            <img src={icon} className='icon-button__image'/>
            <span className='icon-button__text'>
                {children}
            </span>
        </a>
    );
}

export default ButtonLink;