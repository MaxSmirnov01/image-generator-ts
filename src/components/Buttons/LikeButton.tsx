import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addFavorite, removeFavorite } from '../../slices/imgSlice';
import type { ButtonProps } from '../../types/propsTypes';
import type { RootState } from '../../slices/store';

const LikeButton: React.FC<ButtonProps> = ({ item }) => {
  const { favoriteImages } = useSelector((state: RootState) => state.images);
  const [isFavorite, setIsFavorite] = useState(favoriteImages.some((el) => el.id === item.id));
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isFavorite) {
      dispatch(addFavorite(item));
    } else {
      dispatch(removeFavorite(item));
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Tooltip title="Лайк" arrow disableFocusListener disableTouchListener disableInteractive>
      <IconButton aria-label="add to favorites" color="error" onClick={handleClick}>
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
