//jshint esversion: 8
import React from "react";
import { Button, Modal } from "react-bootstrap";

function ModalPopup(props) {

    const handleClose = () => props.setShow(false);

    return (
    <React.Fragment>
        <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You sure you want to delete user <span className="fw-bold fs-5">{props.name}</span> with email <span className="fw-bold fs-5">{props.email}?</span> Once deleted it cannot be restored.</Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={() => props.deleteUser()}>
                Yes Delete
            </Button>
        </Modal.Footer>
        </Modal>
    </React.Fragment>
    );
}

export default ModalPopup;