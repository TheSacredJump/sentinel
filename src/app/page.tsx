"use client"
import FeatureShowcase from "~/components/Features";
import Hero from "~/components/Hero";
import Navbar from "~/components/Navbar";
import Pricing from "~/components/Pricing";
export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeatureShowcase />
      <Pricing />
    </>
  );
}
