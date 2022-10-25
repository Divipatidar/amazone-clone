import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from 'firebase';
import firebase from 'firebase';
function Header(){
    const [{basket,user}, dispatch] = useStateValue();
    const handleAuthentication =() =>{
        if (user) {
            firebase.auth().signOut();
          }
    }

     return(
        <div className="header"> 
            <Link to='/'>
               <img className='header_logo'
               src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" 
               />
            </Link>
            
            <div className="header_search"> 
             <input className="hearder_searchInput" type="text"/>
             <SearchIcon className="header_searchIcon"/> 
            </div>

            <div className="header_nav">
                <Link to={!user && '/login'}>
                <div onClick={handleAuthentication} className="header_option">
                    <span className='header_optionline1'>Hello {!user ? 'Guest': user.email}</span>
                    <span className='header_optionline2'>{user ? 'Sign Out' : 'Sign In'}</span>
                </div>
                </Link>
                <div className="header_option">
                    <span className='header_optionline1'>Returns</span>
                    <span className='header_optionline2'>& Orders</span>
                </div>
                <div className="header_option">
                    <span className='header_optionline1'>Your</span>
                    <span className='header_optionline2'>Prime</span>
                </div>
                <Link to="/checkout">
                <div className="header_optionbasket">
                     <ShoppingBasketIcon />
                      <span className='header_optionline2 header_basketcount'>{basket?.length}</span>
                </div>
                </Link>
                

            </div>
        </div>
     );
    
} 
export default Header;   
      