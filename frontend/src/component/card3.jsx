// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import '../css/AddressCard3.css';
// import AddressCardPDF from './addressCardPDF'
// import html2canvas from "html2canvas";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { useRef } from 'react';


// const AddressCard3 = () => {
//   const location = useLocation();
//   const { selectedRows } = location.state || {}; 
  
//   const cardRef = useRef();


//   const downloadImage = () => {
//     const card = cardRef.current;
//     html2canvas(card)
//       .then((canvas) => {
//         const dataUrl = canvas.toDataURL("image/png");
//         const link = document.createElement("a");
//         link.download = "card.png";
//         link.href = dataUrl;
//         link.click();
//       })
//       .catch((error) => {
//         console.error("oops, something went wrong!", error);
//       });
//   };

//   return (
//     <div className="address-card-container">
//       {/* <h1>Selected Rows</h1> */}
//       {selectedRows && selectedRows.length > 0 ? (
//         <div className="address-card-grid">
//           {selectedRows.map((data, index) => (
//             <div key={data.id} className="address-card">
//               <p><strong>{data.Member_Name}</strong></p>
//               <p>{data.occupation}</p>
//               <p>{data.occup_type}</p>
//               <p>{data.address}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No rows selected.</p>
//       )}

//       <div className="button-container">
//         <button onClick={downloadImage}>Download as Image</button>
//         <PDFDownloadLink
//           document={<AddressCardPDF selectedRows={selectedRows} />}
//           fileName="candidate_details.pdf"
//         >
//           {({ blob, url, loading, error }) =>
//             loading ? "Loading document..." : "Download as PDF"
//           }
//         </PDFDownloadLink>
//       </div>


//     </div>
//   );
// };

// export default AddressCard3;



import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/AddressCard3.css';
import AddressCardPDF from './addressCardPDF';
import html2canvas from "html2canvas";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRef } from 'react';

const AddressCard3 = () => {
  const location = useLocation();
  const { selectedRows } = location.state || {};
  
  

  // Reference for the entire card grid
  const cardRef = useRef();

  const downloadImage = () => {
    const card = cardRef.current;
    html2canvas(card)
      .then((canvas) => {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = "cards.png"; 
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Oops, something went wrong!", error);
      });
  };

  return (
    <div className="address-card-container">
      {/* Reference the card grid */}
      <div ref={cardRef} className="address-card-grid">
        {selectedRows && selectedRows.length > 0 ? (
          selectedRows.map((data) => (
            <div key={data.id} className="address-card">
              <p><strong>{data.Member_Name}</strong></p>
              <p>{data.occupation}</p>
              <p>{data.occup_type}</p>
              <p>{data.address}</p>
            </div>
          ))
        ) : (
          <p>No rows selected.</p>
        )}
      </div>

      <div className="button-container">
        <button onClick={downloadImage}>Download as Image</button>
        <PDFDownloadLink
          document={<AddressCardPDF selectedRows={selectedRows} />}
          fileName="candidate_details.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download as PDF"
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default AddressCard3;

