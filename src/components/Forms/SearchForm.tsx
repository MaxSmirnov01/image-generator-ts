import { useDispatch } from 'react-redux';
import { Box, Container, TextField } from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import getData from '../../api/getData';
import { addText, setFirstLoad } from '../../slices/imgSlice';
import SearchButton from '../Buttons/SearchButton';
import type { AppDispatch } from '../../slices/store';

const validationSchema = yup.object().shape({
  text: yup.string().required('Обязательно').min(2, 'Минимум 2 символа'),
});

const SearchForm = () => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: ({ text }) => {
      dispatch(addText(text));
      dispatch(setFirstLoad(true));
      dispatch(getData({ text }));
      formik.resetForm();
    },
  });

  return (
    <Box component="section" sx={{ padding: '50px 0 34px 0', borderColor: 'rgba(0, 0, 0, 0.87)' }}>
      <Container maxWidth="sm" component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          size="small"
          id="text"
          label="support ru/en"
          variant="outlined"
          type="text"
          placeholder="Например: rabbit"
          onChange={formik.handleChange}
          value={formik.values.text}
          error={!!formik.errors.text}
          helperText={formik.errors.text}
          autoFocus
          InputProps={{
            sx: { p: 0 },
            endAdornment: <SearchButton />,
          }}
        />
      </Container>
    </Box>
  );
};

export default SearchForm;
