import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Grid,
  MenuItem
} from "@mui/material";

import useAdmin from "../../../hooks/useAdmin";
import useAuth from "../../../hooks/useAuth";

const orders = [
  {
    value: "Active",
    label: "Active"
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
  {
    value: "Completed",
    label: "Completed"
  }
];

const incens = [
  {
    value: "Paid",
    label: "Paid"
  },
  {
    value: "Unpaid",
    label: "Unpaid",
  },
  {
    value: "Pending",
    label: "Pending"
  }
]

const UpdateModal = (props) => {
  const { open, onClose, sale } = props;
  const { updateSale } = useAdmin();
  const { auth } = useAuth();

  const [customerName, setCustomerName] = useState(sale.customerName);
  const [companyName, setCompanyName] = useState(sale.companyName);
  const [email, setEmail] = useState(sale.email);
  const [contactNumber, setContactNumber] = useState(sale.contactNumber);
  const [GSTNumber, setGSTNumber] = useState(sale.GSTNumber);
  const [requireService, setRequireService] = useState(sale.requireService);
  const [qty, setQty] = useState(sale.qty);
  const [orderValue, setOrderValue] = useState(sale.orderValue);
  const [orderStatus, setOrderStatus] = useState(sale.orderStatus);
  const [incenValue, setIncenValue] = useState(sale.incenValue);
  const [incenStatus, setIncenStatus] = useState(sale.incenStatus);
  const [remarks, setRemarks] = useState(sale.remarks);

  useEffect(() => {
    setCompanyName(sale.companyName);
    setCustomerName(sale.customerName);
    setEmail(sale.email);
    setContactNumber(sale.contactNumber);
    setGSTNumber(sale.GSTNumber);
    setRequireService(sale.requireService);
    setQty(sale.qty);
    setOrderValue(sale.orderValue);
    setOrderStatus(sale.orderStatus);
    setIncenValue(sale.incenValue);
    setIncenStatus(sale.incenStatus);
    setRemarks(sale.remarks);
  }, [sale])

  const handleSubmit = () => {
    if (!customerName || !companyName || !email || !contactNumber) return;

    const data = {
      id: sale._id,
      customerName: customerName,
      companyName: companyName,
      email: email,
      contactNumber: contactNumber,
      GSTNumber: GSTNumber,
      requireService: requireService,
      qty: qty,
      orderValue: orderValue,
      orderStatus: orderStatus,
      incenStatus: incenStatus,
      incenValue: incenValue,
      remarks: remarks
    };
    updateSale(data).then(res => {
      if (res) {
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle display="flex" justifyContent="space-between">
        <Typography variant="body1"
          sx={{ margin: "10px" }}
          fontWeight="bold"
          fontSize="30px"
          color="text.primary"
          gutterBottom
          noWrap
        >
          Update Sales Order
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Customer Name"
                required
                value={customerName}
                error={!customerName}
                onChange={e => {
                  setCustomerName(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Company Name"
                required
                value={companyName}
                error={!companyName}
                onChange={e => {
                  setCompanyName(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Contact Number"
                required
                value={contactNumber}
                error={!contactNumber}
                onChange={e => {
                  setContactNumber(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Email"
                required
                value={email}
                error={!email}
                onChange={e => {
                  setEmail(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="OrderStatus"
                value={orderStatus}
                select
                onChange={e => {
                  setOrderStatus(e.target.value)
                }}>
                {orders.map((order) => (
                  <MenuItem key={order.value} value={order.value}>
                    {order.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Incentive Status"
                select
                value={incenStatus}
                onChange={e => {
                  setIncenStatus(e.target.value)
                }}>
                {incens.map((incen) => (
                  <MenuItem key={incen.value} value={incen.value}>
                    {incen.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Grid item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="GST Number"
                value={GSTNumber}
                onChange={e => {
                  setGSTNumber(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Require Service"
                value={requireService}
                onChange={e => {
                  setRequireService(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                type="number"
                label="Quantity"
                value={qty}
                onChange={e => {
                  setQty(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                sx={{ margin: "10px" }}
                label="Order Value"
                value={orderValue}
                onChange={e => {
                  setOrderValue(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                sx={{ margin: "10px" }}
                label="Incentive Value"
                value={incenValue}
                onChange={e => {
                  setIncenValue(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{ margin: "10px" }}
                label="Remarks"
                value={remarks}
                onChange={e => {
                  setRemarks(e.target.value)
                }} />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        <Button onClick={onClose} >Cancel</Button>
      </DialogActions>
    </Dialog >
  )
}

export default UpdateModal;