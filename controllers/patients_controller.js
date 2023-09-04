const Patient = require('../models/patient');
const Report = require('../models/report');

const mongoose = require('mongoose');

// Function to register a new patient by mobile number, if the patient already exists, return the patient's details.
// phone : String (required),
// name (optional), age (optional), gender (optional)
module.exports.register = async function (req, res) {
    try {
        let patient = await Patient.findOne({ phone: req.body.phone });

        if (patient) {
            // console.log(patient, 'patient')
            return res.status(200).send({
                patient: patient,
                message: "User already exists",
            });
        }

        let newPatient = await Patient.create(req.body);

        if (newPatient) {
            return res.status(200).send({
                patient: newPatient,
                isRegistered: true,
                message: "User registered",
            });
        }

    } catch (error) {
        console.log('Error', error);
        return res.status(500).send({
            isRegistered: false,
            message: 'Internal server error',
        });
    }
};

// Function to create a report of a patient
// doctor : ObjectId 'Doctor',
// id : ObjectId 'Patient', 
// status : 'Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive-Admit',
// date (default = today's date)
//  patients/:id/create_report
module.exports.createReport = async function (req, res) {
    try {
        let report = await Report.create({
            doctor: req.body.doctor,
            patient: req.params.id,
            status: req.body.status,
            date: req.body.date ? req.body.date : Date.now(),
        }); 

        if (report) {

            return res.status(200).send({
                report: report,
                message: 'Report created successfully',
            });
        } else {
            return res.status(200).send({
                message: 'Unable to create Report with given datail',
            });
        }

    } catch (error) {
        console.log('Internal Server Error', error);
        return res.status(500).send({
            err: error,
            isReportCreated: false,
            message: 'Internal Server Error',
        });
    }
};

// Function to get all reports of a patient
//   patients/:id/all_reports
//   id : ObjectId 'Patient'
module.exports.reportsOfPatient = async function (req, res) {
    try {
        let reports = await Report.find({ patient: req.params.id });

        if (reports) {
            return res.status(200).send({
                reports: reports,
                message: "All reports of the patient",
            });
        }

    } catch (error) {
        console.log('Internal Server Error', error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
};
