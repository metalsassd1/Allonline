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

const Productedit = id => {
  window.location = '/edit/product/' +id
}


const ProductDelete = productCode => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "productCode": productCode
  });
  
  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("http://localhost:3333/api/product/delete", requestOptions)
    .then(response => response.json())
    .then(result => {
      alert(result['message'])
      if (result['status'] ==='200'){
        window.location.href = '/Products'
      }
    })
    .catch(error => console.log('error', error));
}
const columns = [
  {
    name: "images_Products",
    selector: (row) => row.images_Products,
    cell: (row) => <img src={row.images_Products} width={100} alt={row.name}></img>,
    width: "150px",
  },
  {
    name: "productCode",
    selector: (row) => row.productCode,
    width: "150px",
  },
  {
    name: "ProductName",
    selector: (row) => row.ProductName,
    width: "350px",
  },
  {
    name: "price",
    selector: (row) => row.price,
    sortable: true,
    width: "150px",
  },
  {
    name: "GroupProduct",
    selector: (row) => row.groupProduct,
    width: "100px",
  },
  {
    name: "Action",
    selector: (row) => row.create_at,
    sortable: true,
    cell:(row) => <ButtonGroup variant="contained" aria-label="outlined primary button group">
    <Button onClick={() => ProductDelete(row.productCode)}>DEL</Button>
    <Button onClick={() => Productedit(row.productCode)}>Edit</Button>
  </ButtonGroup>,
    width: "250px",
  },
];
export default function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("");
  const [sortColumnDir, setSortColumnDir] = useState("");

  const fetchproducts = async () => {
    setLoading(true);
    
    var url = `http://localhost:3333/api/product?page=${page}&per_page=${perPage}`;

    if (sortColumn) {
      url += `&sort_column=${sortColumn}&sort_column_dir=${sortColumnDir}`;
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
    fetchproducts();  
  }, [page, perPage, sortColumn, sortColumnDir]);

  return (
    <Box>
      <React.Fragment>
        <CssBaseline />
        <Box display="flex">
          <Box sx={{ flexGrow: 1 }}>      <Typography variant="h6" gutterBottom>
        PRODUCTS
      </Typography ></Box>
          <Box>
            <Link  href="create">
            <Button variant="contained" color="success">UPLOAD</Button>
            </Link></Box>
          <Box>
          <Link href="users">
            <Button variant="contained" color="error">USERS</Button>
            </Link></Box>
             
        </Box>
        <Container maxWidth="none" sx={{ p: 2 }}>
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
