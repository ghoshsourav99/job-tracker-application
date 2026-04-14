const express = require("express");
const router = express.Router();
const db = require("../config/db");

//  Post a new job application
router.post("/jobs", (req, res) => {
  const { company, role, status, applied_date } = req.body;

  const query = `INSERT INTO jobs (company, role, status, applied_date) VALUES (?, ?, ?, ?)`;

  db.query(query, [company, role, status, applied_date], (err, result) => {
    if (err) {
      console.error("Error inserting job", err);
      res.status(500).json({ error: "Failed to add job" });
    }

    res.status(201).json({
      message: "Job added successfully",
      jobId: result.insertId,
    });
  });
});

// Get all job applications
router.get("/jobs", (req, res) => {
  const query = "SELECT * FROM jobs ORDER BY created_at DESC";

  db.query(query, (err, result) => {
    if (err) {
      console.error("Error fetching jobs", err);
      return res.status(500).json({ error: "Failed to fetch jobs" });
    }
    res.status(200).json(result);
  });
});

// Update a job application
router.put("/jobs/:id", (req, res) => {
    const jobId = req.params.id;
    const { company, role, status, applied_date } = req.body;

    const query = `UPDATE jobs SET company = ?, role = ?, status = ?, applied_date = ? WHERE id = ?`;

    db.query(query, [company, role, status, applied_date, jobId], (err, result) => {
        if (err) {
            console.error("Error updating job", err);
            return res.status(500).json({ error: "Failed to update job" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Job not found" });
        }
        res.status(200).json({ message: "Job updated successfully" });
    });
});

// Delete a job application
router.delete("/jobs/:id", (req, res) => {
    const jobId = req.params.id;

    const query = `DELETE FROM jobs WHERE id = ?`;

    db.query(query, [jobId], (err, result) => {
        if (err) {
            console.error("Error deleting job", err);
            return res.status(500).json({ error: "Failed to delete job"});
        }
        if(result.affectedRows === 0) {
            return res.status(404).json({error: "Job not found"});
        } else {
            res.status(200).json({message: "Job deleted successfully"});
        }
    });
});

module.exports = router;
