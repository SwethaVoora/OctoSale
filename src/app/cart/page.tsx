"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TOrderCredentialsValidator,
  OrderCredentialsValidator,
} from "@/lib/validators/orders-validators";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import CartItem from "@/components/CartItem";
import { trpc } from "@/trpc/client";

const CartForm = () => {
  const { items } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TOrderCredentialsValidator>({
    resolver: zodResolver(OrderCredentialsValidator),
  });

  console.log("debug1");
  const { mutate, isLoading, isError, isSuccess } =
    trpc.cart.createPayloadOrder.useMutation({
      onSuccess: (data) => {
        console.log("Order created successfully", data);
      },
      onError: (error) => {
        console.error("Error creating order", error);
      },
    });
  console.log("debug2");
  const onSubmit = (data: TOrderCredentialsValidator) => {
    console.log("submitting data to the db");
    const orderData = {
      ...data,
      cartitems: items.map(({ product }) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        OctosalePrice: product.OctosalePrice,
        category: product.category,
      })),
    };
    console.log("debug3");
    mutate(orderData);
  };
  console.log("debug4");

  return (
    <>
      <div className="py-10 mx-auto text-center flex flex-col items-center text-orange-600 font-semibold text-7xl max-w-3xl">
        OctoSale
      </div>
      <div className="pt-10 font-medium w-2/3 text-base mx-auto max-w-prose">
        Please submit the below details. We will reach out to you regarding the
        further process.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 pt-10">
        <div className="w-2/3 md:w-1/3 grid mx-auto flex-col">
          <div className="grid gap-1 py-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              {...register("firstname")}
              className={errors.firstname ? "focus-visible:ring-red-500" : ""}
              placeholder="John"
            />
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              {...register("lastname")}
              className={errors.lastname ? "focus-visible:ring-red-500" : ""}
              placeholder="Doe"
            />
          </div>
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              className={errors.email ? "focus-visible:ring-red-500" : ""}
              placeholder="you@example.com"
            />
          </div>
          <Label>Cart Items:</Label>
          <ul>
            {items.map(({ product }) => (
              <li key={product.id}>
                <CartItem product={product} />
              </li>
            ))}
          </ul>
        </div>
        <Button
          type="submit"
          className="flex w-1/3 mx-auto"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
        {isError && <p>There was an error submitting your order.</p>}
        {isSuccess && <p>Order submitted successfully!</p>}
      </form>
    </>
  );
};

export default CartForm;
