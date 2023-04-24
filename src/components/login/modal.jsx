import React from 'react';
import { Modal } from 'react-bootstrap';

export const ModalView = (props) => (
    <>
      <Modal
        show={props.showModal}
        onHide={() => props.setShow(false)}
        dialogClassName="modal-xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title" style={{textAlign: 'center', fontFamily: 'LabradorA'}}>
            <h1>{props.title}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={props.image} width='100%'/>
        </Modal.Body>
      </Modal>
    </>
);