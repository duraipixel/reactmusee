import React from "react";

const AddAddress = () => {
  return (
    <div
      className="modal fade"
      id="addressModal"
      tabIndex="-1"
      aria-labelledby="addressModal"
      aria-hidden="true"
    >
      <div className="modal-dialog cstmzed">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addressModal">
              Add a New Shipping Address
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <h4>Contact Details</h4>
              <div className="row">
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Mobile Number"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Telephone Number"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <select
                    className="form-control"
                    id="enq"
                    name="enq"
                    placeholder="Telephone Number"
                  >
                    <option value="">Address Type</option>
                    <option value="office">Office</option>
                    <option value="Home">Home</option>
                  </select>
                </div>
              </div>
              <h4>Address</h4>
              <div className="row">
                <div className="mb-3 col-lg-12">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Building Number, Street Name & Locality"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="City"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Pincode"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <select
                    className="form-control"
                    id="enq"
                    name="enq"
                    placeholder="Telephone Number"
                  >
                    <option value="">SelectState</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Dadar and Nagar Haveli">
                      Dadar and Nagar Haveli
                    </option>
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
          <div className="modal-footer text-center">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
