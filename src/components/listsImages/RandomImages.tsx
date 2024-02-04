import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, ImageList, ImageListItem, ImageListItemBar, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { toast } from 'react-toastify';
import getData from '../../api/getData';
import Pagination1 from './../Paginations/Pagination1';
import LikeButton from './../Buttons/LikeButton';
import DownloadButton from './../Buttons/DownloadButton';
import Modal from './../Modal';
import { setFirstLoad } from '../../slices/imgSlice';
import handleError from '../../api/handleError';
import { defaultValues } from '../../slices/pageSlice';
import type { RootState, AppDispatch } from '../../slices/store';

const { contentCount } = defaultValues;

const ImageListContainer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const theme = useTheme();

  const { images, isFirstLoad, error } = useSelector((state: RootState) => state.images);
  const { page } = useSelector((state: RootState) => state.pages);

  const img = images.find((item) => item.id === selectedImage);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isFirstLoad) {
      dispatch(getData({}));
      dispatch(setFirstLoad(false));
    }
  }, [dispatch]);

  if (error && error.status) {
    const message = handleError(error);
    toast.error(message, {
      position: 'top-left',
      icon: '🆘',
      theme: theme.palette.mode === 'light' ? 'light' : 'dark',
    });
  }

  const lastIndex = page * contentCount;
  const firstIndex = lastIndex - contentCount;
  const currentImages = images.slice(firstIndex, lastIndex);

  const handleImageClick = (id: string) => {
    setSelectedImage(id);
    setIsDialogOpen(true);
  };

  return (
    <Box component="section" sx={{ margin: '0 40px 30px 40px' }}>
      <ImageList variant="masonry" gap={20} cols={3} sx={{ overflowY: 'visible' }}>
        {currentImages.map((item) => (
          <Paper elevation={6} key={item.id}>
            <ImageListItem sx={{ p: 1 }}>
              <Box sx={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(item.id)}>
                <img
                  src={item.url}
                  alt={item.description}
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Box>
              <ImageListItemBar
                title={<Typography component="span">Автор: {item.author}</Typography>}
                position="below"
                sx={{ paddingTop: '14px', paddingLeft: '8px' }}
                actionIcon={
                  <Box sx={{ display: 'flex' }}>
                    <LikeButton item={item} />
                    <DownloadButton item={item} />
                  </Box>
                }
              />
            </ImageListItem>
          </Paper>
        ))}
      </ImageList>
      <Pagination1 />
      {img && <Modal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} img={img} />}
    </Box>
  );
};

export default ImageListContainer;
