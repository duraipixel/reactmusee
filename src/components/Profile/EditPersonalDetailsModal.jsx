import React from "react";

const EditPersonalDetailsModal = () => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog cstmzed">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit your Personal details
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
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Kabir"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder="Oberoi"
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder=" kabir.o_6396@gmail.com "
                  />
                </div>
                <div className="mb-3 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    placeholder=" +91 12345 12345"
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

export default EditPersonalDetailsModal;
