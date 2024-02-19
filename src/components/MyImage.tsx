import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button";

export default function MyImage() {
const urlImage = "https://images.unsplash.com/photo-1708021167528-c9eb4c143bb1";
  return (
    <>
      <h1 className="maClasse">My Image</h1>
      <p>Image from Unsplash</p>
      <div className="flex justify-center content-center p-2 border-2 m-5 rounded-md bg-slate-400">
        <Image
          src={urlImage}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>
      <Button variant="destructive">Destructive</Button>
    </>
  );
}
