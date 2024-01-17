import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { TimerOutlined, AutoGraphOutlined } from '@mui/icons-material';

function SideBar() {
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();

  return (
    <Sidebar style={{ height: '100vh' }} defaultCollapsed>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
            '&:hover': {
              backgroundColor: '#265a88',
              color: '#ffffff',
            },
          },
        }}
      >
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
          }}
          style={{ textAlign: 'center' }}
        >
          <h2>Admin</h2>
        </MenuItem>
        <MenuItem
          icon={<TimerOutlined />}
          component={<Link to="/" />}
          className={location.pathname === '/' ? 'active' : ''}
        >
          Timer
        </MenuItem>
        <MenuItem
          icon={<AutoGraphOutlined />}
          component={<Link to="/timegraph" />}
          className={location.pathname === '/timegraph' ? 'active' : ''}
        >
          Graph View
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}

export default SideBar;
