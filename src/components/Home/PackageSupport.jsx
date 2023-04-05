export const PackageSupport = () => {
    return (
        <div className='bg-light package-support'>
            <div className="row justify-content-between container mx-auto text-center">
                <div className="col-md col-sm-6">
                    <img src={require('../../assets/images/icons/Certified Products.png')} />
                </div>
                <div className="col-md col-sm-6">
                    <img src={require('../../assets/images/icons/Customer Support.png')} />
                </div>
                <div className="col-md col-sm-6">
                    <img src={require('../../assets/images/icons/Secure Shipping.png')} />
                </div>
                <div className="col-md col-sm-6">
                    <img src={require('../../assets/images/icons/Standard Warranty.png')} />
                </div>
                <div className="col-md col-sm-6">
                    <img src={require('../../assets/images/icons/Virtual Shopping.png')} />
                </div>
            </div> 
        </div>
    )
}
