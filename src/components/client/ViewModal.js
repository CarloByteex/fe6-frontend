import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";

const ViewModal = (props) => {
  const { open, onClose, handleEdit, sale } = props;

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
          Sales Order Preview
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1"
                sx={{ margin: "10px" }}
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                Customer Name: {sale.customerName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"
                sx={{ margin: "10px" }}
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                Company Detail: {sale.companyName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"
                sx={{ margin: "10px" }}
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                GST: {sale.GSTNumber}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={6} spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1"
                sx={{ margin: "10px" }}
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                Email: {sale.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1"
                sx={{ margin: "10px" }}
                fontWeight="bold"
                color="text.primary"
                gutterBottom
                noWrap
              >
                Phone Number: {sale.contactNumber}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>SERVICES NAME</TableCell>
                  <TableCell align='center'>QUANTITY</TableCell>
                  <TableCell align='center'>AMOUNT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  hover
                >
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {sale.requireService}
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
                      {sale.qty}
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
                </TableRow>
                <TableRow hover>
                  <TableCell align='center'>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      TOTAL
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
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => handleEdit()}>Edit</Button>
        <Button onClick={onClose} >Cancel</Button>
      </DialogActions>
    </Dialog >
  )
}

export default ViewModal;