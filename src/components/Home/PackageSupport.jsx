export const PackageSupport = () => {
  return (
    <div className="bg-light package-support">
      <div className="row justify-content-between container mx-auto text-center">
        <div className="col-md border-bottom-max-md col-sm-6">
          <img
            src={require("../../assets/images/icons/Certified Products.png")}
            alt="Certified Products"
          />
        </div>
        <div className="col-md border-bottom-max-md col-sm-6">
          <img
            src={require("../../assets/images/icons/Customer Support.png")}
            alt="Customer Support"
          />
        </div>
        <div className="col-md border-bottom-max-md col-sm-6">
          <img
            src={require("../../assets/images/icons/Secure Shipping.png")}
            alt="Secure Shipping"
          />
        </div>
        <div className="col-md border-bottom-max-md col-sm-6">
          <img
            src={require("../../assets/images/icons/Standard Warranty.png")}
            alt="Standard Warranty"
          />
        </div>
        <div className="col-md col-sm-6">
          <img
            src={require("../../assets/images/icons/Virtual Shopping.png")}
            alt="Virtual Shopping"
          />
        </div>
      </div>
    </div>
  );
};
