import React, { useMemo, useEffect, useRef, useState } from "react";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { useNavigate } from "react-router-dom";
import PopupForm from "./Popform";
import PopupForm2 from "./Popform2";
import 'reactjs-popup/dist/index.css';
import MessageGrid from "./MessageGrid";
import axios from 'axios';

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

const GridExample2 = () => {
  const gridRef = useRef();
  const [selectedCells, setSelectedCells] = useState([]);
  const [data, setData] = useState([]);
  const [gridHeight, setGridHeight] = useState(850);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formData2, setFormData2] = useState(null);


  const togglePopup = () => setShowPopup(!showPopup);

  const togglePopup2 = () => setShowPopup2(!showPopup2);


  let gridApi = null;

  const [inputRow, setInputRow] = useState({
    // id: '',
    family_id: 'Add Family Id...',
    sub_id: 'Add Sub Id...',
    Member_Name: 'Add Member Name...',
    Member_Name2: 'सदस्य का नाम लिखे...',
    sub_caste: 'Add Sub Caste...',
    sub_caste2: 'उपजाति लिखे...',
    chief_rel: 'Add Relation...',
    chief_rel2: 'संबंध लिखे...',
    dob: 'Add DOB...',
    education: 'Add Education...',
    occupation: 'Add Occupation...',
    occupation2: 'व्यवसाय लिखे...',
    occup_type: 'Add Occupation Type...',
    marital_status: 'Add Marital Status...',
    marital_status2: 'वैवाहिक स्थिति लिखे...',
    blood_group: 'Add Blood Group...',
    mobile_no: 'Add Mobile No...',
    Living_In_Jabalpur: 'Living in Jabalpur...',
    address: 'Add Address...',
    address2: 'पता लिखे...',
  });

  const navigate = useNavigate();


  // useEffect(()=>{
  //   axios.get("/api/verify")
  //         .then(res=>{
  //           console.log(res.data);
  //           if(res.data.Status!=='Success'){
  //             navigate('/admin');
  //           }
  //           else{
  //             navigate('/gridadmin');
  //           }
  //         })
  //         .catch(err=>{
  //           console.log(err);
  //         });
  // },[]);


  useEffect(() => {
    let isMounted = true;   
    axios.get("/api/verify", { withCredentials: true })
          .then(res => {
    console.log(res.data);
    if (res.data.Status !== 'Success') {
      navigate('/admin'); 
    } else {
      navigate('/gridadmin'); 
    }  
  })  
  .catch(err => {
    console.log(err);
    navigate('/admin'); 
  });
    return () => { isMounted = false }; 
  }, []);


  useEffect(() => {
    fetch("/api/users")
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

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent form submission from reloading the page
  //   console.log(data);
    
  //   closePopup(); // Close popup after submission
  // };

  const onCellValueChanged = async (params) => {
    console.log(params);
    const updatedData = {
      id: params.data.id,           
      field: params.colDef.field,    
      newValue: params.value         
    };
    console.log(updatedData);
    try {
      // Call the backend API to update the database
      const response = await fetch("/api/update-cell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        console.log("Cell updated successfully");
      } else {
        console.error("Failed to update cell");
      }
    } catch (error) {
      console.error("Error updating cell:", error);
    }
  // }
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

  

  // const cellClassRules = {
  //   'selected-cell': (params) => {
  //     return selectedCells.some(
  //       (cell) =>
  //         cell.rowIndex === params.node.rowIndex &&
  //         cell.field === params.colDef.field
  //     );
  //   },
  //   'placeholder-cell': (params) => {
  //     console.log("Row Pinned:", params.node.rowPinned, "Value:", params.value, "Header Name:", colDefs.find(col => col.field === params.colDef.field).headerName);
  //     return params.node.rowPinned === 'top' && params.value && params.value === colDefs.find(col => col.field === params.colDef.field).headerName;
  //   },
  // };


  const cellClassRules = {
    // Style for selected cells
    'selected-cell': (params) => {
      return selectedCells.some(
        (cell) =>
          cell.rowIndex === params.node.rowIndex &&
          cell.field === params.colDef.field
      );
    },
  
    // Style for placeholder cells in the pinned row
    'placeholder-cell': (params) => {
      console.log(
        "Row Pinned:",
        params.node.rowPinned,
        "Value:",
        params.value,
        "Header Name:",
        colDefs.find((col) => col.field === params.colDef.field).headerName
      );
      return (
        params.node.rowPinned === 'top' && // Ensure the row is pinned at the top
        params.value && // Ensure there is a value
        params.value === colDefs.find((col) => col.field === params.colDef.field).headerName // Check if the value matches the header name
      );
    },
  
    // Style for pinned rows
    'pinned-row': (params) => {
      return params.node.rowPinned === 'top'; // Apply the style to all pinned rows
    },
  
    // Style for normal rows
    'normal-row': (params) => {
      return params.node.rowPinned === undefined; // Apply the style to all non-pinned rows
    },
  };
  
  


  const colDefs = useMemo(
    () => [
      
      { field: "family_id",headerName: "Family Id",checkboxSelection:true, cellClassRules, valueFormatter: (params) => {
        
        return isNaN(params.value) ? params.value : params.value;
      }, },
      { field: "sub_id", cellClassRules, headerName: "Sub Id", width: 55,valueFormatter: (params) => {
        
        return isNaN(params.value) ? params.value : params.value;
      },  },
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
      { field: "Living_In_Jabalpur", cellClassRules , headerName: "Living in Jabalpur"},
      { field: "address", width: 600, cellClassRules, headerName: "Address" },
      { field: "address2", width: 600, cellClassRules, headerName: "पता" },
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


  const handleLogout=(e)=>{
        
        e.preventDefault();
        console.log('button clicked');
        axios.get('api/logout')
              .then(res=>{
                if(res.data.Status==="Success"){
                  navigate('/');
                }
                else{
                  alert(res.data.message)
                }
              })
              .catch((error)=>{
                alert(error.message);
                window.location.reload();
              })
  }

  const handleSendMessage = async (id) => {
    
    const url = 'https://api.pinbot.ai/v1/wamessage/sendMessage'
    const key = 'bf18e96a-80cd-11ec-a7c7-9606c7e32d76'

    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const names=selectedData.map((row) => row.Member_Name);
    const phoneNumbers = selectedData.map((row) => row.mobile_no);

    console.log("here is ${names}"+phoneNumbers)
    setFormData2(id);
    setShowPopup2(false);

    if(phoneNumbers.length===0){
        alert('No Row Selcted')
        return
    }

    try{
      const response=await fetch('/api/send-whatsapp-message',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({names,phoneNumbers,id}),
      });

        if(response.ok){
            alert('Message sent Successfully'+phoneNumbers);
        }
        else{
          alert('Failed to send sms');
        }

    }catch(error){
      console.error('Error sending sms',error);
    }
  };


  const handleSendSMS = async (id) => {

    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const names=selectedData.map((row) => row.Member_Name);
    const phoneNumbers = selectedData.map((row) => row.mobile_no);
    setFormData(id);
    setShowPopup(false);

    console.log(selectedNodes);
    console.log(names);
    console.log(phoneNumbers);
    // const idd=formData.selectedOption;

    if (phoneNumbers.length === 0) {
      alert('No rows selected.');
      return;
    }
  
    try {
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({names,phoneNumbers,id}),
      });
  
      if (response.ok) {
        alert('SMS sent successfully!'+phoneNumbers);
      } else {
        alert('Failed to send SMS.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
    
  };



  const deleteSelectedRows = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
  
    if (selectedData.length === 0) {
      alert("No rows selected for deletion.");
      return;
    }
    const idsToDelete = selectedData.map((row) => row.id);
  
    // Call API to delete rows
    fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: idsToDelete }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Rows deleted successfully.");
          // Refresh grid data after deletion
          setData((prevData) =>
            prevData.filter((row) => !idsToDelete.includes(row.id))
          );
        } else {
          alert("Failed to delete rows.");
        }
      })
      .catch((err) => console.error("Error deleting rows:", err));
  };



  const requiredFields = ["family_id","sub_id","Member_Name","address"];
  const isPinnedRowCompleted = () => {
  return requiredFields.every((field) => inputRow[field] !== '');


  


};





