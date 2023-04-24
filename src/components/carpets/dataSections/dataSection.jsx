import React from 'react';
import Table from './table';
import PivotTable from './pivotTable';
import ChartTable from './chartTable';

export const DataSection = ( props ) => (

    <div className="buttonGroupTable">

        {
            props.showPivotTable?

                <PivotTable 
                    data = { props.data } 
                    show = { props.showPivotTable } 
                    showForm = { props.showForm } 
                    pivotTableValues = { props.pivotTableValues} 
                    handleChangePivotTable = { props.handleChangePivotTable }
                    handleGetPivotTable = { props.handleChangePivotTable } 
                    handlePvtAttrListener = { props.handlePvtAttrListener }
                >
                </PivotTable>
            
            :
                props.showChart?

                <ChartTable 
                    data = { props.data } 
                    show = { props.showChart } 
                    showForm = {  props.showForm } 
                    pivotTableValues = { props.pivotTableValues } 
                    handleChangeChart = { props.handleChangeChart } 
                    rendererChartName = { props.rendererChartName } 
                    handleGetChart = { props.handleGetChart } 
                    handlePvtAttrListener = { props.handlePvtAttrListener }
                ></ChartTable>
            :
                props.showTable?

                <Table 
                    headerBackground = { '#7C8B9E' } 
                    headerColor = { '#FFFFFF' } 
                    data = { props.data } 
                    show = { props.showTable } 
                    showForm = {  props.showForm }
                    selectedRequests = { props.selectedRequests } 
                    handleChangeTable = { props.handleChangeTable } 
                    showGener = { false } 
                    showAge = { false } 
                    showProfession = { false } 
                    showNationality = { false } 
                    showWeapon = { false }
                    showViolent = { false }
                    showStatus = { false }
                />
            :
                null
        }
        
    </div>
    
);