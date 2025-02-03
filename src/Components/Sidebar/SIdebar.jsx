import { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ProfileOutlined,
  SettingOutlined,
  SunOutlined,
  MoonOutlined,
  ProductOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Dropdown, message, theme } from 'antd';
import { useNavigate } from 'react-router';

import { Link } from 'react-router-dom';
import AppRoutes from '../../routes/AppRoutes';
import '../style.css'; // Import the CSS file
import { CategoryOutlined, DashboardOutlined, QueryStatsOutlined, WebAssetOutlined } from '@mui/icons-material';
import logo from "../.././assets/images/logo.png";
import { apiGet } from '../../api/apiMethods';
import { useUser } from '../../Context/UserContext';

const { Header, Sider, Content } = Layout;

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState('1');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const { user, setUser, logoURL } = useUser();
  console.log("file: SIdebar.jsx:34 ~ Sidebar ~ logoURL:", logoURL);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');


  const handleLogout = async () => {
    try {
      const response = await apiGet(`api/auth/logOut`);
      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        message.success(response.data.message || "You have been logged out.");
        navigate('/login');
        setUser(null)
      } else {
        message.error("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      message.error("An error occurred while logging out. Please try again.");
    }
  };

  const getUserInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  useEffect(() => {
    setUserData(user)
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode, navigate, user]);

  const userInitial = getUserInitials(userData?.firstName || '');

  const handleMenuClick = (e) => {
    setSelectedItem(e.key);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const menuItems1 = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
      onClick: () => navigate("/settings/profile"),
    },
    {
      key: 'logout',
      icon: <UserOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const dropdownMenu = (
    <Menu items={menuItems1} />
  );



  // const menuItems = user?.role === 'super-admin' ? [
  //   {
  //     key: '1',
  //     icon: <DashboardOutlined />,
  //     label: <Link to="/">Dashboard</Link>,
  //   },
  //   {
  //     key: 'sub2',
  //     icon: <WebAssetOutlined />,
  //     label: 'Websites',
  //     children: [
  //       { key: '687', label: <Link to="/websites">All Website</Link> }
  //     ],
  //   },
  //   {
  //     key: '8',
  //     icon: <CategoryOutlined />,
  //     label: 'Categories',
  //     children: [
  //       { key: '6', label: <Link to="/categories">All Categories</Link> },
  //     ],
  //   },

  //   {
  //     key: 'sub5',
  //     icon: <UserOutlined />,
  //     label: 'Users',
  //     children: [
  //       { key: '7', label: <Link to="/users">User list</Link> },
  //     ],
  //   },

  //   {
  //     key: 'sub7',
  //     icon: <ProductOutlined />,
  //     label: 'Products',
  //     children: [
  //       { key: '10', label: <Link to="/products">Products</Link> },
  //     ],
  //   },
  //   {
  //     key: 'sub89',
  //     icon: <OrderedListOutlined />,
  //     label: 'Orders',
  //     children: [
  //       { key: '1028', label: <Link to="/orders">Received Orders</Link> }
  //     ],
  //   },
  //   {
  //     key: 'sub829',
  //     icon: <QueryStatsOutlined />,
  //     label: 'Queries',
  //     children: [
  //       { key: '102', label: <Link to="/view-tickets">Received Queries</Link> }
  //     ],
  //   },

  //   {
  //     key: 'sub9',
  //     icon: <SettingOutlined />,
  //     label: 'Setting',
  //     children: [
  //       { key: '15', label: <Link to="/settings/profile">My Profile</Link> },
  //       // { key: '16', label: <Link to="/settings/changepassword">Change Password</Link> },
  //     ],
  //   },
  // ] :  [
  //   {
  //     key: '1',
  //     icon: <DashboardOutlined />,
  //     label: <Link to="/">Dashboard</Link>,
  //   },

  //   {
  //     key: 'sub5',
  //     icon: <UserOutlined />,
  //     label: 'Users',
  //     children: [
  //       { key: '7', label: <Link to="/users">User list</Link> },
  //     ],
  //   },
  //   {
  //     key: 'sub7',
  //     icon: <ProductOutlined />,
  //     label: 'Products',
  //     children: [
  //       { key: '10', label: <Link to="/products">Products</Link> },
  //     ],
  //   },
  //   {
  //     key: 'sub89',
  //     icon: <OrderedListOutlined />,
  //     label: 'Orders',
  //     children: [
  //       { key: '1028', label: <Link to="/orders">Received Orders</Link> }
  //     ],
  //   },
  //   {
  //     key: 'sub9',
  //     icon: <SettingOutlined />,
  //     label: 'Setting',
  //     children: [
  //       { key: '15', label: <Link to="/settings/profile">My Profile</Link> },
  //       // { key: '16', label: <Link to="/settings/changepassword">Change Password</Link> },
  //     ],
  //   },
  //   {
  //     key: 'sub829',
  //     icon: <QueryStatsOutlined />,
  //     label: 'Queries',
  //     children: [
  //       { key: '102', label: <Link to="/view-tickets">Received Queries</Link> }
  //     ],
  //   },
  // ];

  const commonMenuItems = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: 'sub7',
      icon: <ProductOutlined />,
      label: 'Products',
      children: [
        { key: '10', label: <Link to="/products">Products</Link> },
      ],
    },
    {
      key: 'sub89',
      icon: <OrderedListOutlined />,
      label: 'Orders',
      children: [
        { key: '1028', label: <Link to="/orders">Received Orders</Link> },
      ],
    },
    {
      key: 'sub9',
      icon: <SettingOutlined />,
      label: 'Settings',
      children: [
        { key: '15', label: <Link to="/settings/profile">My Profile</Link> },
      ],
    },
    {
      key: 'sub829',
      icon: <QueryStatsOutlined />,
      label: 'Queries',
      children: [
        { key: '102', label: <Link to="/view-tickets">Received Queries</Link> },
      ],
    },
    {
      key: 'sub6',
      icon: <UserOutlined />,
      label: 'Vendor Requests',
      children: [
        { key: '8', label: <Link to="/vendors">Vendors list</Link> },
      ],
    },
  ];

  const adminMenuItems = [
    {
      key: 'sub2',
      icon: <WebAssetOutlined />,
      label: 'Websites',
      children: [
        { key: '687', label: <Link to="/websites">All Websites</Link> },
      ],
    },
    {
      key: '8',
      icon: <CategoryOutlined />,
      label: 'Categories',
      children: [
        { key: '6', label: <Link to="/categories">All Categories</Link> },
      ],
    },
    {
      key: 'sub5',
      icon: <UserOutlined />,
      label: 'Users',
      children: [
        { key: '7', label: <Link to="/users">User list</Link> },
      ],
    },
  ];

  const menuItems =
    user?.role === 'super-admin'
      ? [...commonMenuItems, ...adminMenuItems]
      : commonMenuItems;


  return (
    <>
      <Layout style={{ height: '100vh', background: 'transparent', overflowX: 'hidden', position: 'sticky', overflowY: 'hidden !important' }}>

        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ height: '100vh', background: 'var(--sidebar-bg)' }}
          className="sider"
        >
          <div className="fixed-logo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={logoURL}
              alt="logo"
              style={{ width: collapsed ? '60px' : '150px', marginTop: '15%' }}
            />
          </div>

          <div className="menu-container" style={{ height: '75vh', overflowY: 'auto', background: 'var(--sidebar-bg)' }}>
            <Menu
              theme={isDarkMode ? 'dark' : 'light'}
              mode="inline"
              selectedKeys={[selectedItem]}
              onClick={handleMenuClick}
              items={menuItems}
            />
          </div>
        </Sider>

        <Layout>
          <Header
            style={{
              padding: '0 24px',
              background: 'var(--header-bg)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: 'var(--text-color)',
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64, color: 'var(--text-color)' }}
            />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p
                style={{
                  textTransform: "uppercase",
                  marginRight: "16px", // Adjust margin as needed
                  fontWeight: "500",
                  color: "#555", // Optional: Change text color
                  fontSize: "14px", // Optional: Adjust font size
                }}
              >
                {userData?.role}
              </p>
              <Dropdown menu={{ items: menuItems1 }} trigger={['click']}>
                {userData && userData?.profileImage ? (
                  <img src={userData?.profileImage} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                ) : (
                  <Avatar size="large" style={{ backgroundColor: '#87d068' }}>{userInitial}</Avatar>
                )}
              </Dropdown>
              <Button
                type="text"
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                onClick={toggleTheme}
                style={{ fontSize: '16px', marginLeft: '20px', color: 'var(--text-color)' }}
              />
            </div>
          </Header>
          <Content
            style={{
              margin: '14px 20px 24px 16px',
              padding: '14px 24px 24px 24px',
              minHeight: '87vh',
              background: 'var(--bg-color)',
              borderRadius: borderRadiusLG,
              overflowY: 'auto',
            }}
          >
            <AppRoutes />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Sidebar;
