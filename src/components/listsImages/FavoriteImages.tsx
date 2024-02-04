import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, ImageList, ImageListItem, ImageListItemBar, Paper, Typography } from '@mui/material';
import DeleteButton from '../Buttons/DeleteButton';
import Pagination2 from '../Paginations/Pagination2';
import Modal from '../Modal';
import { defaultValues } from '../../slices/pageSlice';
import type { RootState } from '../../slices/store';

const { contentCount } = defaultValues;

const FavoriteImages = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const { favoriteImages } = useSelector((state: RootState) => state.images);
  const { favoritePage } = useSelector((state: RootState) => state.pages);

  const img = favoriteImages.find((item) => item.id === selectedImage);

  const lastIndex = favoritePage * contentCount;
  const firstIndex = lastIndex - contentCount;
  const currentImages = favoriteImages.slice(firstIndex, lastIndex);

  const handleImageClick = (id: string) => {
    setSelectedImage(id);
    setIsDialogOpen(true);
  };

  return (
    <Box component="section" sx={{ margin: '30px 40px' }}>
      <ImageList variant="masonry" gap={20} cols={3} sx={{ overflowY: 'visible' }}>
        {currentImages.map((item) => (
          <Paper elevation={6} key={item.id}>
            <ImageListItem sx={{ p: 1 }}>
              <Box sx={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(item.id)}>
                <img
                  src={item.url || item.file}
                  alt={item.description}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Box>
              <ImageListItemBar
                title={item.author && <Typography component="span">Автор: {item.author}</Typography>}
                subtitle={item.description && <Typography component="span">Описание: {item.description}</Typography>}
                position="below"
                sx={{ paddingTop: '6px', paddingLeft: '8px', alignItems: 'center' }}
                actionIcon={<DeleteButton item={item} />}
              />
            </ImageListItem>
          </Paper>
        ))}
      </ImageList>
      <Pagination2 favoriteImages={favoriteImages} currentImages={currentImages} />
      {img && <Modal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} img={img} />}
    </Box>
  );
};

export default FavoriteImages;
