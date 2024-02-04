import { IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchButton = () => (
  <Tooltip title="Поиск" arrow disableFocusListener disableTouchListener disableInteractive>
    <IconButton type="submit" aria-label="search">
      <SearchIcon />
    </IconButton>
  </Tooltip>
);

export default SearchButton;
