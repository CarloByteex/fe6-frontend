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
  Stack
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

function ClientRegister() {
  const { clientRegister, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [place, setPlace] = useState("");
  const [cv, setCv] = useState("");
  const [certification, setCertification] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(cv)
    console.log(certification)
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("place", place);
    formData.append("name", name);
    formData.append("files", cv);
    formData.append("files", certification);
    clientRegister(formData).then(res => {
      if (res) {
        navigate('/');
      }
    });
  }

  return (
    <>
      <MainContent sx={{ display: "flex" }}>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ my: 2 }}>
              Welcome!
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              <FormControl margin="normal" variant="outlined" fullWidth onKeyDown={(e) => {
                if (e.key === 'Enter') handleSubmit();
              }}>
                <TextField margin="normal" required label="Name" value={name} onChange={e => setName(e.target.value)} />
                <TextField margin="normal" required label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <TextField margin="normal" required label="Phone" type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                <TextField margin="normal" required label="Place" type="text" value={place} onChange={e => setPlace(e.target.value)} />
                <TextField
                  fullWidth
                  variant="filled"
                  margin="normal"
                  required
                  type="file"
                  label="Upload CV"
                  name="cv"
                  onChange={(e) => {
                    setCv(e.target.files[0])
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Button variant="contained" component="label">
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Stack>
                <TextField
                  fullWidth
                  variant="filled"
                  margin="normal"
                  required
                  type="file"
                  label="Upload ID Certification"
                  name="id"
                  onChange={(e) => {
                    setCertification(e.target.files[0])
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField margin="normal" required label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </FormControl>
              <Button type="submit" variant="outlined" onClick={handleSubmit}>
                Sign Up
              </Button>
              <Link to="/"><Button sx={{ marginLeft: "50px" }} variant="outlined">Cancel</Button></Link>
              <Divider sx={{ m: 2 }} />
              Already have an account? <Link to="/client/login">Sign In</Link>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default ClientRegister;
