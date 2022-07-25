import React from 'react';
import { Menu } from 'semantic-ui-react';

const Header = () => {
 return (
  <Menu style={{ marginTop: '10px' }}>
   <Menu.Item name='Fundraiser' />
   <Menu.Menu position='right'>
    <a className='item'>Campaigns</a>
    <a className='item'>+</a>
   </Menu.Menu>
  </Menu>
 );
};

export default Header;
