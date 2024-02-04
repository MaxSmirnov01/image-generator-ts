import { Box, Button, CardMedia } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import notFound from '../../assets/notFound.png';
import routes from '../../router/paths';

const NotFound = () => (
  <Box sx={{ marginTop: '30px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CardMedia
        component="img"
        src={notFound}
        alt="Not Found"
        sx={{ width: '382px', maxWidth: '100%', height: 'auto' }}
      />
    </Box>
    <Box sx={{ textAlign: 'center', paddingTop: '10px' }}>
      <Button href={routes.mainPath()} variant="outlined" startIcon={<ArrowBackIcon />} sx={{ fontWeight: 'bold' }}>
        На главную
      </Button>
    </Box>
  </Box>
);

export default NotFound;
