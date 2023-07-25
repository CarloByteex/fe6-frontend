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

function AdminLogin() {
  const { adminLogin, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
      navigate('/');
    }
  }, [token]);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    adminLogin(name, password).then(res => {
      console.log(res)
      if(res){
        navigate("/admin/dashboard");
      }
    });
  }

  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ my: 2 }}>
              Welcome, Admin!
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <FormControl margin="normal" variant="outlined" fullWidth onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}>
                <TextField margin="normal" label="Name" type="text" value={name} onChange={e => setName(e.target.value)} />
                <TextField margin="normal" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </FormControl>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <Button type="submit" variant="outlined" onClick={handleSubmit}>
                  Sign In
                </Button>
                <Link to="/"><Button variant="outlined">Cancel</Button></Link>
              </Box>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default AdminLogin;
