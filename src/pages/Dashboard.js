// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography, Container, Button, Box, TextField } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import LogoutButton from './LogoutButton';
import '../index.css';



const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [AddressT, setAddressT] = useState('');
  const [addrError, setAddrError] = useState(false);


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        
        const address = process.env.REACT_APP_BITCOIN_ADDRESS;
        setAddressT(address);
        const response = await axios.get(`${process.env.REACT_APP_MEMPOOL_API_URL}/address/${address}/txs`);
        setTransactions(response.data);
        if (response.data.length < 25) {
          setHasMore(false);
        }
      } catch (error) {
        //console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const fetchMoreTransactions = async (address) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_MEMPOOL_API_URL}/address/${address}/txs`);
      setTransactions(response.data);
      setAddressT(address);
      if (response.data.length < 25) {
        setHasMore(false);
      }
      setLoading(false);
    } catch (error) {
      setAddrError(error.response.data)
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div style={{display: 'flex', marginTop:'400px', justifyContent: 'center'}}><CircularProgress /></div>;
  }

  function updateAddrVar(e){
    const newAddr = document.getElementById('addr').value;   
    if(newAddr.length >= 25){
      setAddrError(false);
      fetchMoreTransactions(newAddr)
    }else{
      setAddrError("Input must be at least 25 characters long");
    }
  }

  return (
    <Container>      
      <Box className='logout-box' ><LogoutButton /></Box>
      <Box>
        <TextField
          id='addr'
          label='BTC ADDRESS'
          margin='normal'
          size='small'
          style = {{width: 400}}    
          helperText={addrError ? addrError : ""}
          error={addrError}
        />
        <Button variant="contained" id='updateaddr' size='large' color='secondary' onClick={updateAddrVar} sx={{ m: 2 }}>
          Submit
        </Button>
      </Box>
      <Box>
         <p><b>Address :</b> {AddressT}</p>
         <p><b>Balance :</b> ₿500.00</p> 
      </Box>
      <Typography variant="h4" gutterBottom>
        Holding
      </Typography>
      <Box>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10, 11, 12, 15, 20, 25, 30] }]}
          series={[
            {
              data: [2, 2.5, 4.5, 5, 8, 9, 5, 10, 15, 18, 5, 22],
              area: true,
            },
          ]}
          width={1200}
          height={500}
        />
      </Box>
      <Typography variant="h4" gutterBottom>
        Transaction
      </Typography>     
      <InfiniteScroll
        dataLength={transactions.length}
        loader={<div style={{display: 'flex', marginTop:'400px', justifyContent: 'center'}}><CircularProgress /></div>}
        endMessage={<Typography>No more transactions</Typography>}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FEE</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TX ID</TableCell>
              <TableCell>SIZE</TableCell>
              <TableCell>WEIGHT</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.txid}>
                <TableCell>{tx.fee}</TableCell>
                <TableCell>{new Date(tx.locktime * 1000).toLocaleString()}</TableCell>
                <TableCell>{tx.txid}</TableCell>
                <TableCell>{tx.size}</TableCell>
                <TableCell>{tx.weight}</TableCell>
                <TableCell>
                {tx.status.confirmed ? (
                   <Button variant="outlined" color="success" sx={ { borderRadius: 25 } }>Success</Button>
                ) : (
                  <Button variant="outlined" color="error" sx={ { borderRadius: 25 } }>Failed</Button>
                )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </Container>
  );
};

export default Dashboard;