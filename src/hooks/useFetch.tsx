import { useEffect, useState } from 'react';

import axios from 'axios';

const useFetch = (limit: number, page: number = 1) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState<number | null>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      axios(`http://localhost:8000/grocery/?_page=${page}&_limit=${limit}`)
        .then((response) => {
          setData(response.data);
          const totalPages = Math.ceil(
            response.headers['x-total-count'] / limit
          );
          setPages(totalPages);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => setLoading(false));
    };

    fetchData();
  }, [limit, page]);

  return { loading, data, pages, error };
};

export default useFetch;
