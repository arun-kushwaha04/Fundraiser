import React from 'react';
import {Link} from '../routes'
import { Menu } from 'semantic-ui-react';

const Header = () => {
 return (
  <Menu style={{ marginTop: '10px' }}>
    <Link route='/'>
      <Menu.Item name='Fundraiser' />
    </Link>
   <Menu.Menu position='right'>
     <Link route='/campaigns/new'>
       <a className='item'>
         <p>Campaigns</p>
       </a>
     </Link>
    <Link route='/campaigns/new'>
      <a className='item'>
        <p>+</p>
      </a>
    </Link>
   </Menu.Menu>
  </Menu>
 );
};

export default Header;
