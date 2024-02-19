"use client";

import spinner from "../assets/spinner.svg";
import Image from "next/image";
import usePhotos from "@/hook/usePhotos";
import { useState, useRef, use, useEffect } from "react";

export default function List() {
  const [query, setQuery] = useState<string>("random");
  const [pageIndex, setPageIndex] = useState<number>(1);

  const { error, loading, photos, maxPages } = usePhotos({
    query,
    pageIndex,
  });

  const lastPicRef = useRef<HTMLLIElement | null>(null);
/**
 * A reference to the IntersectionObserver used for infinite scrolling.
 */
const observer = useRef<IntersectionObserver | undefined>();

  useEffect(() => {
    if (lastPicRef.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pageIndex < maxPages) {
          setPageIndex((prev) => prev + 1);
          lastPicRef.current = null;
          observer.current?.disconnect();
        }
      });
      observer.current.observe(lastPicRef.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  /// observer
  return (
    <>
      <h1 className="text-4xl">Scroll Unsplach</h1>
      <form>
        <label htmlFor="search" className="block mb-4">
          Looking for images ...
        </label>
        <input
          type="text"
          placeholder="type your search here"
          className=" text-slate-800 block w-full mb-14 py-3 px-2 outline-gray-500 rounded-lg border border-slate-800"
        />
      </form>
      {loading && (
        <div className="flex justify-center ">
          <Image src={spinner} alt="spinner" />
        </div>
      )}

      {error.state && <p>Error </p>}

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] auto-rows-[175px] gap-4 justify-center ] ">
        {photos.map((photo, index) => {
          if (index === photos.length - 1) {
            return(<li 
                ref={lastPicRef}
                key={index} 
                className="bg-slate-200 p-4 rounded-lg">
                <Image
                  width={250}
                  height={175}
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="w-full h-full object-contain rounded-lg"
                />
              </li>)
          } else
            return (
              <li
                key={index}
                className="bg-slate-200 p-4 rounded-lg"
              >
                <Image
                  width={250}
                  height={175}
                  src={photo.urls.regular}
                  alt={photo.alt_description}
                  className="w-full h-full object-contain rounded-lg"
                />
              </li>
            );
        })}
      </ul>
    </>
  );
}
