import { Fragment } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const AddressList = ({ fromList, handleListClose, showList, customerAddress, handleSetAddress, shipping_address }) => {
    return (
        <Fragment>
            <Modal className='cstmzed' show={showList} onHide={handleListClose}>
                <Modal.Header closeButton>
                    <Modal.Title> SELECT {fromList.toUpperCase()} ADDRESS </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="modal-body">

                        <div className='address-flow mCustomScrollbar'>
                            {
                                customerAddress && customerAddress.length > 0 && customerAddress.map((item, i) => (
                                    <div className="addres-que customRadio" key={i}>
                                        <input type="radio" name="ship_address" id={`addrs${item.id}`} value={item.id}  onChange={() => handleSetAddress(item, fromList)}  />
                                        <label htmlFor={`addrs${item.id}`}>
                                            <span> {item.name} </span>
                                            {item.email}, {item.mobile_no}
                                            <br />

                                            {item.address_line1}
                                            {item.city} {item.state} {item.post_code}
                                        </label>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleListClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
