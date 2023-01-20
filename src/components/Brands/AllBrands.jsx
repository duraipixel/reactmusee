import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

export const AllBrands = ({ isOpenBrand, brands, brandsalphs }) => {
    
    return (
        <Fragment>
            <div className="col-lg-12 col-md-12 col-sm-12
                            col-xs-12">
                <div className={`brands-list-ftntion mb-5 text-center ${isOpenBrand ? '' : 'hide'}`} >
                    <div className="inner-headngs">
                        <h2>Our Large Inventory of Brands</h2>
                    </div>
                    <ul className="nav nav-tabs justify-content-center" id="myTab"
                        role="tablist">
                            {
                                 brandsalphs && Object.keys(brandsalphs).map((brandkey, i) => (
                                    <li className="nav-item"
                                        role="presentation">
                                        <button className={`nav-link ${brandkey == 'A' ? 'active' : '' }`}
                                            id={`${brandkey}-tab`} data-bs-toggle="tab"
                                            data-bs-target={`#${brandkey}`}
                                            type="button" role="tab"
                                            aria-controls={`${brandkey}`}
                                            aria-selected="true">{brandkey}</button>
                                    </li>
                                 ))
                            }
                        
                        
                    </ul>
                    <div className="tab-content" id="myTabContent">

                        {
                            brandsalphs && Object.entries(brandsalphs).map((brnItems, i) => (
                                <div className={`tab-pane fade ${brnItems[0] == 'A' ? 'active show' : '' } `}
                                    id={brnItems[0]} role="tabpanel"
                                    aria-labelledby={`${brnItems[0]}-tab`} key={i}>                                        
                                    <div className="brands-intab">
                                        
                                        <ul>
                                            {
                                                brnItems[1] && brnItems[1].length > 0 ? brnItems[1].map((item) => (
                                                    <li key={item.id}>
                                                        <Link to={`/products/pfilter?brand=${item.slug}`}>                                               
                                                            <img src={item.image} />
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </li>
                                                )) : 
                                                <li>
                                                    No Brands Available
                                                </li> 
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
        </Fragment>
    )
}
