import React from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import "../css/style.css"
const CandidateDetails = () => {
// Define styles for the PDF
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//   },
  // button:{
  //   backgroundColor: 'purple',
  //   border: 'none',
  //   colors: 'white',
  //   padding: 15,
  //   borderRadius: 8,
    // textAlign: 'center',
    // margin: 10,
    // alignContent: 'center',
    // display: 'block',
    // textAlign: 'center',
    // color: 'white',
    // textDecoration: 'none',
    // text-align: center,
    // color: white,
    // text-decoration: none,
//     position: 'absolute',
//   },
//   container: {
//     border: '1px solid #000000', // Add border
//     borderRadius: 5, // Add border radius
//     marginTop: 10,
//     inline: 'block',
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 10,
//     padding:5,
//     paddingLeft:5,
//     paddingRight:5,
//   },
//   label: {
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   value: {
//     flex: 1,
//   },
// });

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row', // Change flexDirection to row
//     flexWrap: 'wrap', // Allow flex items to wrap to the next line
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     fontSize: 10,
//   },
//     button:{
//     backgroundColor: 'purple',
//     border: 'none',
//     colors: 'white',
//     padding: 15,
//     borderRadius: 8,
//     // textAlign: 'center',
//     margin: 10,
//     // alignContent: 'center',
//     display: 'block',
//     textAlign: 'center',
//     color: 'white',
//     textDecoration: 'none',
//     // text-align: center,
//     // color: white,
//     // text-decoration: none,
//     position: 'absolute',
//   },
//   container: {
//     width: '45%', // Set width to fit two cards per row with some spacing
//     margin: '2.5%', // Add margin to create space between cards
//     border: '1px solid #000000',
//     borderRadius: 5,
//     padding: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 5,
//     // alignItems: 'center', // Align items vertically in the center
//   },
//   label: {
//     fontWeight: 'bold',
//     marginRight: 5,
//   },
//   value: {
//     flex: 1,
//     wordWrap: 'break-word', // Enable text wrapping
//   },
// });



// Define the CandidateDetailsPDF component for PDF
// const CandidateDetailsPDF = () => (
//   <Document>
//     <Page wrap size="A4" style={styles.page}>
//     {selectedRows.map((row, index) => (
//       <View wrap={false} key={index} style={styles.container}>
//         <View style={styles.row}>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.value}>{row.name}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Occupation:</Text>
//           <Text style={styles.value}>Shopkeeper</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Mobile Number:</Text>
//           <Text style={styles.value}>9131679024</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Address:</Text>
//           <Text style={styles.value}>JB Nagar chakala, Mumbai, Maharashtra</Text>
//         </View>
//       </View>
//       ))}
//     </Page>
//   </Document>
// );


const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  container: {
    borderLeftWidth: 5,
    borderLeftColor: '#990099',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
    color: '#555',
    fontSize: 12,
  },
  value: {
    width: '60%',
    color: '#000',
    fontSize: 12,
  },
});
const location=useLocation();
  const {selectedRows}=location.state;

const CandidateDetailsPDF = ({ selectedRows }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {selectedRows.map((row, index) => (
        <View wrap={false} key={index} style={styles.container}>
          <Text style={styles.title}>Candidate Personal Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Father's / Husband's Name:</Text>
            <Text style={styles.value}>{}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{row.Member_Name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Occupation:</Text>
            <Text style={styles.value}>{row.occupation}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.value}>{row.mobile_no}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{row.address}</Text>
          </View>
        </View>
      ))}
    </Page>
   </Document>
);



  
  // console.log(selectedRows);
 // Define the CandidateDetails component

  return (
  <div >
    {selectedRows.map((row, index) => (
      // <div key={index} className="submain">
      //   <div className="row">
      //     <div className="column">
      //       <p>Name: {row.name}</p>
      //     </div>
      //   </div>
      //   <div className="row">
      //   <div className="column">
      //     <p>Occupation: Shopkeeper</p>
      //   </div>
      //   </div>
      //   <div className="row">
      //   <div className="column">
      //     <p>Mobile Number: 1236547890</p>
      //   </div>
      //   </div>
      //   <div className="row">
      //   <div className="column">
      //     <p>Address: JB Nagar Chakala, Mumbai, Maharastra</p>
      //   </div>
      //   </div>
      // </div>
      
        <div className="card">
            <h2 className="card-title">Candidate Personal Details</h2>
            <div className="card-content">
                <div className="card-item">
                    <strong>Father's / Husband's Name:</strong> LATE RAMA HANSDA
                </div>
                <div className="card-item">
                    <strong>Name:</strong> BAJUN HANSDA
                </div>
                <div className="card-item">
                    <strong>Address:</strong> At-Sunaposi, PO-Tadki, PS-Chandua, Dist-Mayurbhanj
                </div>
                <div className="card-item">
                    <strong>Gender:</strong> male
                </div>
                <div className="card-item">
                    <strong>Age:</strong> 36
                </div>
            </div>
        </div>


    ))}
    <PDFDownloadLink style={styles.button} document={<CandidateDetailsPDF selectedRows={selectedRows} />} fileName="candidate_details.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download Card')}
    </PDFDownloadLink>
  </div>
  );
};

export default CandidateDetails;
