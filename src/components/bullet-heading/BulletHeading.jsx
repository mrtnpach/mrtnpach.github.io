import './bullet-heading.css';

function IconH1({icon, children}) {
  return (
    <h1 className='bullet-heading'>
      {
        icon ? 
        <img src={icon} alt='' aria-hidden='true' className='heading-icon'/>
        : <></>
      }
      <span>{children}</span>
    </h1>
  )
}

function IconH2({icon, children}) {
  return (
    <h2 className='bullet-heading'>
      <img src={icon} alt='' aria-hidden='true' className='heading-icon'/>
      <span>{children}</span>
    </h2>
  )
}

export { IconH1, IconH2 };