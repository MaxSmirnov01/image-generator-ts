import React, { useState } from 'react';
import { Tooltip, IconButton, Menu, MenuItem, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import _ from 'lodash';
import type { ButtonProps } from '../../types/propsTypes';

const DownloadButton: React.FC<ButtonProps> = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const sizes = [
    { size: '640', name: 'small' },
    { size: '1920', name: 'normal' },
    { size: '2400', name: 'full' },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tooltip title="Сохранить" placement="top" arrow disableFocusListener disableTouchListener disableInteractive>
        <IconButton aria-label="download" onClick={handleClick}>
          <DownloadIcon />
        </IconButton>
      </Tooltip>
      <Menu id="download-menu" anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {sizes.map((el) => (
          <MenuItem
            key={_.uniqueId()}
            onClick={handleClose}
            component="a"
            href={`https://unsplash.com/photos/${item.id}/download?force=true&w=${el.size}`}
            download
            rel="nofollow"
          >
            {el.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default DownloadButton;
