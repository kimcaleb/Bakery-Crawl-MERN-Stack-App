import React from "react";
import { Link } from "react-router-dom";

export default() => {
    return(
        <nav className='nav'>
            <div className='float-left'>
            <span className='nav-link'>Bakery Crawl</span>
            </div>
            <div className='float-right'>      
                <span className='navtext'>
                    <Link className='nav-link hover' to='/profile'>Home</Link>
                    <Link className='nav-link hover' to='/browse'>Popular</Link>
                    <Link className='nav-link hover' to='/profile/edit'>Edit Profile</Link>
                    <Link className='nav-link hover' to='/crawls'>History</Link>
                    <Link className='nav-link hover' to='/logout'>Logout</Link>
                </span>        
            </div>
      </nav>
    )
}