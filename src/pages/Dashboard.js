// src/components/Dashboard.js


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Typography, Container, Button } from '@mui/material';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const address = process.env.REACT_APP_BITCOIN_ADDRESS;
        const response = await axios.get(`${process.env.REACT_APP_MEMPOOL_API_URL}/address/${address}/txs`);

        console.log(response)
        setTransactions(response.data);
        if (response.data.length < 25) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const fetchMoreTransactions = async () => {
    try {
      const address = process.env.REACT_APP_BITCOIN_ADDRESS;
      const response = await axios.get(`${process.env.REACT_APP_MEMPOOL_API_URL}/address/${address}/txs`);
      setTransactions([...transactions, ...response.data]);
      if (response.data.length < 25) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = (tx) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(tx)) {
        return prevFavorites.filter(fav => fav !== tx);
      } else {
        return [...prevFavorites, tx];
      }
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate.push('/');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Transaction
      </Typography>
      <InfiniteScroll
        dataLength={transactions.length}
        //next={fetchMoreTransactions}
        hasMore={hasMore}
        loader={<CircularProgress />}
        endMessage={<Typography>No more transactions</Typography>}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TYPE</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>TX ID</TableCell>
              <TableCell>AMOUNT (BTC)</TableCell>
              <TableCell>BALANCE (BTC)</TableCell>
              <TableCell>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.txid}>
                <TableCell>{new Date(tx.time * 1000).toLocaleString()}</TableCell>
                <TableCell>{tx.value}</TableCell>
                <TableCell>{tx.confirmations > 0 ? 'Confirmed' : 'Unconfirmed'}</TableCell>
                <TableCell>
                  <Button onClick={() => handleFavorite(tx.txid)}>
                    {favorites.includes(tx.txid) ? 'Unfavorite' : 'Favorite'}
                  </Button>
                </TableCell>
                <TableCell>100</TableCell>
                <TableCell>200</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </Container>
  );
};

export default Dashboard;