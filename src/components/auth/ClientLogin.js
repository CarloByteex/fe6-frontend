import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  styled,
  TextField,
} from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function ClientLogin() {
  const { clientLogin, token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    clientLogin(email, password).then(res =>{
      if(res){
        navigate('/')
      }
    });
  }

  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ my: 2 }}>
              Welcome, My Client!
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <FormControl margin="normal" variant="outlined" fullWidth onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}>
                <TextField margin="normal" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField margin="normal" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button type="submit" variant="outlined" onClick={handleSubmit}>
                  Sign In
                </Button>
                <Link to="/"><Button variant="outlined">Cancel</Button></Link>
              </Box>
              <Divider sx={{ m: 2 }} />
              Don't have an account? <Link to="/client/register">Sign Up</Link>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default ClientLogin;
