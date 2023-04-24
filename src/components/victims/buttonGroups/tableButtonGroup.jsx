import React from 'react';
import { Alert } from 'react-bootstrap';
import { DataButtonGroup } from './dataButtonGroup';
import { ActionButtonGroup } from './actionButtonGroup';
import { DownloadButtonGroup } from './downloadButtonGroup';
import './style/style.css';

export const TableButtonGroup = ( props ) => (
    <div>

        <div className="tableButtonGroup">

            <DataButtonGroup 
                selected = { {color: '#FFFFFF', backgroundColor: '#C09F77'} }
                nonSelected = { {color: '#FFFFFF', backgroundColor: '#152F4A'} }
                showPivotTable = { props.showPivotTable } 
                showTable = { props.showTable } 
                showChart = { props.showChart } 
                handleShowPivotTable = { props.handleShowPivotTable } 
                handleShowTable = { props.handleShowTable } 
                handleShowChart = { props.handleShowChart }
            >
            </DataButtonGroup>

            {/*
            <ActionButtonGroup>
            </ActionButtonGroup>
            */}

            <DownloadButtonGroup
                section = { props.section }
                data = { props.data }
                filteredData = { props.filteredData }
                chartValues = { props.chartValues }
                table = { props.table }
                plot = { props.plot }
                showPivotTable = { props.showPivotTable } 
                showTable = { props.showTable } 
                showChart = { props.showChart }
                handleProcessBinnacle = { props.handleProcessBinnacle }
            >
            </DownloadButtonGroup>
        </div>

        <br/>
        
        {
        props.showOutdatedTableAlert?
        <div>
        <hr/>
            <Alert variant="warning">
            <strong>{props.showChart? 'Gráfica': 'Tabla'} desactualizada!</strong>, Procese nuevamente su consulta.
            </Alert>
        </div>
        :
        null
        }

        {
        props.showProcessingDataAlert?
        <div>
        <hr/>
            <Alert variant="info">
            <strong>Procesando datos!</strong>, Espere mientras se está procesando la información de los datos.
            </Alert>
        </div>
        :
            null
        } 
        
    </div>
    
);