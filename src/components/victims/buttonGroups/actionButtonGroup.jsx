import React from 'react';
import { MDBIcon } from 'mdbreact';
import { ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

export const ActionButtonGroup = () => (
    <div style={{width: '33%', textAlign: 'center'}} >
        <ButtonGroup style={{margin: '0 auto'}}>
            <>
                <OverlayTrigger
                    placement={'top'}
                    overlay={
                    <Tooltip>
                        <strong>Mover</strong>.
                    </Tooltip>
                    }
                >
                    <button id='buttonSelected' style={{backgroundColor: '#C09F77', color: '#FFFFFF'}}><MDBIcon icon="arrows-alt" size="2x"/></button>
                </OverlayTrigger>{' '}
            </>
            <>
                <OverlayTrigger
                    placement={'top'}
                    overlay={
                    <Tooltip>
                        <strong>Selección</strong>.
                    </Tooltip>
                    }
                >
                        <button id='button' style={{backgroundColor: '#152F4A', color: '#FFFFFF'}}><MDBIcon icon="i-cursor" size="2x"/></button>
                </OverlayTrigger>{' '}
            </>
        </ButtonGroup >
    </div>
    
);