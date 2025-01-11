import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  container: {
    width: '45%', // Adjust this width as per your preference
    borderLeftWidth: 5,
    borderLeftColor: '#990099',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    borderStyle: 'solid',
    backgroundColor: '#FAF9F6',
    float: 'left', // Make the cards float beside each other
    marginRight: '5%', // Add some margin between cards
    boxSizing: 'border-box', // Include padding and border in the width
  },
  title: {
    fontSize: 14,
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

const CandidateDetailsPDF = ({ groupedData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {groupedData && Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((id) => (
          <View wrap={false} key={id} style={styles.container}>
            {/* <Text style={styles.title}>Candidate Personal Details (ID: {id})</Text> */}

            {/* Iterate over each field and display label-value pairs */}
            {groupedData[id].fields &&
              Object.keys(groupedData[id].fields).map((field) => (
                <View style={styles.row} key={field}>
                  <Text style={styles.label}>{field.replace(/_/g, ' ')}:</Text>
                  <Text style={styles.value}>{groupedData[id].fields[field]}</Text>
                </View>
              ))}
          </View>
        ))
      ) : (
        <Text>No data to display</Text>
      )}
    </Page>
  </Document>
);

export default CandidateDetailsPDF;
