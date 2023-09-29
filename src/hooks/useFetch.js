//use effect for each page is not good idea ..so pasing url in hook and calling a function

import { useEffect, useState } from 'react';
import { makeRequest } from '../makeRequest';
import axios from 'axios';

//redux
import { useDispatch } from 'react-redux';
import {
  getgetAllProductRequestLoading,
  getAllProductRequestSuccess,
  getAllProductsRequestFail,
} from '../redux/productsReducer';

const useFetch = (url) => {
  // const [data, setData] = useState([]);
  // const [loading, setLoding] = useState(false);
  // const [error, setError] = useState(false);

  //redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //setLoding(true);
        dispatch(getgetAllProductRequestLoading());
        console.log(process.env.REACT_APP_PRODUCTS_API_URL + url);
        const res = await makeRequest.get(
          process.env.REACT_APP_PRODUCTS_API_URL + url
        );
        dispatch(getAllProductRequestSuccess(res.data.products));
        // setData(res.data.products);
        // setLoding(false);
      } catch (err) {
        //setError(true);
        dispatch(getAllProductsRequestFail(true));
      }
    };

    fetchData();
  }, [url]);

  // return { data, loading, error };
  return;
};

export default useFetch;
