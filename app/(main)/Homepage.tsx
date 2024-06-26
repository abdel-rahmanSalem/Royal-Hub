"use client"
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import heroImg from '@/public/hero.png'
import Hero from "@/app/components/Hero";
import Footer from "@/app/components/Footer";
import CategoriesBar from "../components/CategoriesBar";
import { client } from "../lib/sanity";
import { simplifiedProduct } from "../utils/interfaces/interface";
import ProductCard from "../components/ProductCard";
import { groq } from "next-sanity";
import { useEffect, useState } from "react";
import { Circles, Grid } from 'react-loader-spinner'
import FullPageLoader from "../components/FullPageLoader";

export default function Homepage() {
  const [products, setProducts] = useState<simplifiedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getData(){
      setIsLoading(true);
      const products = await client.fetch<simplifiedProduct[]>(groq`*[_type == "product"]{
        name,
        price,
        stock,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url,
        "slug": slug.current,
        isOnSale
      }`);
      setProducts(products);
      setIsLoading(false);
    }

    getData();
  }, [])

  return (
    <>
    
        <main  className="flex flex-col justify-between min-h-screen ">
          {
            isLoading &&
            <FullPageLoader /> 
          }
          <div >
            <div className="relative">
              <Image src={heroImg} priority alt="hero image" className="absolute animate-pulse -z-10 object-contain object-top top-10 lg:top-10 w-full h-full"/>

              <div className=" backdrop-blur-lg bg-transparent fixed top-0 w-full z-[100]">
                <Navbar />
                <CategoriesBar />
              </div>
              <div className="mb-8 mt-20">
              <Hero />
              </div>

            </div>
            <section className="md:max-w-screen-2xl mx-auto my-32">
              <h1 className="font-bold my-4">All Products : </h1>
              {
                isLoading ? 
                <div className="w-full h-full grid place-content-center text-center">
                  <Grid
                  visible={true}
                  height="80"
                  width="80"
                  color="#000"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass="grid-wrapper"
                  />
                  Loading..
                </div>
                :
                <div className=" grid grid-cols-2 md:grid-cols-3 px-4 lg:p-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4 ">
                    {
                      products.map((product, index) => (
                        <div key={index}>
                          {
                            <ProductCard product={product}isOnSale={product.isOnSale}/>
                          }
                        </div>
                      ))
                    }
                </div>
              }
            </section>
          </div>

        </main>
        <Footer />
    </>
  )
}
