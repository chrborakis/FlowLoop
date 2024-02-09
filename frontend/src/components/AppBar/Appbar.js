import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';

import { useAuth } from "../../store/AuthContext";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserProfile from '../User/UserProfile';
import HomePage from '../HomePage';
import CompanyProfile from '../Company/CompanyProfile';

const Search = styled('div')(({ theme }) => ({ 
    position: 'relative', 
    borderRadius: theme.shape.borderRadius, 
    backgroundColor: alpha(theme.palette.common.white, 0.15), 
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    }, 
    marginRight: theme.spacing(2), 
    marginLeft: 0,  
    width: '100%', 
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({ 
    padding: theme.spacing(0, 2), 
    height: '100%', 
    position: 'absolute', 
    pointerEvents: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'), width: '100%',
        [theme.breakpoints.up('md')]: {width: '20ch',},
    },
}));

export default function PrimarySearchAppBar({user, messages, notifications}) {
    const { logout } = useAuth();
    const history = useHistory();

    const notifications_label = `show ${notifications} new notifications`
    const messages_label = `show ${messages} new messages`

    const logOut = () => {
        logout()
        history.push('/')
        window.location.reload();
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);;


    //Profile Button Menu
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top',horizontal: 'right',}}
            id={menuId} keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right',}}
            open={isMenuOpen}onClose={handleMenuClose}>
            <Link to={`/user/${user.slug}`}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            {user?.company?.slug && 
                <Link to={`/company/${user.company.slug}`}>
                    <MenuItem onClick={handleMenuClose}>{user?.company?.name}</MenuItem>
                </Link>
            }
            <MenuItem onClick={logOut}>Log Out</MenuItem>
        </Menu>
    );

    

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
    <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{vertical: 'top',horizontal: 'right',}}
        id={mobileMenuId} keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right', }}
        open={isMobileMenuOpen} onClose={handleMobileMenuClose}
    >
        <MenuItem>
            <IconButton size="large" aria-label="messages_label" color="inherit">
                <Badge badgeContent={messages} color="error">
                    <MailIcon />
                </Badge>
            </IconButton>
            <p>Messages</p>
        </MenuItem>
        <MenuItem>
            <IconButton size="large" aria-label={notifications_label} color="inherit">
                <Badge badgeContent={notifications} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                <AccountCircle />
            </IconButton>
                <p>Profile</p>
        </MenuItem>
    </Menu>
    );

    return (
        <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static"  style={{ backgroundColor: 'rgb(61, 1, 72)' }}>
                <Toolbar>

                    {/* Drawer */}
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <div>
                            <img src={user.image ? user.image : "/files/user_image/dummy-user.png"} width={60}/>
                            {user.name}
                        </div>
                    </Typography>

                    {/* Search */}
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }}/>
                    </Search> */}

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to="/">
                            <IconButton size="large" aria-label="home" color="inherit">
                                <Badge color="error">
                                    <HomeIcon sx={{ color: 'white' }} />
                                </Badge>
                            </IconButton>
                        </Link>
                        {/* <IconButton size="large" aria-label={messages_label} color="inherit">
                            <Badge badgeContent={messages} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton size="large" aria-label={notifications_label} color="inherit">
                            <Badge badgeContent={notifications} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton> */}
                        <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={menuId} aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="show more" aria-controls={mobileMenuId} aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>

        <Switch>
            <Route path="/user/:slug">    <UserProfile /></Route>
            <Route path="/company/:slug"> <CompanyProfile /></Route>
            <Route path="/"><HomePage user={user}/></Route>   
        </Switch>

        </>
  );
}