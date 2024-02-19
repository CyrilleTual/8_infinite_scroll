"use client";
import { axios } from "@/lib/http-common";
import { useEffect, useState } from "react";

export default function usePhotos({
  query,
  pageIndex,
}: {
  query: string;
  pageIndex: number;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{
    state: boolean;
    message: string;
  }>({
    state: false,
    message: "",
  });
  const [photos, setPhotos] = useState<any[]>([]);
  const [maxPages, setMaxPages] = useState<number>(1);

  const API_KEY = process.env.NEXT_PUBLIC_UNSPLASH_API_KEY;

  useEffect(() => {
    // request to unsplach api

    setLoading(true);
   
    axios
      .get(`/search/photos`, {
        params: {
          page: pageIndex,
          query: query,
          client_id: API_KEY,
        },
      })
      .then(function (response) {
     
       setPhotos((state)=> [ ...state, ...response.data.results] );
        setMaxPages(response.data.total_pages);
        setLoading(false);
 

      })
      .catch(function (error) {
          setError({
            state: true,
            message: "fz",
          });
            setLoading(false);
      })
      .finally(function () {
        // dans tous les cas
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, pageIndex]);

  return {
    error,
    loading,
    photos,
    maxPages,
  };
}
