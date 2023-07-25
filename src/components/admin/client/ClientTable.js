import { FC, useEffect, useState } from 'react';
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Button,
  Grid,
  Box
} from '@mui/material';
import useAdmin from '../../../hooks/useAdmin';
import useAuth from '../../../hooks/useAuth';

const BASE_URL = "http://localhost:8000/download/";

const ClientTable = () => {
  const { getClientList, clientList, updateClient } = useAdmin();
  const { auth } = useAuth();

  useEffect(() => {
    getClientList();
  }, [auth]);

  const handleAccept = (id) => {
    const data = {
      id: id,
      status: "Accepted"
    };
    updateClient(data);
  }

  const handleReject = (id) => {
    const data = {
      id: id,
      status: "Rejected"
    };
    updateClient(data);
  }

  return (
    <Box sx={{ paddingLeft: "80px", paddingRight: "80px", paddingTop: "30px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" component="h4" gutterBottom>
            Clients Report
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Customer Name</TableCell>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>Phone</TableCell>
              <TableCell align='center'>Place</TableCell>
              <TableCell align="center">Documents</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientList && clientList.map((client, index) => {
              let clientColor = "";
              switch (client.status) {
                case "Pending":
                  clientColor = "blue";
                  break;
                case "Rejected":
                  clientColor = "red";
                  break;
                case "Accepted":
                  clientColor = "green";
              }
              return (
                <TableRow
                  hover
                  key={client._id}
                >
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {client.name}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {client.email}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {client.phone}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {client.place}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                      <a href={BASE_URL+client.cv}>Cv.pdf</a>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                    </Typography>
                  </TableCell>
                  {client.status === "Pending" && (<TableCell align="center">
                    <Tooltip title="Accept this client" arrow>
                      <button style={{backgroundColor: "cornflowerblue", borderRadius: "30%", border:"none", width: "100px", height: "30px", cursor: "pointer"}} onClick={() => { handleAccept(client._id) }}>Accept</button>
                    </Tooltip>
                    <Tooltip title="Reject this client" arrow>
                      <button style={{backgroundColor: "coral", borderRadius: "30%", border:"none", width: "100px", height: "30px", cursor: "pointer"}} onClick={() => { handleReject(client._id) }}>Reject</button>
                    </Tooltip>
                  </TableCell>)}
                  {client.status === "Accepted" && (<TableCell align="center">
                    <Tooltip title="This client is accepted" arrow>
                      <button style={{backgroundColor: "green", borderRadius: "30%", border:"none", width: "100px", height: "30px"}}>Accepted</button>
                    </Tooltip>
                  </TableCell>)}
                  {client.status === "Rejected" && (<TableCell align="center">
                    <Tooltip title="This client is rejected" arrow>
                      <button style={{backgroundColor: "red", borderRadius: "30%", border:"none", width: "100px", height: "30px"}}>Rejected</button>
                    </Tooltip>
                  </TableCell>)}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientTable;
