import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  Grid,
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

function Admin() {
  const {token} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(!token){
      navigate('/');
    }
  }, [token]);

  const {auth} = useAuth();

  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ my: 2 }}>
              Welcome, {auth.name}!
            </Typography>
          </Box>
          <Container maxWidth="md">
            <Card sx={{ textAlign: 'center',}}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Link to="/admin/dashboard/client">
                    <Button
                      size = "large"
                      color = "inherit"
                      fullWidth
                      sx={{height: "100px", backgroundColor: "cornflowerblue"}}
                    >Enrolled Sales Man
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={6}>
                  <Link to="/admin/dashboard/sale">
                    <Button
                      size = "large"
                      color = "inherit"
                      fullWidth
                      sx={{height: "100px", backgroundColor: "cornflowerblue"}}
                    >View Sales Report
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Admin;
