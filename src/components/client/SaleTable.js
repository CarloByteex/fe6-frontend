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
import useClient from '../../hooks/useClient';
import useAuth from '../../hooks/useAuth';
import CreateModal from './CreateModal';
import ViewModal from './ViewModal';
import UpdateModal from './UpdateModal';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

let total = 0;

const SaleTable = () => {
  const { getSaleList, updateSale, addSale, saleList } = useClient();
  const { auth } = useAuth();

  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [sale, setSale] = useState({});

  useEffect(() => {
    getSaleList(auth.id);
  }, [auth]);

  useEffect(() => {
    if (saleList) {
      total = 0;
      saleList.forEach(sale => {
        total += sale.incenValue;
      });
    }
  }, [saleList])

  const handleEdit = () => {
    setViewOpen(false);
    setEditOpen(true);
  }

  const handleView = (sale) => {
    setSale(sale);
    setViewOpen(true);
  }

  return (
    <Box sx={{ paddingLeft: "80px", paddingRight: "80px", paddingTop: "30px" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4" component="h4" gutterBottom>
            Sales Orders View
          </Typography>
        </Grid>
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => setCreateOpen(true)}
          >
            Create New Sales Order
          </Button>
        </Grid>
        <Grid item>
          <Typography variant="h5" component="h5" gutterBottom>
            Total Incentive Received - {total}
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
              <TableCell align='center'>Customer Name</TableCell>
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
                      {sale.customerName}
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
                    <Tooltip title={sale.remarks} arrow>
                      <Button>Remarks</Button>
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
      <CreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        sale={sale}
        handleEdit={() => handleEdit()}
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
