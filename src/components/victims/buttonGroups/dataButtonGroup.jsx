import React from 'react';
import { MDBIcon } from 'mdbreact';
import { ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

export const DataButtonGroup = (props) => (

        <div className="dataButtonGroup" style={{width: '49%'}} >
            <ButtonGroup >
                {
                    props.showPivotTable?

                    <>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                            <Tooltip>
                                <strong>Tabla dinamica</strong>.
                            </Tooltip>
                            }
                        >
                            <button id='buttonSelected' style={{color: props.selected.color, backgroundColor: props.selected.backgroundColor}} onClick={()=>props.handleShowPivotTable()}><MDBIcon far icon="hand-paper" size="2x"/></button>
                        </OverlayTrigger>{' '}
                    </>
                :
                    <>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                            <Tooltip>
                                <strong>Tabla dinamica</strong>.
                            </Tooltip>
                            }
                        >
                            <button id='button' style={{color: props.nonSelected.color, backgroundColor: props.nonSelected.backgroundColor}} onClick={()=>props.handleShowPivotTable()}><MDBIcon far icon="hand-paper" size="2x"/></button>
                        </OverlayTrigger>{' '}
                    </>
                }

                {
                    props.showTable?

                    <>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                            <Tooltip>
                                <strong>Desgloce</strong>.
                            </Tooltip>
                            }
                        >
                            <button id='buttonSelected' style={{color: props.selected.color, backgroundColor: props.selected.backgroundColor}} onClick={()=>props.handleShowTable()}><MDBIcon icon="table" size="2x"/></button>
                        </OverlayTrigger>{' '}
                    </>
                    
                :
                    <>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                            <Tooltip>
                                <strong>Desgloce</strong>.
                            </Tooltip>
                            }
                        >
                            <button id='button' style={{color: props.nonSelected.color, backgroundColor: props.nonSelected.backgroundColor}} onClick={()=>props.handleShowTable()}><MDBIcon icon="table" size="2x"/></button>
                        </OverlayTrigger>{' '}
                    </>
                }

                {
                    props.showChart?

                    <>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                            <Tooltip>
                                <strong>Gráfica dinamica</strong>.
                            </Tooltip>
                            }
                        >
                            <button id='buttonSelected' style={{color: props.selected.color, backgroundColor: props.selected.backgroundColor}} onClick={()=>props.handleShowChart()}><MDBIcon far icon="chart-bar" size="2x"/></button>
                        </OverlayTrigger>{' '}
                    </>
                :
                    <>
                        <OverlayTrigger
                            placement={'top'}
                            overlay={
                            <Tooltip>
                                <strong>Gráfica dinamica</strong>.
                            </Tooltip>
                            }
                        >
                            <button id='button' style={{color: props.nonSelected.color, backgroundColor: props.nonSelected.backgroundColor}} onClick={()=>props.handleShowChart()}><MDBIcon far icon="chart-bar" size="2x"/></button>
                        </OverlayTrigger>{' '}
                    </>
                }
            </ButtonGroup>
        </div>

);