import React from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFavorite } from '../../slices/imgSlice';
import type { ButtonProps } from '../../types/propsTypes';

const DeleteButton: React.FC<ButtonProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeFavorite(item));
  };

  return (
    <Tooltip title="Удалить" arrow disableFocusListener disableTouchListener disableInteractive>
      <IconButton aria-label="delete" onClick={handleClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;
