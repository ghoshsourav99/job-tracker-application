import React, { useState } from "react";
import { TextField, Button, Box, MenuItem, Typography, Grid } from "@mui/material";
import { AddCircle as AddCircleIcon } from '@mui/icons-material';

import { useAddJobMutation } from "../features/api/jobApi";

const JobForm = ({ showToast }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    applied_date: "",
  });

  const [addJob] = useAddJobMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addJob(formData).unwrap();
      if (showToast) {
        showToast(res?.message || res?.msg || "Job added to tracker successfully!", "success");
      }

      setFormData({
        company: "",
        role: "",
        status: "Applied",
        applied_date: "",
      });
    } catch (err) {
      if (showToast) {
        showToast(err?.data?.message || err?.data?.msg || err?.message || "Failed to add job.", "error");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        p: { xs: 3, md: 4 },
        mb: 4,
        border: "1px solid #e5e7eb",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "text.primary" }}>
        Track New Job
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Company Name"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="Applied">Applied</MenuItem>
            <MenuItem value="Interview">Interview</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="applied_date"
            value={formData.applied_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              startIcon={<AddCircleIcon />}
              disableElevation
              sx={{ px: 4, py: 1.5, fontSize: "1rem", fontWeight: 600 }}
            >
              Add Job to Tracker
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobForm;
