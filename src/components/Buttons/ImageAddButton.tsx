import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const ImageAddButton = () => (
  <Button type="submit" aria-label="addImage" variant="outlined" startIcon={<AddIcon />} sx={{ marginTop: '5px' }}>
    Добавить
  </Button>
);

export default ImageAddButton;
