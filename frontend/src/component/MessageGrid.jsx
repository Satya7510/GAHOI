import React, { useMemo, useEffect, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { useNavigate } from "react-router-dom";

import 'reactjs-popup/dist/index.css';

import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  ModuleRegistry,
  RowSelectionOptions,
  createGrid,
} from "@ag-grid-community/core";
import "../css/style.css";


ModuleRegistry.registerModules([ClientSideRowModelModule]);

const MessageGrid = () => {
  const gridRef = useRef();
  
  const [data, setData] = useState([]);
  const [gridHeight, setGridHeight] = useState(850);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [formData, setFormData] = useState(null);


  


  let gridApi = null;

  const [inputRow, setInputRow] = useState({
    // id: 'Id',
    Dlt_Entity_Id:'Entity Id',
    Dlt_Header_Id:'DLT Templete Id',
    message:'Message',
    name:'Name',
    
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/message_id")
      .then((res) => res.json())
      .then((data) =>{ 
        setData(data);
        
      })
      .catch((err) => console.error(err));
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
      editable: true,
    }),
    []
  );

  const onCellClicked = (event) => {
    const clickedCellData = {
      field: event.colDef.field,
      rowIndex: event.rowIndex,
      value: event.value,
      rowData: event.data,
    };

    setSelectedCells((prev) => {
      const isAlreadySelected = prev.some(
        (cell) =>
          cell.rowIndex === clickedCellData.rowIndex &&
          cell.field === clickedCellData.field
      );

      if (isAlreadySelected) {
        // If already selected, remove it from the selection
        return prev.filter(
          (cell) =>
            !(
              cell.rowIndex === clickedCellData.rowIndex &&
              cell.field === clickedCellData.field
            )
        );
      } else {
        // If not selected, add it to the selection
        return [...prev, clickedCellData];
      }
    });
  };

  const cellClassRules = {
    'selected-cell': (params) => {
      return selectedCells.some(
        (cell) =>
          cell.rowIndex === params.node.rowIndex &&
          cell.field === params.colDef.field
      );
    },
    'placeholder-cell': (params) => {
      return params.node.rowPinned === 'top' && params.value && params.value === colDefs.find(col => col.field === params.colDef.field).headerName;
    },
  };
  
  const colDefs = useMemo(
    () => [
      
      { field: "Dlt_Entity_Id",cellClassRules, headerName: "Entity Id", width: 300,valueFormatter: (params) => {
        
        return isNaN(params.value) ? params.value : params.value;
      },  },
      { field: "Dlt_Header_Id" , headerName: "DLT Templete Id",width: 300,cellClassRules},
      { field: "message" , headerName: "Message",width: 800,cellClassRules},
      { field: "name", width: 110 , headerName: "Name",width: 300,cellClassRules},
      
    ],
    [cellClassRules]
  );

  const setInputRowData = (newData) => {
    setInputRow(newData);
    gridRef.current.api.setPinnedTopRowData([newData]);
  };

  const handleRowSelection = () => {
    const selected = gridApi.getSelectedRows();
    setSelectedRows(selected);
  };




  const requiredFields = ["Dlt_Entity_Id","Dlt_Header_Id","message","name"];
  const isPinnedRowCompleted = () => {
  return requiredFields.every((field) => inputRow[field] !== '');
};

const onCellEditingStopped = async (params) => {
  if (params.rowPinned === 'top') {
    // Update the inputRow state
    const updatedRow = { ...inputRow, [params.colDef.field]: params.value };
    setInputRow(updatedRow);

    // Check if all required fields are filled and valid
    const requiredFields = ["Dlt_Entity_Id", "Dlt_Header_Id", "message","name"];
    const isCompleted = requiredFields.every(
      (field) => updatedRow[field] && updatedRow[field] !== "Entity Id" && updatedRow[field] !== "DLT Templete Id" && updatedRow[field] !== "Message" && updatedRow[field] !== "Name"
    );

    if (isCompleted) {
      try {
        const response = await fetch('/api/insert-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });

        if (response.ok) {
          console.log('Row inserted successfully');

          // Add the new row to the grid and reset the pinned row
          setData((prevData) => [...prevData, updatedRow]);
          resetPinnedRow();
        } else {
          console.error('Failed to insert row into database');
        }
      } catch (error) {
        console.error('Error inserting row:', error);
      }
    } else {
      console.log('Row is not yet complete.');
    }
  }
};

const resetPinnedRow = () => {
  const resetRow = {
    Dlt_Entity_Id: 'Entity id',
    Dlt_Header_Id: 'DLt Header Id',
    message: 'Message',
    name: 'Name',
  };

  setInputRow(resetRow);
  gridRef.current.api.setPinnedTopRowData([resetRow]);
};

return (
  
  <div  className="ag-theme-quartz ag-grid-wrapper custom-ag-grid" style={{ height: 850 }}>
    <AgGridReact
  ref={gridRef}
  rowData={data}
  columnDefs={colDefs}
  pinnedTopRowData={[inputRow]}
  defaultColDef={defaultColDef}
  pagination={true}
  paginationPageSize={20}
  rowHeight={50}
  rowSelection="multiple"
//   onCellClicked={onCellClicked}
  onCellEditingStopped={onCellEditingStopped}
//   onCellValueChanged={onCellValueChanged}
  
  animateRows={true}
/>

  </div>
  
);
};

export default MessageGrid;