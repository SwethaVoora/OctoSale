import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { BaggageClaim, DollarSign, MapPin } from "lucide-react";
import ProductReel from "@/components/ProductReel";

const perks = [
  {
    name: "Anytime Pickup",
    Icon: BaggageClaim,
    description:
      "Get your items at any time of the day(10AM - 9PM), when you are available.",
  },
  {
    name: "Location",
    Icon: MapPin,
    description: "5 minutes walk from Indian street near JSQ, Jersey City, NJ.",
  },
  {
    name: "Pay on the Spot/Online",
    Icon: DollarSign,
    description:
      "Come see the product by yourself & pay online or in cash to take it with you right away.",
  },
];
export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Hi I'm Voora! Come checkout our{" "}
            <span className="text-orange-600">House-hold Items</span> at your
            price.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to OctoSale. Get our items for{" "}
            <span className="text-orange-500 font-bold">
              free/at a discounted price
            </span>
            . All these products on our website have been checked by us, to
            ensure high quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse All Products
            </Link>
            {/* <Button variant="ghost">Our quality promise &rarr;</Button> */}
          </div>
        </div>

        <ProductReel
          href="/products"
          title="Products"
          query={{ sort: "desc", limit: 4 }}
        />

        <ProductReel
          href="/products"
          title="Furniture"
          query={{ category: "furniture", sort: "desc", limit: 4 }}
        />

        <ProductReel
          href="/products"
          title="Electronics"
          query={{ category: "electronics", sort: "desc", limit: 4 }}
        />

        <ProductReel
          href="/products"
          title="Free-Items"
          query={{ category: "free-items", sort: "desc", limit: 4 }}
        />
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrint-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
