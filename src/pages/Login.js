import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <Fragment>
            <section class="tab-of-sectors lgon-pge">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-9 col-md-9 col-sm-9">
                            <div class="row fully-bxn g-0">
                                <div class="col-lg-6">
                                    <div class="dhoni-bgm">
                                        <div class="common-heading">
                                            <h2>
                                                Welcome to<br /> <span>Musee Musical</span>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="cir-frm">
                                        <form>
                                            <div class="frm-fields row clearfix">
                                                <div class="col-lg-12 col-md-12 col-sm-12">
                                                    <div class="common-heading">
                                                        <h2>
                                                            Login <span> Here! </span>
                                                        </h2>
                                                    </div>
                                                    <div class="row">
                                                        <div class="form-data col-lg-12 mb-3">
                                                            <input class="form-control" type="text" name="email" placeholder="Email" />
                                                        </div>
                                                        <div class="form-data col-lg-12 mb-3">
                                                            <input class="form-control" type="text" name="name" placeholder="Password" />
                                                        </div>
                                                        <div class="form-data sbm col-lg-12 mb-3">
                                                            <input type="submit" name="submit" value="SIGN IN" />
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 text-center p-0">
                                                        <div class="mid-poart">
                                                            <h5>or</h5>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 text-center p-0">
                                                        <div class="login-btn">
                                                            <span> Login with <a href=""><img src="/assets/images/google.png" /></a> <a href=""><img src="/assets/images/facebook.png" /></a> </span>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-12 text-center mt-3">
                                                        <div class="user-regster">
                                                            Don't have an account?
                                                            <Link to="/register"> Register Here! </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}
