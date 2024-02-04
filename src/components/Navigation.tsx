import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, MenuItem, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import _ from 'lodash';
import routes from '../router/paths';
import ThemeButton from './Buttons/ThemeButton';

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pages = [
    { id: _.uniqueId(), label: 'Поиск', icon: <SearchIcon />, route: routes.mainPath() },
    {
      id: _.uniqueId(),
      label: 'Избранное',
      icon: pathname !== '/favorites' ? <FavoriteBorderIcon /> : <FavoriteIcon />,
      route: routes.favoritesPath(),
    },
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar
      position="static"
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 15px 15px 31px',
      }}
    >
      <Typography variant="h4" component="div">
        Image Generator
      </Typography>
      <Box sx={{ display: 'flex' }}>
        {pages.map((page) => (
          <MenuItem key={page.id} onClick={() => handleClick(page.route)} sx={{ borderRadius: '5px' }}>
            {page.icon}
          </MenuItem>
        ))}
        <ThemeButton />
      </Box>
    </AppBar>
  );
};

export default Navigation;
