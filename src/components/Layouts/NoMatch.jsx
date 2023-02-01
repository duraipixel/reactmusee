import React from "react";

export const NoMatch = () => {
  return (
    <div>
      <section className="shop-carts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="common-heads text-center">
                <h2>Oops!</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="finalcart-list text-center">
                <img
                  className="no-match-image"
                  src="../../assets/illustrations/sigma-1/18-dark.png"
                  alt="call"
                />
                <h3> We can't seem to find the page you're looking for </h3>
                <br />
                <div className="load-btn">
                  <a href="/"> Shop today’s deals </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
