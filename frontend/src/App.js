import React,{useCallback, useEffect,useMemo,useRef,useState,StrictMode} from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import 'ag-grid-enterprise'
import { createRoot } from "react-dom/client";
import { ClientSideRowModelModule } from "ag-grid-community";
import { ModuleRegistry } from "ag-grid-community";
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import GridExample from "./component/grid1";
import GridExample2 from "./component/gridadmin";
import BasicCard from "./component/card";
import CardComponent from "./component/card2";
import CardComponent2 from "./component/card3";
import Login from "./component/Login";
import MessageGrid from "./component/MessageGrid";

ModuleRegistry.registerModules([ClientSideRowModelModule]);




function App(){

  const selectedRows = [
    {
      name: 'BAJUN HANSDA',
      // Add other relevant data here
    },
    // Add more rows if necessary
  ];

  // const gridRef=useRef();


  // const [data,setData]=useState([])
  // useEffect(()=>{
  //     fetch('/api/users')
  //     .then(res => res.json())
  //     .then((data)=>setData(data))
  //     .catch((err) => console.error(err));
  // },[])


  // const [colDefs, setColDefs] = useState([
  //   { field: "Issue_Id"},
  //   { field: "department" },
  //   { field: "issue"},
  //   { field: "name"},
  //   { field: "cur_date"},
  //   { field: "emp_id"},
  //   { field: "dept_name"},
  //   { field: "resolve_date"},
  //   { field: "remark"}
  // ]);


  // const defaultColDef=useMemo(()=>({
  //     sortable:true,
  //     filter:true,
  //     flex: 1,
  //     minWidth: 180,
  //     filter: true,
  //     floatingFilter: true,
  // }),[]);


  // const cellClickedListner=useCallback(e=>{
  //     console.log('cellClicked',e)
  // })

  // const pushMecLicked=useCallback(e=>{
  //   gridRef.current.api.desellectAll();
  // })

  //  return (
  //  <div className="ag-theme-quartz" style={{ height: 500 }}>
  //    <button onClick={pushMecLicked}>Push Me</button>
  //   <AgGridReact
  //           ref={gridRef}
  //           rowData={data}
  //           columnDefs={colDefs}
  //           onCellClicked={cellClickedListner}
  //           rowSelection="multiple"
  //           animateRows={true}
  //           defaultColDef={defaultColDef}
  //       />

  //  </div>
  // )

  
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<GridExample />} />
      <Route path='/admin' element={<Login />} />
      <Route path='/gridadmin' element={<GridExample2 />} />
       <Route path='/addresscard' element={<BasicCard />} />
       <Route path='/addresscard2' element={<CardComponent />} />
       <Route path='/addresscard3' element={<CardComponent2 />} />
       <Route path='/messagetable' element={<MessageGrid />} />
     </Routes>
    </BrowserRouter>
  );

  

}

export default App;