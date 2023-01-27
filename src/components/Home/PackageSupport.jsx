import React, { Fragment } from 'react'

export const PackageSupport = () => {
    return (
        <Fragment>
            <section className="possibles">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">

                            <div className="care-box text-left">
                                <span><img src="/assets/images/icn-1.png" /> 24x7 <br />Customer Support</span>
                            </div>

                            <div className="care-box text-left">
                                <span><img src="/assets/images/icn-2.png" /> Free <br />Shipping</span>
                            </div>

                            <div className="care-box text-left">
                                <span><img src="/assets/images/icn-3.png" /> Flexible <br />Returns </span>
                            </div>

                            <div className="care-box text-left">
                                <span><img src="/assets/images/icn-4.png" /> Secure <br />Payments</span>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
