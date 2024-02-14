import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const BarItems = ({ user, menuId, reqId, mobileMenuId, handleProfileMenuOpen, handleMobileMenuOpen, handleRequestMenuOpen , renderReq, renderMobileMenu, renderMenu}) => {
    return(
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
                        {
                            user.is_admin &&
                            <IconButton size="large" edge="end" aria-label="account of current user" aria-controls={reqId} aria-haspopup="true" onClick={handleRequestMenuOpen} color="inherit">
                                <AddBusinessIcon />
                            </IconButton>
                        }
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
                {renderReq}

                {renderMobileMenu}
                {renderMenu}
        </Box>
    )
}

export default BarItems;