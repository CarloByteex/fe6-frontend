import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Container,
  styled
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

  const { auth } = useAuth();
  const navigate = useNavigate();

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    switch (auth.status) {
      case "Accepted":
        navigate("/client/dashboard");
        break;
      case "Pending":
        setGreeting("Please wait until Admin accept..");
        break;
      case "Rejected":
        setGreeting("You are rejected!!!");
        break;
      case "":
        setGreeting("");
        break;
    }
  }, [auth]);

  return (
    <>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ my: 2 }}>
              {greeting}
            </Typography>
          </Box>
        </Container>
      </MainContent>
    </>
  );
}
