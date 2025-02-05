"use client"

import { SessionProvider } from "next-auth/react";
import FeatureShowcase from "~/components/Features";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import Pricing from "~/components/Pricing";
export default function HomePage() {
  return (
    <>
      <SessionProvider>
        <Navbar />
      </SessionProvider>
      <Hero />
      <FeatureShowcase />
      <Pricing />
    </>
  );
}
