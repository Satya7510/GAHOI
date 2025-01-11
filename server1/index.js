const express=require( 'express');
const mysql=require('mysql') ; 
const cors=require('cors');
const multer = require("multer");
const axios = require('axios');
const bodyParser = require("body-parser");
const { Client } = require("whatsapp-web.js"); 
const path = require("path");
const cookieParser = require('cookie-parser');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.static('build'))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// const upload = multer({ dest: "D:/my_works/React_code/mytable3/client/src/images" });


const port=process.env.PORT||8000;

const db=mysql.createConnection({
    host: "192.168.1.185",
    user:'root',
    password:'axis@123',
    database:'gahoi'
})


db.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err.message);
    } else {
      console.log("connected to Database");
    }
});

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ Message: "Session Expired !! " });
//   } else {
//     jwt.verify(token, "jwt-satya-secret-key", (err, decoded) => {
//       if (err) {
//         return res.json({ Message: "Authentication Error" });
//       } else {
//         req.username = decoded.username;
//         req.displayName = decoded.displayName;
//         next();
//       }    });  }
// };


verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("No token found in cookies");
    return res.json({ Message: "Session Expired !! " });
  }  jwt.verify(token, "jwt-satya-secret-key", (err, decoded) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.json({ Message: "Authentication Error" });
    }
    req.username = decoded.username;
    req.displayName = decoded.displayName;
    next();
  });
};

app.get('/api/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"Success"});
})


app.get('/api/verify', verifyUser, (req, res) => {
  return res.json({ Status: "Success", username: req.username, displayName: req.displayName });
});

async function userData(userid) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM gahoi_login WHERE userId = ?`;
    const values = [userid];
 
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Database Query Error:", error);
        return reject(error);
      }
 
      console.log("Database Query Results:", results);
 
      if (results.length === 0) {
        console.log("No data found for ID:", id);
        return resolve(null);
      }
 
      const { userId, password} = results[0];
      console.log("Extracted Data:", { userId, password});
 
      resolve({ userId, password});
    });
  });
}


app.post('/api/login', async (reqUser, resUser) => {
     
  try {    
      console.log("Request Body:", reqUser.body);       
      const { username, Password } = reqUser.body;

      if (!username || !Password) {
        console.error("Missing username or password in request body");
        return resUser.status(400).json({ Status: "Failed", Message: "Invalid input!" });
      }

      const result = await userData(username);
      
      if (!result) {
        return resUser.json({ Status: "Failed", Message: "Invalid username or password!" });
      }

      const {userId,password}=result;
      console.log(result);
      console.log(userId);
      console.log(Password);
      console.log(" result in index file");
      console.log(password);
      console.log(username);
      if(userId===username && password=== Password){
        console.log("inter into condition");
        const displayName="satya";
        var token = jwt.sign({username,displayName},"jwt-satya-secret-key",{ expiresIn: '1d' });
        console.log("Generated Token:", token);
        resUser.cookie('token', token);
        return resUser.json({Status: "Success"});
      }

       else {
          return resUser.json({ Status: "Failed", Message: "Please check username and password!" });
      }
  } catch (error) {
      console.error('Error:', error);
      return resUser.status(500).json({ Status: "Failed", Message: "Internal Server Error" });
  }
});



app.get('/api/users',(req,res)=>{
    const sql="SELECT * FROM family_record2 order by family_id ASC";
    db.query(sql,(err,data)=>{
        if(err) return res.json(err);
        // console.log(data);
        return res.json(data);

    })     
})


app.get('/api/message_id',(req,res)=>{
  const sql="SELECT * FROM message_table";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })     
})

app.get('/api/wa_id',(req,res)=>{
  const sql="SELECT * FROM wa_table";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })     
})


const SMS_API_URL = "http://www.smsjust.com/sms/user/urlsms.php"; 
const USERNAME = "axisindianew"; 
const PASSWORD = "Axis@123"; 
const SENDER_ID = "AMISRV"; 
const MSG_TYPE = "TXT";




async function messageInfo(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM message_table WHERE id = ?`;
    const values = [id];
 
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Database Query Error:", error);
        return reject(error);
      }
 
      console.log("Database Query Results:", results);
 
      if (results.length === 0) {
        console.log("No data found for ID:", id);
        return resolve(null);
      }
 
      const { Dlt_Entity_Id, dlttempid, message } = results[0];
      console.log("Extracted Data:", { Dlt_Entity_Id, dlttempid, message });
 
      resolve({ Dlt_Entity_Id, dlttempid, message });
    });
  });
}






app.post("/api/send-whatsapp-message", async (req, res) => {
  const { names, phoneNumbers, id } = req.body;
  console.log(phoneNumbers);
  if (!phoneNumbers || phoneNumbers.length === 0) {
    return res.status(400).json({ error: 'Phone numbers are required' });
  }
 
  const url = 'https://api.pinbot.ai/v1/wamessage/sendMessage';
  const key = 'bf18e96a-80cd-11ec-a7c7-9606c7e32d76';
  const headers = { 'content-type': 'application/json', apikey: key };
 
  try {
    const results = []; 
    for (let i = 0; i < phoneNumbers.length; i++) {
      const payload = {
        from: "918828825152",
        to: `91${phoneNumbers[i]}`,
        type: "template",
        message: {
          templateid: `${id}`,
          placeholders: [`${names[i]}`],
        },
      };
 
      const response = await axios.post(url, payload, { headers });
      results.push(response.data); // Only store response data
      console.log(`Response for ${phoneNumbers[i]}:`, response.data);
    }
    
    // Send all results after the loop
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send one or more messages' });
  }
});




