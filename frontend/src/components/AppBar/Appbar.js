import * as React from 'react';
import { useState } from 'react';
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
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuth } from "../../store/AuthContext";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserProfile from '../Profiles/User/UserProfile'
import HomePage from '../HomePage';
import CompanyProfile from '../Profiles/Company/CompanyProfile';

import BarItems from '../AppBar/BarItems';
import WorkRequests from '../Requests/WorkRequests';

import FriendRequests from '../Requests/FriendRequests';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';


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

    //Menu
    const [anchorEl, setAnchorEl] = useState(null);
    //Request
    const [anchorReqEl, setAnchorReqEl] = useState(null);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [mobileMoreAnchorReqEl, setMobileMoreAnchorReqEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isReqOpen =  Boolean(anchorReqEl);

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleRequestMenuOpen = (event) => setAnchorReqEl(event.currentTarget);

    const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
    const handleMobileReqMenuClose = () => setMobileMoreAnchorReqEl(null);

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleReqClose = () => {
        setAnchorReqEl(null);
        handleMobileReqMenuClose();
    };
    const handleMobileMenuOpen = (event) => setMobileMoreAnchorEl(event.currentTarget);
    const handleMobileReqOpen  = (event) => setMobileMoreAnchorReqEl(event.currentTarget);

    const [refreshWorkRequests, setRefreshWorkRequests] = useState(false);
    const handleWorkRequestsUpdate = () => {
        setRefreshWorkRequests(prevRefresh => !prevRefresh);
    };
    //Profile Button Menu
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top',horizontal: 'right',}}
            id={menuId} keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right',}}
            open={isMenuOpen} onClose={handleMenuClose}>
            <Link to={`/user/${user.slug}`}>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            {user?.company?.slug && 
                <Link to={`/company/${user?.company?.slug}`}>
                    <MenuItem onClick={handleMenuClose}>{user?.company?.name}</MenuItem>
                </Link>
            }
            <MenuItem onClick={logOut}>Log Out</MenuItem>
        </Menu>
    );

    //Request modal
    const reqId = 'primary-search-account-menu';
    const renderReq = (
        <Menu
            anchorEl={anchorReqEl}
            anchorOrigin={{vertical: 'top',horizontal: 'right',}}
            id={reqId} keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right',}}
            open={isReqOpen} onClose={handleReqClose} onClick={handleWorkRequestsUpdate}>
                <Tabs defaultActiveKey="friend" id="justify-tab-example" className="mb-3" justify>
                    <Tab eventKey="friend" title="Friend Requests">
                        <FriendRequests refresh={refreshWorkRequests} />
                    </Tab>
                    {user.is_admin && 
                        <Tab eventKey="work" title="Work Requests">
                            <WorkRequests company={user?.company?.id}  refresh={refreshWorkRequests} />
                        </Tab>
                    }
                </Tabs>
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
            <MenuItem onClick={handleRequestMenuOpen}>
                <Tooltip title="Requests">
                <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                    <AddBusinessIcon />
                </IconButton>
                </Tooltip>
            </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
            <Tooltip title="Account">
            <IconButton size="large" aria-label="account of current user" aria-controls="primary-search-account-menu" aria-haspopup="true" color="inherit" >
                <AccountCircle />
            </IconButton>
            </Tooltip>
        </MenuItem>
    </Menu>
    );

    return (<>
        <BarItems user={user} menuId={menuId} mobileMenuId ={mobileMenuId } reqId={reqId}
            handleProfileMenuOpen={handleProfileMenuOpen} handleMobileMenuOpen={handleMobileMenuOpen } handleRequestMenuOpen={handleRequestMenuOpen }
        renderReq={renderReq} renderMobileMenu={renderMobileMenu} renderMenu={renderMenu}/>

        <Switch>
            <Route path="/user/:slug">    <UserProfile /></Route>
            <Route path="/company/:slug"> <CompanyProfile /></Route>
            <Route path="/"><HomePage user={user}/></Route>   
        </Switch>

    </>);
}