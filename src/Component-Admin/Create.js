import React, { useState } from "react";
import Container from "@mui/material/Container";
import {  Grid, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';

export default function Productcreate() {
 const handleSubmit = event => {
    event.preventDefault();
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "productCode": productCode,
  "ProductName": ProductName,
  "price": price,
  "groupProduct": groupProduct,
  "images_Products":images_Products
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3333/api/create", requestOptions)
  .then(response => response.json())
  .then(result => {
    alert(result['message'])
    if (result['status'] === '201') {
      window.location.href = '/Products';
    }
  })
  .catch(error => console.log('error', error));
  }

  const [productCode, setProductCode] = useState('');
  const [ProductName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [groupProduct, setGroupProduct] = useState('');
  const[images_Products, setImagesProducts] = useState('');
  return (
    <Container maxWidth="xs">
        <Typography component="h1" variant="h5">
          Product Create
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="productCode"
                name="productCode"
                variant="outlined"
                required
                fullWidth
                id="productCode"
                label="productCode"
                onChange={(e) => setProductCode(e.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="ProductName"
                label="ProductName"
                onChange={(e) => setProductName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="groupProduct"
                label="GroupProduct"
                onChange={(e) => setGroupProduct(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="images_Products"
                label="images_Products"
                onChange={(e) => setImagesProducts(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </form>
    </Container>
  );
}