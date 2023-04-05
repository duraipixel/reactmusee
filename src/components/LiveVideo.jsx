import { Fragment } from 'react'
import { Link } from 'react-router-dom'

export const LiveVideo = () => {
  return (
    <Fragment>
      <section className="live-video">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-between align-items-center">
              <div className="shopping-video col-lg-8">
                <div className="common-heads light">
                  <h2>Virtual  Shopping</h2>
                </div>
                <div className="secondary-para">
                  Experience the convenience and flexibility of shopping from the comfort of your home! Our Product Experts will help and guide you choose the perfect musical instrument via Video Call providing a personalized shopping experience at your fingertip!
                </div>
              </div>
              <div className="shopping-book">
                <Link to='/products/pfilter?booking=video_shopping'>
                  Book Now
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>
    </Fragment>
  );
};
