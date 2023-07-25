import { FC, useEffect, useState } from 'react';
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  MenuItem,
  TextField,
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
import ViewModal from './ViewModal';
import UpdateModal from './UpdateModal';

const SaleTable = () => {
  const { getSaleList, saleList, getClientList, clientList, getSearch } = useAdmin();
  const { auth } = useAuth();

  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [sale, setSale] = useState({});
  const [clients, setClients] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchClient, setSearchClient] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  useEffect(() => {
    getSaleList();
    getClientList();
  }, [auth]);

  let temp = [];

  useEffect(() => {
    temp.push({value: "", label: "All"});
    clientList.forEach((item) => {
      temp.push({
        value: item._id,
        label: item.name
      })
    })
    setClients(temp);
  }, [clientList]);

  useEffect(() => {
    if (saleList) {
      let tempValue = 0;
      saleList.forEach(sale => {
        tempValue += sale.orderValue;
      });
      setTotal(tempValue);
    }
  }, [saleList])

  const handleEdit = (sale) => {
    setSale(sale);
    setEditOpen(true);
  }

  const handleView = (sale) => {
    setSale(sale);
    setViewOpen(true);
  }

  const handleSearch = () => {
    const data = {
      searchClient : searchClient,
      searchCompany: searchCompany
    }
    getSearch(data);
  }

  return (
    <Box sx={{ paddingLeft: "80px", paddingRight: "80px", paddingTop: "30px" }}>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={2}>
          <Typography variant="h4" component="h4" gutterBottom>
            Sales Report
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Select Client"
            select
            onChange={e => {
              setSearchClient(e.target.value)
            }}>
            {clients.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={{ margin: "10px" }}
            label="Company Name"
            value={searchCompany}
            onChange={e => {
              setSearchCompany(e.target.value)
            }} />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={()=>handleSearch()}>Search</Button>
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={2}>
          <Typography variant="h5" component="h5" gutterBottom>
            Total Sales Value - {total}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>SI</TableCell>
              <TableCell align='center'>Order</TableCell>
              <TableCell align='center'>Company Name</TableCell>
              <TableCell align='center'>Total Sales Value</TableCell>
              <TableCell align="center">Orders Status</TableCell>
              <TableCell align="center">Incentive Value</TableCell>
              <TableCell align="center">Incentive Status</TableCell>
              <TableCell align="center">Admin Remarks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saleList && saleList.map((sale, index) => {
              let orderColor = "";
              let incenColor = "";
              switch (sale.orderStatus) {
                case "Active":
                  orderColor = "blue";
                  break;
                case "Inactive":
                  orderColor = "red";
                  break;
                case "Completed":
                  orderColor = "green";
              }
              switch (sale.incenStatus) {
                case "Pending":
                  incenColor = "blue";
                  break;
                case "Unpaid":
                  incenColor = "red";
                  break;
                case "Paid":
                  incenColor = "green"
              }
              return (
                <TableRow
                  hover
                  key={sale._id}
                >
                  <TableCell align='center'>{index + 1}</TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {sale.GSTNumber}
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
                      {sale.companyName}
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
                      {sale.orderValue}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ color: orderColor }}
                      gutterBottom
                      noWrap
                    >
                      {sale.orderStatus}
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
                      {sale.incenValue}
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color={incenColor}
                      gutterBottom
                      noWrap
                    >
                      {sale.incenStatus}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Sales Order" arrow>
                      <Button onClick={() => { handleEdit(sale) }}>Edit</Button>
                    </Tooltip>
                    <Tooltip title="View Sales Order" arrow>
                      <Button onClick={() => { handleView(sale) }}>View</Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        sale={sale}
      />
      <UpdateModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        sale={sale}
      />
    </Box>
  );
};

export default SaleTable;
