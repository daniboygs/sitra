import React from 'react';
import { MDBIcon } from 'mdbreact';
import { ButtonGroup, Button } from 'react-bootstrap';
import { CSVLink } from "react-csv";
import PDF from '../../export/pdf/pdf';
import Excel from '../../export/excel/excel';

export const DownloadButtonGroup = (props) => (

        <div className="downloadButtonGroup" style={{width: '49%'}} >
            <ButtonGroup style={{float: 'right'}}>
                {
                    props.showTable?

                    <>
                        {
                            false?

                            <CSVLink style={{color:'white'}} data={props.filteredData!=''? props.filteredData: props.data} target="_blank" separator={";"}>
                                <Button variant='info' onClick={()=>props.handleProcessBinnacle(2)}><a className="downloadExcelTextBtn">CSV </a><MDBIcon icon="file-csv"  size="2x"/></Button>
                            </CSVLink>
                        :
                            null
                        }

                        <Excel data={props.filteredData!=''? props.filteredData: props.data} callbackProcessBinnacle={props.handleProcessBinnacle} type={2} section={props.section} tooltip={true}/>

                        {
                            false?

                            <PDF table={props.filteredData!=''? props.filteredData: props.data} callbackProcessBinnacle={props.handleProcessBinnacle} type={3} section={props.section} tooltip={true}/>
                        :
                            null
                        }
                    </>
                :
                    props.showPivotTable?
                        <>
                            <Excel table={props.table} callbackProcessBinnacle={props.handleProcessBinnacle} type={1} section={props.section} tooltip={true}/>
                            <PDF table={props.table} callbackProcessBinnacle={props.handleProcessBinnacle} type={1} section={props.section} tooltip={true}/>
                        </>
                :
                    props.showChart?
                        <PDF plot={props.plot} chartValues={props.chartValues} callbackProcessBinnacle={props.handleProcessBinnacle} type={2} section={props.section} tooltip={true}/>
                :
                    null
                }
            </ButtonGroup>
        </div>

);