app.post('/api/send-sms', async (req, res) => {
  const {phoneNumbers,id} = req.body;
  

  if (!phoneNumbers || phoneNumbers.length === 0) {
    return res.status(400).json({ error: 'Phone numbers are required' });
  }
  try {
    console.log(`here is selected ${id}`)
  // const id = selectedOption.split(":")[1]; 
  const result = await messageInfo(id);
  if (!result) {
    console.log("No data found for the given ID:", id);
    return res.status(404).json({ error: 'No data found for the provided ID' });
  }
  const { Dlt_Entity_Id, dlttempid, message } = result;
 

  console.log("DLT_ENTITY_ID:", {Dlt_Entity_Id});
  console.log("DLT_TEMPLATE_ID:", {dlttempid});
  console.log("Message:", message);

  const encodedMessage = encodeURIComponent(message);

  const results = [];

  
    // Iterate through phone numbers and send SMS
    for (let i=0;i<phoneNumbers.length;i++) {

      
      // const name=names[i];
      const number=phoneNumbers[i];
      const encodedRecipient = encodeURIComponent(number);
      // const personalizedMessage = `Dear ${name}, ${message}`;
      // const encodedMessage = encodeURIComponent(personalizedMessage);
      console.log(message);
      const apiUrl = 
        `${SMS_API_URL}?username=${USERNAME}&pass=${PASSWORD}` +
        `&senderid=${SENDER_ID}&dest_mobileno=${encodedRecipient}` +
        `&msgtype=${MSG_TYPE}&message=${encodedMessage}&response=Y` +
        `&dltentityid=${Dlt_Entity_Id}&dlttempid=${dlttempid}`;

        try {
          // console.log(apiUrl);
          const response = await axios.get(apiUrl);
          results.push({ number, status: "success", response: response.data });
          console.log(`Response for ${number}:`, response.data);
          console.log(result);
        } catch (error) {
          results.push({
            number,
            status: "error",
            error: error.response ? error.response.data : error.encodedMessage,
          });
        }

      // console.log(`Response for ${number}:`, response.data);

      // if (response.status !== 200) {
      //   console.error(`Failed to send SMS to ${number}:`, response.data);
      // }
    }

    res.json({ results });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
});



app.post('/api/insert-row', (req, res) => {
    const newRow = req.body;
  
    // SQL query to insert the new row into your database
    const query = `
      INSERT INTO family_record2 (family_id,sub_id, Member_Name,Member_Name2, sub_caste,sub_caste2, chief_rel,chief_rel2, dob, education, occupation,occupation2, occup_type, marital_status,marital_status2, blood_group, mobile_no, Living_In_Jabalpur, address,address2)
      VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?)
    `;
    const values = [
        newRow.family_id,newRow.sub_id, newRow.Member_Name,newRow.Member_Name2, newRow.sub_caste,newRow.sub_caste2, newRow.chief_rel,newRow.chief_rel2, newRow.dob, newRow.education, newRow.occupation,newRow.occupation2,
      newRow.occup_type, newRow.marital_status,newRow.marital_status2, newRow.blood_group, newRow.mobile_no,newRow.Living_In_Jabalapur,  newRow.address,newRow.address2
    ];
  
    // Execute the query to insert the row
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting row into database:', err);
        return res.status(500).json({ error: 'Error inserting row' });
      }
      console.log('Row inserted successfully');
      res.status(200).json({ message: 'Row inserted successfully' });
    });
  });


  app.post('/api/insert-message', (req, res) => {
    const newRow = req.body;
  
    // SQL query to insert the new row into your database
    const query = `
      INSERT INTO message_table (Dlt_Entity_Id, dlttempid, message, name)
      VALUES ( ?, ?, ?, ?)`;
    const values = [
        newRow.Dlt_Entity_Id,newRow.dlttempid, newRow.message, newRow.name
    ];
  
    // Execute the query to insert the row
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting row into database:', err);
        return res.status(500).json({ error: 'Error inserting row' });
      }
      console.log('Row inserted successfully');
      res.status(200).json({ message: 'Row inserted successfully' });
    });
  });

  app.post("/api/delete", (req, res) => {
    const { ids } = req.body;
  
    if (!ids || ids.length === 0) {
      return res.status(400).json({ error: "No IDs provided for deletion." });
    }
  
    const placeholders = ids.map(() => "?").join(",");
    const sql = `DELETE FROM family_record2 WHERE id IN (${placeholders})`;
  
    db.query(sql, ids, (err, result) => {
      if (err) {
        console.error("Error deleting rows:", err);
        return res.status(500).json({ error: "Failed to delete rows." });
      }
  
      res.json({ success: true, deletedRows: result.affectedRows });
    });
  });

async function updateDatabase(id, field, newValue) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE family_record2 SET ?? = ? WHERE id = ?`;
        const values = [field, newValue, id];

        db.query(query, values, (error, results) => {
            if (error) {
                console.error("Error updating cell:", error);
                return reject(error);
            }
            resolve(results);
        });
    });
}


app.post('/api/update-cell', async (req, res) => {
    const { id, field, newValue } = req.body;

    try {
        const result = await updateDatabase(id, field, newValue);
        res.status(200).json({ message: "Update successful", result });
    } catch (error) {
        console.error("Error updating database:", error);
        res.status(500).json({ error: "Database update failed" });
    }
});


  

app.listen(8000,()=>{
    console.log("Server is running on port 8000");
})