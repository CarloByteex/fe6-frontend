import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  Checkbox,
  Divider,
  Stack,
  Button,
  FormControl,
  styled,
  TextField,
} from '@mui/material';

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

export default function Home() {

  const { auth, register, login, logout, token } = useAuth();
  const navigate = useNavigate();

  const emailVal = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
  const phoneVal = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$");

  const [name, setName] = useState("");
  const [inEmail, setInEmail] = useState("");
  const [valInEmail, setValInEmail] = useState(false);
  const [valUpEmail, setValUpEmail] = useState(false);
  const [upEmail, setUpEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [valPhone, setValPhone] = useState(false);
  const [place, setPlace] = useState("");
  const [cv, setCv] = useState("");
  const [certification, setCertification] = useState("");
  const [inPassword, setInPassword] = useState("");
  const [upPassword, setUpPassword] = useState("");
  const [passwordCount, setPasswordCount] = useState(0);

  useEffect(() => {
    if (auth.isAdmin) {
      toast("Action Success");
      navigate("/admin/dashboard");
    } else {
      if (auth.status === "Accepted") {
        navigate("/client/dashboard");
        toast("Action Success");
      } else if (auth.status === "Pending") {
        toast("Please wait for acceptance");
      } else if (auth.status === "Rejected") {
        toast("You are rejected!");
        logout();
      }
    }
  }, [auth]);

  console.log(auth)

  const handleUpEmail = (value) => {
    console.log(value)
    setUpEmail(value)
    setValUpEmail(emailVal.test(value));
  }

  const handleInEmail = (value) => {
    console.log(value)
    setInEmail(value)
    setValInEmail(emailVal.test(value));
  }

  const handlePhone = (value) => {
    console.log(value);
    setPhone(value);
    setValPhone(phoneVal.test(value));
  }

  const handleRegisterSubmit = () => {
    if (!valUpEmail || !valPhone || !name || !place || !upPassword || !cv || !certification) {
      toast("Fill information correctly!");
      return;
    }
    console.log(cv)
    console.log(certification)
    const formData = new FormData();
    formData.append("email", upEmail);
    formData.append("password", upPassword);
    formData.append("phone", phone);
    formData.append("place", place);
    formData.append("name", name);
    formData.append('isAdmin', false);
    formData.append("files", cv);
    formData.append("files", certification);
    register(formData).then(res => {
      toast(res);
    });
  }

  const handleLoginSubmit = () => {
    if (!valInEmail || !inPassword) {
      toast("Fill information correctly!");
      return;
    }
    login(inEmail, inPassword).then(res => {
      if (res === "Incorrect password!") {
        if (passwordCount === 2) {
          setPasswordCount(3);
          toast("You entered wrong password for 3 times. Please try again 30 seconds later.");
          setTimeout(() => {
            setPasswordCount(0);
          }, 30000)
        } else {
          setPasswordCount(passwordCount + 1);
          toast(res);
        }
      } else if (res !== "Action Success!") {
        toast(res);
      }
    });
  }

  return (
    <>
      <MainContent>
        <Grid container spacing={2}>
          <Grid item xs={2}></Grid>
          <Grid item xs={4}>
            <Box>
              <Typography variant="h4" sx={{ my: 2 }}>
                SignUp
              </Typography>
              <Typography variant="h3" sx={{ my: 2 }}>
                Welcome!
              </Typography>
            </Box>
            <Container maxWidth="sm">
              <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                <FormControl margin="normal" variant="outlined" fullWidth onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRegisterSubmit();
                }}>
                  <TextField margin="normal" required label="Name" error={!name} value={name} onChange={e => setName(e.target.value)} />
                  <TextField margin="normal" required label="Email" error={!valUpEmail} type="email" pattern=".+@globex\.com" value={upEmail} onChange={e => handleUpEmail(e.target.value)} />
                  <TextField margin="normal" required label="Phone" error={!valPhone} type="text" value={phone} onChange={e => handlePhone(e.target.value)} />
                  <TextField margin="normal" required label="Place" type="text" error={!place} value={place} onChange={e => setPlace(e.target.value)} />
                  <TextField margin="normal" required label="Password" error={!upPassword} type="password" value={upPassword} onChange={e => setUpPassword(e.target.value)} />
                  <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px", marginBottom: "20px" }}>

                    <Stack direction="row" alignItems="center">
                      <Button variant="contained" color={cv? "primary": "error"} component="label">
                        Upload CV
                        <input
                          hidden
                          type="file"
                          onChange={(e) => {
                            setCv(e.target.files[0])
                          }}
                        />
                      </Button>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                      <Button variant="contained" color={certification? "primary": "error"} component="label">
                        upload ID
                        <input
                          hidden
                          type="file"
                          onChange={(e) => {
                            setCertification(e.target.files[0])
                          }}
                        />
                      </Button>
                    </Stack>
                  </div>
                </FormControl>
                <Button type="submit" variant="contained" onClick={handleRegisterSubmit}>
                  Sign Up
                </Button>
              </Card>
            </Container>
          </Grid>
          <Grid item xs={4}>
            <Container maxWidth="md">
              <Box>
                <Typography variant="h4" sx={{ my: 2 }}>
                  SignIn
                </Typography>
                <Typography variant="h3" sx={{ my: 2 }}>
                  Hey, Hello!
                </Typography>
              </Box>
              <Container maxWidth="sm">
                <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                  <FormControl margin="normal" variant="outlined" fullWidth onKeyDown={(e) => {
                    if (e.key === 'Enter') handleLoginSubmit();
                  }}>
                    <TextField required margin="normal" label="Email" error={!valInEmail} type="email" value={inEmail} onChange={e => handleInEmail(e.target.value)} />
                    <TextField required margin="normal" label="Password" error={!inPassword} type="password" value={inPassword} onChange={e => setInPassword(e.target.value)} />
                  </FormControl>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                    <a href="#">Forgot password?</a>
                    {passwordCount === 3 && <Button type="submit" disabled variant="contained" onClick={handleLoginSubmit}>
                      Sign In
                    </Button>}
                    {passwordCount !== 3 && <Button type="submit" variant="contained" onClick={handleLoginSubmit}>
                      Sign In
                    </Button>}
                  </Box>
                </Card>
              </Container>
            </Container>
          </Grid>
        </Grid>
        <ToastContainer />
      </MainContent>
    </>
  );
}
