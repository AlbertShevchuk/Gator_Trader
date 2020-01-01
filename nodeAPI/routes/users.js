/**
 * @module
 * this class will be used to handle get and post request for 
 * user related info. 
 */

const express = require('express')
const db = require('../config/db.config.js');


//create router
const router = express.Router()

/**
 * @return
 * 
 */
router.get("/login/:name", (req, res) => {
    const login = req.params.name
    const queryString = "SELECT userName, user_password From user_info WHERE userName = ?"
    db.query(queryString, [login], (err, rows, fields) => {
        if(err){
          console.log("Failed to query for users: " + err)
          res. sendStatus(500)
            return
        }
        res.json(rows)
    })  
})

/**
 * @param
 * @returns
 * this method received a request and gets the user info by 
 * user id and then returns the information in a .json file.
 */
router.get('/user/:userName', (req, res) => {  
    //user id becomes the id number we want to look for 
    const userId = req.params.userName  
    //this code selcts all the user information by user id 
    const queryString = "SELECT * FROM user_info WHERE userName = ?" 
    db.query(queryString, [userId], (err, rows, fields) => {
       if(err) {
          console.log("failed to query for users " + err)
          res.sendStatus(500)
        return
       }
        console.log("everything seems good")
        //this line gets the user first name and last name and then adds it to users constant 
        const users = rows.map((row) => {
            return {first: row.first_Name, last: row.last_Name}
        })
        //this line displays the user first name ans last name
        res.json(rows)
    })
})
/**
 * @method
 * @param
 * it gets the user info and saves it to users table in MySql
 */ 
router.post('/user_create', (req, res) => {
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name
    const studentID = req.body.create_student_id
    const userName = req.body.create_username
    const password = req.body.create_psw
    
    //this line will insert a new user_info with the rows in the parenthesis and then 
    //add the info from the user.
    const queryString = "INSERT INTO user_info (first_Name, last_Name, student_id, userName, user_password) VALUES (?, ?, ?, ?, ?)"
    db.query(queryString, [firstName, lastName, studentID, userName, password], (err, results, fields) => {
        if (err) {
            console.log("failed to insert new user: " + err)
            res.sendStatus(500)
            return
        }
       res.end()
    })    
})


module.exports = router
