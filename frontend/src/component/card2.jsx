// import React, { useRef } from "react";
// import "../css/style.css";
// import html2canvas from "html2canvas";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { useLocation } from "react-router-dom";
// import CandidateDetailsPDF from "./CandidateDetailsPDF";

// const CardComponent = () => {
//   const location = useLocation();
//   const { groupedData } = location.state; // Ensure groupedData is passed correctly

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

//   // Ensure groupedData is an object, and use Object.keys to iterate over it
//   return (
//     <div>
//       {/* Loop over the keys of the groupedData object, which are the IDs */}
//       {groupedData && Object.keys(groupedData).length > 0 ? (
//         Object.keys(groupedData).map((id) => (
//           <div key={id} id="card" className="card" ref={cardRef}>
//             {/* <h2 className="card-title">Candidate ID: {id}</h2> */}
//             <div className="card-content">
//               {/* Loop over the fields of each grouped ID */}
//               {groupedData[id].fields &&
//                 Object.keys(groupedData[id].fields).map((field) => (
//                   <div className="card-item" key={field}>
//                     <div className="card-label">
//                       <strong>{field.replace(/_/g, " ")}:</strong>
//                     </div>
//                     <div className="card-value">
//                       {groupedData[id].fields[field]}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No data to display</p> // Handle empty or undefined groupedData
//       )}

//       <div className="button-container">
//         <button onClick={downloadImage}>Download as Image</button>
//         <PDFDownloadLink
//           document={<CandidateDetailsPDF groupedData={groupedData} />} // <-- Corrected prop name
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

// export default CardComponent;




import React, { useRef } from "react";
import "../css/style.css";
import html2canvas from "html2canvas";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
import CandidateDetailsPDF from "./CandidateDetailsPDF";
import JSZip from "jszip";
import FileSaver from "file-saver";

const CardComponent = () => {
  const location = useLocation();
  const { groupedData } = location.state;

  const cardRefs = useRef([]);

  const downloadImages = () => {
    const zip = new JSZip();
    const imagePromises = cardRefs.current.map((card, index) => {
      if (card) {
        return html2canvas(card).then((canvas) => {
          const dataUrl = canvas.toDataURL("image/png");
          const imgData = dataUrl.split(",")[1]; // Get the base64 string
          zip.file(`card_${index + 1}.png`, imgData, { base64: true });
        });
      }
      return Promise.resolve();
    });

    Promise.all(imagePromises)
      .then(() => {
        return zip.generateAsync({ type: "blob" });
      })
      .then((blob) => {
        FileSaver.saveAs(blob, "cards.zip");
      })
      .catch((error) => {
        console.error("Oops, something went wrong!", error);
      });
  };

  return (
    <div>
      {groupedData && Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((id, index) => (
          <div
            key={id}
            id="card"
            className="card"
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="card-content">
              {groupedData[id].fields &&
                Object.keys(groupedData[id].fields).map((field) => (
                  <div className="card-item" key={field}>
                    <div className="card-label">
                      <strong>{field.replace(/_/g, " ")}:</strong>
                    </div>
                    <div className="card-value">
                      {groupedData[id].fields[field]}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      ) : (
        <p>No data to display</p>
      )}

      <div className="button-container">
        <button onClick={downloadImages}>Download All as ZIP</button>
        <PDFDownloadLink
          document={<CandidateDetailsPDF groupedData={groupedData} />}
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

export default CardComponent;

