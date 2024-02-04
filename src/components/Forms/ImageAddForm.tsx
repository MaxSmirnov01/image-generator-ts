import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Container,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import * as yup from 'yup';
import { useFormik } from 'formik';
import _ from 'lodash';
import { addFavorite } from '../../slices/imgSlice';
import ImageAddButton from '../Buttons/ImageAddButton';

const ImageAddForm = () => {
  const dispatch = useDispatch();
  const [checkedDescription, setCheckedDescription] = useState(false);
  const [checkedAuthor, setCheckedAuthor] = useState(false);
  const [fileName, setFileName] = useState('');

  const validationSchema = yup.object().shape({
    url: !fileName ? yup.string().url('Некорректный URL').required('Обязательно') : yup.string().notRequired(),
    description: checkedDescription
      ? yup.string().required('Обязательно').min(5, 'Минимум 5 символов')
      : yup.string().notRequired(),
    author: checkedAuthor
      ? yup.string().required('Обязательно').min(3, 'Минимум 3 символа')
      : yup.string().notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      url: '',
      description: '',
      author: '',
      file: '',
    },
    validationSchema,
    onSubmit: ({ url, description, author, file }) => {
      const id = _.uniqueId();
      dispatch(addFavorite({ id, url, modalUrl: url, description, author, file }));
      formik.resetForm({
        values: {
          ...formik.initialValues,
          file: formik.values.file,
        },
      });
    },
  });

  const handleChangeDescription = () => {
    setCheckedDescription(!checkedDescription);
  };

  const handleChangeAuthor = () => {
    setCheckedAuthor(!checkedAuthor);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files !== null) {
      const file = event.currentTarget.files[0];
      await setFileName(file ? file.name : '');
      const fileUrl = file ? URL.createObjectURL(file) : null;

      formik.setFieldValue('file', fileUrl);
    }
  };

  return (
    <Box component="section" sx={{ my: '40px' }}>
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', padding: '20px' }}
        >
          <Typography variant="h6" component="div" sx={{ paddingBottom: '10px' }}>
            Добавить изображение по ссылке:
          </Typography>
          <TextField
            fullWidth
            size="small"
            id="url"
            label="Ссылка на изображение"
            variant="outlined"
            type="url"
            placeholder="https://oir.mobi/uploads/posts/2021-06/1623921063_15-oir_mobi-p-priroda-vertikalnie-priroda-krasivo-foto-15.jpg"
            onChange={formik.handleChange}
            value={formik.values.url}
            error={!!formik.errors.url}
            helperText={formik.errors.url}
            autoFocus
          />
          <Typography variant="h6" component="div" sx={{ paddingTop: '10px' }}>
            Или:
          </Typography>
          <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ marginTop: '10px' }}>
            Загрузить изображение
            <TextField
              type="file"
              onChange={handleFileChange}
              sx={{
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(50%)',
                height: 1,
                overflow: 'hidden',
                position: 'absolute',
                bottom: 0,
                left: 0,
                whiteSpace: 'nowrap',
                width: 1,
              }}
            />
          </Button>
          {fileName && (
            <div>
              <strong>Выбранный файл:</strong> {fileName}
            </div>
          )}

          <FormGroup>
            <FormControlLabel control={<Checkbox size="small" />} label="Автор" onChange={handleChangeAuthor} />
            {checkedAuthor && (
              <TextField
                id="author"
                label="Введите имя"
                multiline
                value={formik.values.author}
                onChange={formik.handleChange}
                error={!!formik.errors.author}
                helperText={formik.errors.author}
                autoFocus
              />
            )}
            <FormControlLabel control={<Checkbox size="small" />} label="Описание" onChange={handleChangeDescription} />
            {checkedDescription && (
              <TextField
                id="description"
                label="Введите текст"
                multiline
                value={formik.values.description}
                onChange={formik.handleChange}
                error={!!formik.errors.description}
                helperText={formik.errors.description}
                autoFocus
              />
            )}
          </FormGroup>
          <ImageAddButton />
        </Paper>
      </Container>
    </Box>
  );
};

export default ImageAddForm;
