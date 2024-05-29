// src/app/thank-you/page.tsx
import React from "react";

const ThankYouPage = () => {
  return (
    <div className="py-10 mx-auto text-center flex flex-col items-center text-orange-600 font-semibold text-7xl max-w-3xl">
      Thank You!
      <div className="pt-10 text-base max-w-prose">
        Thank you for your submission. We will reach out to you regarding the
        further process.
      </div>
    </div>
  );
};

export default ThankYouPage;
