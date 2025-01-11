import React, { useMemo, useEffect, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { useNavigate } from "react-router-dom";
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
import Login from "./Login";
import axislogo from '../images/A app logo.jpg';




ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const gridRef = useRef();
  const [selectedCells, setSelectedCells] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
      resizable: true,
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

  const groupByID = (cells) => {
    return cells.reduce((acc, cell) => {
      const id = cell.rowData.id;
      if (!acc[id]) {
        acc[id] = { id, fields: {} };
      }
      acc[id].fields[cell.field] = cell.value;
      return acc;
    }, {});
  };

  const navigateToCard = () => {
    if (selectedCells.length > 0) {
      const groupedData = groupByID(selectedCells);
      navigate("/addresscard2", { state: { groupedData } });
    }
  };




  const navigateWithAllSelectedRows = () => {
    const selectedRows = [];
    const displayedRows = gridRef.current.api.getDisplayedRowCount();
  
   
    for (let i = 0; i < displayedRows; i++) {
      const rowNode = gridRef.current.api.getDisplayedRowAtIndex(i);
      if (rowNode.isSelected()) {
        selectedRows.push(rowNode.data);
      }
    }
  
    
    if (selectedRows.length > 0) {
      navigate("/addresscard3", { state: { selectedRows } });
    } else {
      alert("No rows selected.");
    }
  };

  const cellClassRules = {
    "selected-cell": (params) => {
      return selectedCells.some(
        (cell) =>
          cell.rowIndex === params.node.rowIndex &&
          cell.field === params.colDef.field
      );
    },
  };

  const colDefs = useMemo(
    () => [
      // { field: "id", width: 55, cellClassRules, checkboxSelection: true, headerCheckboxSelection: true },
      { field: "family_id", cellClassRules, checkboxSelection: true,headerCheckboxSelection: true },
      { field: "sub_id", cellClassRules, headerName: "Sub Id", width: 55 },
      { field: "Member_Name", cellClassRules , headerName: "Member Name"},
      { field: "Member_Name2", cellClassRules , headerName: "सदस्य का नाम"},
      { field: "sub_caste", cellClassRules , headerName: "Sub Caste"},
      { field: "sub_caste2", cellClassRules , headerName: "उपजाति"},
      { field: "chief_rel", width: 110, cellClassRules , headerName: "Relation"},
      { field: "chief_rel2", width: 110, cellClassRules , headerName: "संबंध"},
      { field: "dob", cellClassRules, headerName: "DOB/जन्म तिथि" },
      { field: "education", cellClassRules, headerName: "Education/शिक्षा" },
      { field: "occupation", cellClassRules , headerName: "Occupation"},
      { field: "occupation2", cellClassRules , headerName: "व्यवसाय"},
      { field: "occup_type", cellClassRules , headerName: "Occupation Type"},
      { field: "marital_status", cellClassRules , headerName: "Marital Status"},
      { field: "marital_status2", cellClassRules , headerName: "वैवाहिक स्थिति"},
      { field: "blood_group", cellClassRules , headerName: "Blood Group/ब्लड ग्रुप"},
      { field: "mobile_no", cellClassRules , headerName: "Mobile No/मोबाइल नंबर"},
      { field: "Living_In_Jabalpur", cellClassRules , headerName: "Living In Jabalpur"},
      { field: "address", width: 600, cellClassRules, headerName: "Address" },
      { field: "address2", width: 600, cellClassRules, headerName: "पता" },
    ],
    [cellClassRules]
  );

  return (
    
    <div className="ag-theme-quartz ag-grid-wrapper custom-ag-grid" style={{ height: 850 }}>
      <img src={axislogo} alt="Axis My India Logo" style={styles.logo} />  
      <AgGridReact
      
        ref={gridRef}
        rowData={data}
        columnDefs={colDefs}
        rowSelection="multiple"
        onCellClicked={onCellClicked}
        animateRows={true}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={20}
        rowHeight={50}
      />
      <button className="custom-button" onClick={navigateToCard}>
        Get The Address Card
      </button>
      <button className="custom-button" onClick={navigateWithAllSelectedRows}>
        Get All Selected Rows
      </button>
      
      <button className="custom-button" onClick={() => navigate('/admin')}>
        Login As Admin
      </button>

      {/* <button className="custom-button" onSubmit={handleVerify}>
        Login As Admin
      </button> */}

    </div>
  );
  
};


const styles = {
  // loginContainer: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     height: '100vh',
  //     background: 'linear-gradient(to bottom,  #fff,#f7f3fa)',
  // },
  // loginForm: {
  //     backgroundColor: '#ffffff',
  //     padding: '40px',
  //     borderRadius: '20px',
  //     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  //     textAlign: 'center',
  //     width: '700px',
  //     height : '500px',
  //     marginTop : '200px',
  //     fontFamily: 'Arial, sans-serif',
  // },
  logo: {
      // width: '70px',
      // marginBottom: '40px',

      width: '70px',
      marginBottom: '20px',
      marginLeft: '45%',
      marginTop: '20px'
  },
  // heading: {
  //     color: '#800080',
  //     fontWeight: 'bold',
  //     marginBottom: '20px',
  // },
  // label: {
  //     display: 'block',
  //     textAlign: 'left',
  //     fontWeight: 'bold',
  //     color: '#800080',
  //     marginBottom: '10px',
  // },
  // input: {
  //     width: '100%',
  //     padding: '10px',
  //     marginTop: '5px',
  //     marginBottom: '20px',
  //     border: '1px solid #d3c3db',
  //     borderRadius: '5px',
  //     fontSize: '16px',
  // },
  // loginButton: {
  //     width: '100%',
  //     padding: '12px',
  //     border: 'none',
  //     borderRadius: '20px',
  //     backgroundColor: '#800080',
  //     color: 'white',
  //     fontSize: '16px',
  //     cursor: 'pointer',
  //     transition: 'background-color 0.3s ease',
  // },
  // createAccount: {
  //     marginTop: '20px',
  //     color: '#800080',
  //     fontWeight: 'bold',
  //     cursor: 'pointer',
  // },
};

export default GridExample;