const onCellEditingStopped = async (params) => {
  if (params.rowPinned === 'top') {
    // Update the inputRow state
    const updatedRow = { ...inputRow, [params.colDef.field]: params.value };
    setInputRow(updatedRow);

    // Check if all required fields are filled and valid
    const requiredFields = ["family_id", "sub_id", "Member_Name", "address"];
    const isCompleted = requiredFields.every(
      (field) => updatedRow[field] && updatedRow[field] !== "Add Family Id..." && updatedRow[field] !== "Add Member Number..." && updatedRow[field] !== "Add Member Name..." && updatedRow[field] !== "Add Blood Group..." && updatedRow[field] !== "Add Sub Caste..." && updatedRow[field] !== "Add Relation..." && updatedRow[field] !== "Add DOB..."  && updatedRow[field] !== "Add Education..." && updatedRow[field] !== "Add Occupation..." && updatedRow[field] !== "Add Occupation Type..." && updatedRow[field] !== "Add Marital Status..." && updatedRow[field] !== "Add Mobile No..." && updatedRow[field] !== "Add Address..."&& updatedRow[field] !== "पता लिखे..."
    );

    if (isCompleted) {
      try {
        const response = await fetch('/api/insert-row', {
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
    

    family_id: 'Add Family Id...',
    sub_id: 'Add Sub Id...',
    Member_Name: 'Add Member Name...',
    Member_Name2: 'सदस्य का नाम लिखे...',
    sub_caste: 'Add Sub Caste...',
    sub_caste2: 'उपजाति लिखे...',
    chief_rel: 'Add Relation...',
    chief_rel2: 'संबंध लिखे...',
    dob: 'Add DOB...',
    education: 'Add Education...',
    occupation: 'Add Occupation...',
    occupation2: 'व्यवसाय लिखे...',
    occup_type: 'Add Occupation Type...',
    marital_status: 'Add Marital Status...',
    marital_status2: 'वैवाहिक स्थिति लिखे...',
    blood_group: 'Add Blood Group...',
    mobile_no: 'Add Mobile No...',
    Living_In_Jabalpur: 'Living in Jabalpur...',
    address: 'Add Address...',
    address2: 'पता लिखे...',

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
  onCellClicked={onCellClicked}
  onCellEditingStopped={onCellEditingStopped}
  onCellValueChanged={onCellValueChanged}
  
  animateRows={true}
/>

  <button className="custom-button" onClick={togglePopup2}>
        Send WhatsApp Message
        {showPopup2 && <PopupForm2 closePopup={togglePopup2} onSubmit={handleSendMessage} />}
  </button>




  <button className="custom-button"  onClick={togglePopup}>
        Send SMS
        {showPopup && <PopupForm closePopup={togglePopup} onSubmit={handleSendSMS} />}
   </button>
  
  
  <button className="custom-button"  onClick={navigateToCard}>
      Get The Address Card
    </button>
    <button className="custom-button" onClick={navigateWithAllSelectedRows}>
    Get Address Sticker
    </button>
    <button className="custom-button" onClick={deleteSelectedRows}>
      Delete Selected Rows
    </button>
    <button className="custom-button" onClick={deleteSelectedRows}>
      Delete Selected Rows
    </button>
    {/* <button className="custom-button" onClick={() => navigate('/messagetable')}>
        Message Table
      </button> */}
      <button className="custom-button" onClick={handleLogout}>
        Logout
      </button>
  </div>
  
);
};

export default GridExample2;