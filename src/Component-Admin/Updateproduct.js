import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import {  Grid, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useParams } from "react-router-dom";
export default function ProductUpe() {
    
  
const { id } = useParams();
    useEffect(() => {
      var raw = "";
      var requestOptions = {
        method: 'GET',
        body: raw,
        redirect: 'follow'
      };
      fetch(`http://localhost:3333/api/product/get/`+id, requestOptions)
      .then(response => response.json())
      .then(
        (result) => {
          setProductCode(result['stocks']['productCode'])
          setProductName(result['stocks']['ProductName'])
          setPrice(result['stocks']['price'])
          setGroupProduct(result['stocks']['groupProduct'])
          setImagesProducts(result['stocks']['images_Products'])
        
      })
      .catch(error => console.log('error', error));
    }, [id])
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        productCode: productCode,
        ProductName: ProductName,
        price: price,
        groupProduct: groupProduct,
        images_Products: images_Products,
      };
      fetch(`http://localhost:3333/api/edit/product`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          alert(result.message);
          if (result.status === "201") {
            window.location.href = "/Products";
          }
        })
        .catch((error) => console.log("error", error));
    };
  
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
                  value={productCode}
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
                  value={ProductName}
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
                  value={price}
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
                  value={groupProduct}
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
                  value={images_Products}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
          Update
          </Button>
        </form>
    </Container>
  );
}