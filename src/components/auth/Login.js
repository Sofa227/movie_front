import { useState } from 'react';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/v1/users/login', { username, password });
      console.log(response.data);

      setIsAuthenticated(true);
      localStorage.setItem('username', username);

      navigate('/');
    } catch (error) {
      setError(error.response?.data || 'Ошибка входа. Проверьте введенные данные.');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: 100 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
        Вход
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '& input': { color: 'white' }
            }
          }}
          label="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '& input': { color: 'white' }
            }
          }}
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && (
          <Typography color="error" sx={{ marginTop: 2, fontWeight: 'bold' }}>
            {error}
          </Typography>
        )}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button type="submit" variant="contained" style={{ background: 'gold', fontWeight: 'bold' }}>
            Войти
          </Button>
          <Button variant="outlined" onClick={handleBack} style={{ color: 'white', borderColor: 'gold' }}>
            Назад
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
