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
      fetch(`http://localhost:3333/api/user/get/`+id, requestOptions)
      .then(response => response.json())
      .then(
        (result) => {
          setId(result['register']['id'])
          setEmail(result['register']['Email'])
          setPassword(result['register']['Password'])
      })
      .catch(error => console.log('error', error));
    }, [id])
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        id: ID,
        Email: Email,
        Password: Password,
      };
      fetch(`http://localhost:3333/api/edit/user`, {
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
            window.location.href = "/users";
          }
        })
        .catch((error) => console.log("error", error));
    };
  
    const [ID, setId] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
    return (
      <Container maxWidth="xs">
          <Typography component="h1" variant="h5">
            Product Create
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="ID"
                  name="ID"
                  variant="outlined"
                  required
                  fullWidth
                  id="id"
                  label="ID"
                  onChange={(e) => setId(e.target.value)}
                  autoFocus
                  value={ID}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Email"
                  label="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={Email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="Password"
                  label="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={Password}
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