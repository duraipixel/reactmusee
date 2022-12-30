import React, { Fragment } from 'react'

export const FilterItems = () => {
    return (
        <Fragment>
            <div class="col-lg-4 col-md-4">
                <div class="project-bxe">
                    <a href="product-detail.html">
                        <div class="prdt-img">
                            <img
                                src="images/proj-3.jpg" />
                            <div class="ofr-prc">
                                <h5>10%<span>Off</span></h5>
                            </div>
                        </div>
                        <div class="ratings d-flex justify-content-between">
                            <div class="prdt-type">
                                GRAND PIANOS
                            </div>
                            <div
                                class="prdt-ratngs">
                                <img
                                    src="images/star.png" />4.9
                            </div>
                        </div>
                        <div class="prdt-nameprc">
                            <h4>Yamaha C7X Grand
                                Piano</h4>
                            <h5><span>₹14,999</span>₹24,296</h5>
                        </div>
                    </a>
                </div>
            </div>
        </Fragment>
    )
}
