import React from "react";
import { PackageSupport } from "../components/Home/PackageSupport";
import Summary from "../components/OrderSummary/Summary";
import { Helmet } from "react-helmet";

const OrderSummary = () => {
  return (
    <>
      <Helmet>
        <title>View Your Order Summary - Complete Details</title>
        <link rel="canonical" href={window.location.href} />
        <meta
          name="description"
          content="Review your purchase with our convenient order summary. Get a comprehensive overview of your order details in one place."
        />
        <meta
          name="google-site-verification"
          content="Sz-Y0bbkprXfafs3xbhe_JgUQh4UABqy_dyTY4TJ9rk"
        />
      </Helmet>
      <Summary />
      <PackageSupport />
    </>
  );
};

export default OrderSummary;
