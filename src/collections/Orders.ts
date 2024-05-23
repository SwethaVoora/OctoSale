import { PRODUCT_CATEGORIES } from "../config";
import { CollectionConfig } from "payload/types";

export const Orders: CollectionConfig = {
  slug: "orders",
  // admin: {
  //   useAsTitle: "name", //This will be the default field for the product in the amdin dashboard?
  // },
  access: {},
  fields: [
    {
      name: "firstname", //each product should be associated with a user...as they are the ones adding their products
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
      required: true,
    },
    { name: "email", label: "Email-Address", type: "text", required: true },
    {
      name: "cartitems",
      type: "array",
      label: "Cart Items",
      minRows: 1,
      maxRows: 30,
      required: true,
      labels: {
        singular: "Cart Item",
        plural: "Cart Items",
      },
      fields: [
        {
          name: "id",
          label: "Product Id",
          type: "text",
          required: true,
        },
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
        },
        { name: "description", type: "textarea", label: "product details" },
        {
          name: "OctosalePrice",
          label: " Octosale Price in USD",
          min: 0,
          max: 1000,
          type: "number",
          required: true,
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
            label,
            value,
          })),
          required: true,
        },
        // {
        //   name: "images",
        //   type: "array",
        //   label: "Product images",
        //   minRows: 1,
        //   maxRows: 4,
        //   required: true,
        //   labels: {
        //     singular: "Image",
        //     plural: "Images",
        //   },
        //   fields: [
        //     {
        //       name: "image",
        //       type: "upload",
        //       relationTo: "media",
        //       required: true,
        //     },
        //   ],
        // },
      ],
    },
  ],
};
