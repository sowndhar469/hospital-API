const Report = require('../models/report');

module.exports.reportList = async function (req, res) {
    try {
     
        let reports = await Report.find({ status: req.params.status });
 
        if (reports) {
            return res.status(200).send({
                reports: reports,
                message: `Reports of all patients by status: ${req.params.status}`
            })
        }

    } catch (error) {
        console.log('Internal server error', error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
}