// import React from 'react';
// import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Font.register({ family: 'Calibri', src: '../fonts/calibri-bold.ttf' });

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     flexDirection: 'row',
//     flexWrap: 'wrap', // Allows wrapping to prevent overflow
//     justifyContent: 'space-between',
//   },
//   container: {
//     width: '33%', // Adjust width to fit 3 cards per row
//     borderWidth: 1,
//     borderColor: '#333',
//     padding: 10,
//     // marginBottom: 15,
//     boxSizing: 'border-box',
//     minHeight: 100, // Use minHeight instead of fixed height
//     overflow: 'hidden', // Prevent text from overflowing out of container
//     textOverflow: 'ellipsis',
//   },
//   title: {
//     fontSize: 12,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginBottom: 5,
//     whiteSpace: 'nowrap', // Prevents title from wrapping if too long
//     overflow: 'hidden',
//     textOverflow: 'ellipsis',
// fontFamily: 'Calibri',
//   },
//   row: {
//     flexDirection: 'row',
//     fontSize: 10,
//     // marginBottom: 3,
//     flexWrap: 'wrap', // Allows wrapping for content within each row
    
//   },
//   label: {
//     width: '40%',
//     fontWeight: 'bold',
//   },
//   value: {
//     width: '100%',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis', // Ellipsis if text is too long
//     textAlign: 'center',
//   },
// });

// const AddressCardPDF = ({ selectedRows }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       {selectedRows && selectedRows.length > 0 ? (
//         selectedRows.map((data, index) => (
//           <View key={index} style={styles.container}>
//             <Text style={styles.title}>{data.Member_Name}</Text>
//             <View style={styles.row}>
//               <Text style={styles.value}>{data.occupation}</Text>
//             </View>
            
//             <View style={styles.row}>
//               <Text style={styles.value}>{data.address}</Text>
//             </View>
//           </View>
//         ))
//       ) : (
//         <Text>No rows selected.</Text>
//       )}
//     </Page>
//   </Document>
// );

// export default AddressCardPDF;




import React from 'react';
import { Page, Text, View, Document, StyleSheet,Font} from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows wrapping to prevent overflow
    justifyContent: 'space-between',
  },
  container: {
    // width: '33%', // Adjust width to fit 3 cards per row
    // borderWidth: 1,
    // borderColor: '#333',
    // padding: 10,
    // boxSizing: 'border-box',
    // minHeight: 100, // Use minHeight instead of fixed height
    // overflow: 'hidden', // Prevent text from overflowing out of container
    // textOverflow: 'ellipsis',

    width: '33%', 
    borderWidth: 0.25,
    borderColor: '#333',
    padding: 10,
    boxSizing: 'border-box',
    minHeight: 100, 
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    textAlign: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'extrabold', 
    marginBottom: 5,
    whiteSpace: 'nowrap', 
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // fontFamily: 'Calibri',
    fontStyle: 'bold'
  },
  row: {
    flexDirection: 'row',
    fontSize: 10,
    flexWrap: 'wrap', 
  },
  label: {
    width: '40%',
    fontWeight: 'bold',
  },
  value: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
    textAlign: 'center',
  },
});

const AddressCardPDF = ({ selectedRows }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {selectedRows && selectedRows.length > 0 ? (
        selectedRows.map((data, index) => (
          <View key={index} style={styles.container}>
            <Text style={styles.title}>{data.Member_Name}</Text>
            <View style={styles.row}>
              <Text style={styles.value}>{data.occupation}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.value}>{data.address}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text>No rows selected.</Text>
      )}
    </Page>
  </Document>
);

export default AddressCardPDF;