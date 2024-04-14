import express from 'express'; 
import { eczemaReport } from '../models/eczemaReportModel.js';

const router = express.Router();


//Get All Eczema Reports //Route
router.get('/', async (req, res) => {
  try {
    const reports = await eczemaReport.find({});
    return res.status(200).json({
      count: reports.length, 
      data: reports
    });
  } catch (err) {
    console.log(err.message);
    return res.status(404).send({message: err.message});
  }
})

//Create a new report
router.post('/', async(req, res) => {
  try {
    if(!req.body.itchySpots || !req.body.date || !req.body.sleepDisruptions || !req.body.possibleTriggers) {
      return res.status(400).send("Send all Required Fields");
    }
    const newReport = {
      itchySpots: req.body.itchySpots,
      date: req.body.date, 
      sleepDisruptions: req.body.sleepDisruptions, 
      possibleTriggers: req.body.possibleTriggers
    }
    const report = await eczemaReport.create(newReport); 
    res.status(201).send("Successfully Created New Report!");
  } catch(err) {
    console.log(err.message); 
    return res.status(500).send({message: err.message});
  }
})

//Edit a current report 
router.put("/:id", async (req, res) => {
  try {
    if(!req.body.itchySpots || !req.body.date || !req.body.sleepDisruptions || !req.body.possibleTriggers) {
      return res.status(400).send("Send all Required Fields");
    }
    const newReport = {
      itchySpots: req.body.itchySpots,
      date: req.body.date, 
      sleepDisruptions: req.body.sleepDisruptions, 
      possibleTriggers: req.body.possibleTriggers
    }
    const {id} = req.params;
    const report = await eczemaReport.findByIdAndUpdate(id, newReport); 
    if(!report) {
      return res.status(404).send({message: "Eczema Report Not Found"});
    } else {
      return res.status(200).send("Successfully Updated Report!");
    }
  } catch(err) {
    console.log(err.message); 
    return res.status(500).send({message: err.message});
  }  
})

//Get a single Report
router.get('/:id', async (req, res) => {
  try {
  const {id} = req.params; 
  const report = await eczemaReport.findById(id);
    res.status(200).json(report);
  } catch (err) {
    console.log(err.message);
    res.status(404).send({message: err.message});
  }
})

//Delete a report 
router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params; 
    const report = await eczemaReport.findByIdAndDelete(id);
    if(!report) {
      res.status(404).json({message: "Eczema Report Not Found"});
    } else {
      res.status(200).json({message: "Successfully Deleted the Eczema Report"});
    }
    } catch (err) {
      console.log(err.message);
      res.status(404).send({message: err.message});
    }
})

export default router;