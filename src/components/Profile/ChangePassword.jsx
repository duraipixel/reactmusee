import React from "react";

const ChangePassword = () => {
  return (
    <div
      className="modal fade"
      id="passwordModal"
      tabIndex="-1"
      aria-labelledby="passwordModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog cstmzed">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="passwordModalLabel">
              Change Password
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
              <div className="row">
                <div className="mb-3 col-lg-12">
                  <input
                    type="password"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Current password"
                  />
                </div>
                <div className="mb-3 col-lg-12">
                  <input
                    type="password"
                    className="form-control"
                    id="recipient-name"
                    placeholder="New password"
                  />
                </div>
                <div className="mb-3 col-lg-12" >
                <input
                  type="password"
                  className="form-control"
                  id="recipient-name"
                  placeholder="Re-type New password"
                />
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

export default ChangePassword;
