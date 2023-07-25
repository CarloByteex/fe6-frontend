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
} from "@mui/material";

import useClient from "../../hooks/useClient";
import useAuth from "../../hooks/useAuth";

const CreateModal = (props) => {
  const { open, onClose } = props;
  const { addSale } = useClient();
  const { auth } = useAuth();

  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [GSTNumber, setGSTNumber] = useState("");
  const [requireService, setRequireService] = useState("");
  const [qty, setQty] = useState(0);
  const [orderValue, setOrderValue] = useState(0);

  const handleSubmit = () => {
    if (!customerName || !companyName || !email || !contactNumber) return;

    const data = { 
      clientId: auth.id,
      customerName: customerName,
      companyName: companyName,
      email: email,
      contactNumber: contactNumber,
      GSTNumber: GSTNumber,
      requireService: requireService,
      qty: qty,
      orderValue: orderValue
    };
    addSale(data).then(res => {
      if(res){
        setCompanyName("");
        setCustomerName("");
        setEmail("");
        setContactNumber("");
        setGSTNumber("");
        setRequireService("");
        setQty(0);
        setOrderValue(0);
        onClose();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle display="flex" justifyContent="space-between">
        <Typography variant="body1"
          fontWeight="bold"
          fontSize="30px"
          color="text.primary"
          gutterBottom
          noWrap
        >
          Create Sales Order
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{margin: "10px"}}
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
                sx={{margin: "10px"}}
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
                sx={{margin: "10px"}}
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
                sx={{margin: "10px"}}
                label="Email"
                required
                value={email}
                error={!email}
                onChange={e => {
                  setEmail(e.target.value)
                }} />
            </Grid>
          </Grid>
          <Grid item xs={6} spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{margin: "10px"}}
                label="GST Number"
                value={GSTNumber}
                onChange={e => {
                  setGSTNumber(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{margin: "10px"}}
                label="Require Service"
                value={requireService}
                onChange={e => {
                  setRequireService(e.target.value)
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                sx={{margin: "10px"}}
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
                sx={{margin: "10px"}}
                label="Order Value"
                value={orderValue}
                onChange={e => {
                  setOrderValue(e.target.value)
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

export default CreateModal;