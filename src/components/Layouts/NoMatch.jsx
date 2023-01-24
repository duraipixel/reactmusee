import React from "react";

export const NoMatch = () => {
  return (
    <div>
      <section class="shop-carts">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
              <div class="common-heads text-center">
                <h2>Oops!</h2>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="finalcart-list text-center">
                <img
                  className="no-match-image"
                  src="../../assets/illustrations/sigma-1/18-dark.png"
                  alt="call"
                />
                <h3> We can't seem to find the page you're looking for </h3>
                <br />
                <div class="load-btn">
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
