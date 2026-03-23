import React from "react";
import Card from "@/components/Card";

const Home = () => {
  return (
    <div className="bg-light-100">
      {/* Example product grid */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <h1 className="text-heading-2 font-bold text-dark-900 mb-8">
          Popular Right Now
        </h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card
            title="Nike Air Force 1 Mid '07"
            description="Men's Shoes"
            price={98.3}
            image="/shoes/shoe-1.jpg"
            colors={6}
            badge="Best Seller"
          />
          <Card
            title="Nike Air Max 90"
            description="Women's Shoes"
            price={120.0}
            image="/shoes/shoe-2.webp"
            colors={4}
          />
          <Card
            title="Nike Huarache"
            description="Kids' Shoes"
            price={85.5}
            image="/shoes/shoe-3.webp"
            colors={3}
            badge="New Arrival"
          />
          <Card
            title="Nike Air Max 95"
            description="Men's Shoes"
            price={175.0}
            image="/shoes/shoe-4.webp"
            colors={8}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
