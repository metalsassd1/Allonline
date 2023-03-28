import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { ButtonGroup } from "@mui/material";

const UserEdit = id => {
  window.location = '/edit/user' +id
}


const UserDelete = id => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "id": id
  });
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:3333/api/users/delete", requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result['message'])
      if (result['status'] ==='200'){
        window.location.href = '/users'
      }
     
    })
    .catch(error => console.log('error', error));
}
const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    width: "90px",
  },
  {
    name: "Email",
    selector: (row) => row.Email,
    width: "150px",
  },
  {
    name: "Password",
    selector: (row) => row.Password,
    width: "350px",
  },
  {
    name: "Action",
    selector: (row) => row.create_at,
    sortable: true,
    cell:(row) => <ButtonGroup variant="contained" aria-label="outlined primary button group">
    <Button onClick={() => UserDelete(row.id)}>DELETE</Button>
    <Button onClick={() => UserEdit(row.id)}>Edit</Button>
  </ButtonGroup>,
  width: "200px",
  }
];
export default function User() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");

  const fetchuser = async () => {
    setLoading(true);

    var url = `http://localhost:3333/api/users?page=${page}&per_page=${perPage}`;

    if (sortColumn) {
      url += "&sort_column=${sortColumn}&sort_directtion=${sortColumDir}";
    }
    const response = await axios.get(url);

    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleSort = (column, sortDirection) => {
    setSortColumn(column.name);
    setSortColumnDir(sortDirection);
  };

  useEffect(() => {
    fetchuser();
  }, [page, perPage, sortColumn, sortColumnDir]);

  return (
    <Box>
      <React.Fragment>
        <CssBaseline />
        <Box display="flex">
          <Box sx={{ flexGrow: 1 }}>      <Typography variant="h6" gutterBottom>
        USERS
      </Typography></Box>
          <Box>
          <Link href="/Products">
            <Button variant="contained" color="error">PRODUCTS</Button></Link>
            </Box> 
        </Box>
   
        <Container maxWidth="lg" sx={{ p: 2 }}>
          <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            onSort={handleSort}
          />
        </Container>
      </React.Fragment>
    </Box>
  );
}
