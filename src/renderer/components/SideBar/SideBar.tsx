import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { TimerOutlined, AutoGraphOutlined } from '@mui/icons-material';
import './SideBar.css';

function SideBar() {
  const { collapseSidebar } = useProSidebar();
  const location = useLocation();

  return (
    <Sidebar
      className="SideBarComponent"
      defaultCollapsed
      backgroundColor="#07070a"
    >
      <Menu
        menuItemStyles={{
          root: {
            backgroundColor: '#07070A',
          },
          button: {
            backgroundColor: '#07070A',
            [`&.active`]: {
              backgroundColor: '#4A525A',
              color: '#ffffff',
            },
            '&:hover': {
              backgroundColor: '#4A525A',
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
        />
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
