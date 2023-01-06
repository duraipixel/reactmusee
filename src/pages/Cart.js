import React, { Fragment } from 'react'

export const Cart = () => {
    return (
        <Fragment>
            <section class="shop-carts">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="common-heads text-center">
                                <h2>Shopping Cart</h2>
                            </div>
                        </div>

                        <div class="col-lg-8">
                            <div class="finalcart-list">
                                <table class="table table-bordered">

                                    <thead>
                                        <tr>
                                            <th>&nbsp;</th>
                                            <th>Product</th>
                                            <th>&nbsp;</th>
                                            <th width="130">Quantity</th>
                                            <th width="130">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <button><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                            </td>
                                            <td>
                                                <img src="/assets/images/sales-1.png" />
                                            </td>
                                            <td>
                                                Yamaha PSR-I500 Portable Keyboard
                                            </td>
                                            <td>
                                                <button><img src="/assets/images/sub.png" /></button>
                                                <span>1</span>
                                                <button><img src="/assets/images/add.png" /></button>
                                            </td>
                                            <td>
                                                <span class="price"> ₹21,498 </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <button><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                            </td>
                                            <td>
                                                <img src="/assets/images/sales-2.png" />
                                            </td>
                                            <td>
                                                Yamaha FC5 Sustain Pedal for Keyboards and Pianos
                                            </td>
                                            <td>
                                                <button><img src="/assets/images/sub.png" /></button>
                                                <span>1</span>
                                                <button><img src="/assets/images/add.png" /></button>
                                            </td>
                                            <td>
                                                <span class="price"> ₹21,498 </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3" style={{border: '0px'}}>
                                                Have a Coupon?
                                                <input type="text" placeholder="Enter Coupon code here" id="coupon" name="coupon" maxlength="6" />
                                                <a href="">Apply</a>
                                            </td>
                                            <td colspan="2" style={{textAlign: 'right',border: '0px'}}>
                                                <button class="refreshing"> <img src="/assets/images/refresh.png" />
                                                    Refresh Cart
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="shipping-addresss">
                                    <h4>Select Shipping Address</h4>
                                    <div class="">
                                        <div class="load-btn">
                                            <a href="javascript:void(0)" class="show-brands" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                Add New Address
                                            </a>
                                        </div>

                                        <div class="load-btn del-btn">
                                            <a href="javascript:void(0)" class="show-brands">
                                                Delete Address
                                            </a>
                                        </div>
                                    </div>
                                    <div class="ship-list">
                                        <h3>Ship to</h3>
                                        <div class="line-spacer"></div>
                                        <div class="addres-que customRadio">
                                            <input type="radio" name="textEditor" id="addrs1" />
                                                <label for="addrs1">
                                                    <span>Kabir L</span>
                                                    1833, 18th Main Road, Thiruvalluvar Colony, Anna Nagar West, Chennai, Tamil Nadu 600040
                                                </label>
                                        </div>
                                        <div class="addres-que customRadio">
                                            <input type="radio" name="textEditor" id="addrs2" />
                                                <label for="addrs2">
                                                    <span>Naya</span>
                                                    Flat No-207, Eldams Square, 167/2, Eldams Road, Alwarpet, Chennai, Tamil Nadu  600018
                                                </label>
                                        </div>
                                        <div class="addres-que customRadio">
                                            <input type="radio" name="textEditor" id="addrs3" />
                                                <label for="addrs3">
                                                    <span>Inaya</span>
                                                    01/02, Lalji Shopping Centre, S V Road, Borivali (West), Mumbai, Maharashtra 400092
                                                </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                       

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog cstmzed">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Add a New Shipping Address</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">

                                        <form>
                                            <h4>Contact Details</h4>
                                            <div class="row">
                                                <div class="mb-3 col-lg-6">
                                                    <input type="text" class="form-control" id="recipient-name" placeholder="Name" />
                                                </div>
                                                <div class="mb-3 col-lg-6">
                                                    <input type="text" class="form-control" id="recipient-name" placeholder="Mobile Number" />
                                                </div>
                                                <div class="mb-3 col-lg-6">
                                                    <input type="text" class="form-control" id="recipient-name" placeholder="Telephone Number" />
                                                </div>
                                                <div class="mb-3 col-lg-6">
                                                    <select class="form-control" id="enq" name="enq" placeholder="Telephone Number">
                                                        <option value="">Address Type</option>
                                                        <option value="office">Office</option>
                                                        <option value="Home">Home</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <h4>Address</h4>
                                            <div class="row">
                                                <div class="mb-3 col-lg-12">
                                                    <input type="text" class="form-control" id="recipient-name" placeholder="Building Number, Street Name & Locality" />
                                                </div>
                                                <div class="mb-3 col-lg-6">
                                                    <input type="text" class="form-control" id="recipient-name" placeholder="City" />
                                                </div>
                                                <div class="mb-3 col-lg-6">
                                                    <input type="text" class="form-control" id="recipient-name" placeholder="Pincode" />
                                                </div>
                                                <div class="mb-3 col-lg-6">
                                                    <select class="form-control" id="enq" name="enq" placeholder="Telephone Number">
                                                        <option value="">SelectState</option>
                                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                        <option value="Assam">Assam</option>
                                                        <option value="Bihar">Bihar</option>
                                                        <option value="Chandigarh">Chandigarh</option>
                                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                                                        <option value="Daman and Diu">Daman and Diu</option>
                                                        <option value="Delhi">Delhi</option>
                                                        <option value="Lakshadweep">Lakshadweep</option>
                                                        <option value="Puducherry">Puducherry</option>
                                                        <option value="Goa">Goa</option>
                                                        <option value="Gujarat">Gujarat</option>
                                                        <option value="Haryana">Haryana</option>
                                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                        <option value="Jharkhand">Jharkhand</option>
                                                        <option value="Karnataka">Karnataka</option>
                                                        <option value="Kerala">Kerala</option>
                                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                        <option value="Maharashtra">Maharashtra</option>
                                                        <option value="Manipur">Manipur</option>
                                                        <option value="Meghalaya">Meghalaya</option>
                                                        <option value="Mizoram">Mizoram</option>
                                                        <option value="Nagaland">Nagaland</option>
                                                        <option value="Odisha">Odisha</option>
                                                        <option value="Punjab">Punjab</option>
                                                        <option value="Rajasthan">Rajasthan</option>
                                                        <option value="Sikkim">Sikkim</option>
                                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                                        <option value="Telangana">Telangana</option>
                                                        <option value="Tripura">Tripura</option>
                                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                        <option value="Uttarakhand">Uttarakhand</option>
                                                        <option value="West Bengal">West Bengal</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                    <div class="modal-footer text-center">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>                       

                        <div class="col-lg-4">
                            <div class="cart-boduy">
                                <h4>Cart Details</h4>
                                <h5>Cart Subtotal</h5>
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Sub Total</td>
                                            <td>₹22,897</td>
                                        </tr>
                                        <tr>
                                            <td>Taxes</td>
                                            <td>₹4,118.22</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line-spacer"></div>
                                <h5>Select Shipping Speed</h5>
                                <table class="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>Ship To:</td>
                                            <td><a href="">Changes Address</a></td>
                                        </tr>
                                        <tr>
                                            <td colspan="2">Kabir L <br /> 1833, 18th Main Road, Thiruvalluvar Colony, Anna Nagar West, Chennai, Tamil Nadu 600040</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table class="table table-borderless customRadio">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input type="radio" name="textEditor" id="sublime" /><label for="sublime">Standard Shipping</label>
                                            </td>
                                            <td>
                                                Free
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="220">
                                                <input type="radio" name="textEditor" id="nextime" /><label for="nextime">2 Days Express Shipping</label>
                                            </td>
                                            <td>
                                                ₹500
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line-spacer"></div>
                                <table class="table table-borderless end-point">
                                    <tbody>
                                        <tr>
                                            <td>Grand Total</td>
                                            <td> ₹27,515.22 </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2"><button>Proceed to Checkout</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    )
}
