import express from 'express';
import { fileURLToPath } from 'url';

import path from 'path';
import cors from 'cors';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs'
import dotenv from 'dotenv';
// import postModel from './model/PostSchema.js';
import mongoose from 'mongoose';
import data from '../../blog-app-backend/src/model/model/Data.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(data);
dotenv.config();
const app=express();

app.get('/student',async(req,res)=>{
    try{
        const directoryPath = path.join(__dirname, './model');
        
        // Check if the directory exists, if not, create it
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        const csvWriter = createObjectCsvWriter({
            path: path.join(directoryPath,'data.csv'),
            header: [
                { id: 'name', title: 'Name' },
                { id: 'enrolment', title: 'Enrolment' },
                { id: 'age', title: 'Age' },
                { id: 'gender', title: 'Gender' },
                { id: 'sirname', title: 'Sirname' },
                { id: 'class', title: 'Class' },
                { id: 'fatherName', title: 'Father Name' },
                { id: 'address', title: 'Address' },
                { id: 'schoolName', title: 'School Name' },
                { id: 'percentage', title: 'Percentage' },
                { id: 'bloodGroup', title: 'Blood Group' },
                { id: 'hasDisease', title: 'Has Disease' }
            ]

            
        });
         
        await csvWriter.writeRecords(data);
        console.log('Data exported to students.csv successfully!');
        res.send('successfully.')
    }catch(err){
        console.log(err);
    }
});
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`running on port ${process.env.PORT}`)
    }
});



