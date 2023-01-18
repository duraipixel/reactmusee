import React from 'react'
import { PackageSupport } from '../components/Home/PackageSupport';
import Summary from '../components/OrderSummary/Summary';

const OrderSummary = () => {
    return (
        <>
            <Summary />
            <PackageSupport />
        </>
    )
}

export default OrderSummary