import { Fragment } from 'react'

export const PackageSupport = () => {
    return (
        <Fragment>
            <section className="possibles bg-dark">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between">

                            <div className="care-box text-left"> 
                                <span className='text-white'><img width={50} src={require('../../assets/images/customer-service.png')} /> 24x7 <br />Customer Support</span>
                            </div>

                            <div className="care-box text-left">
                                <span className='text-white'><img width={70} style={{ transform: 'translate(-20px,-10px)' }} src={require('../../assets/images/free-shipping.png')} /> Free <br />Shipping</span>
                            </div>

                            <div className="care-box text-left">
                                <span className='text-white'><img width={45} src={require('../../assets/images/return.png')} /> Flexible <br />Returns </span>
                            </div>

                            <div className="care-box text-left">
                                <span className='text-white'><img width={40} src={require('../../assets/images/payment-gateway.png')} /> Secure <br />Payments</span>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
