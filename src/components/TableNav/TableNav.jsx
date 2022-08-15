import { Link } from 'react-router-dom';

function TableNav() {
    return(
        <ul className='statsNav'>
            <li><a><Link to="/user" className='statsLink'>Your Stats</Link></a></li>
            <li><a><Link to="/team" className='statsLink'>Team Stats</Link></a></li>
            <li><a><Link to="/program" className='statsLink'>Program Stats</Link></a></li>
        </ul>
    )
}

export default TableNav;