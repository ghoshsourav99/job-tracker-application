import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Button,
  Box,
  Chip,
  Fade
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Event as EventIcon
} from "@mui/icons-material";

import {
  useGetJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "../features/api/jobApi";

import JobForm from "../components/JobForm";

const Dashboard = () => {
  const { data, error, isLoading } = useGetJobsQuery();
  const [updateJob] = useUpdateJobMutation();
  const [deleteJob] = useDeleteJobMutation();

  const handleStatusChange = async (job, newStatus) => {
    try {
      const formattedDate = job.applied_date
        ? job.applied_date.split("T")[0]
        : null;

      await updateJob({
        id: job.id,
        company: job.company,
        role: job.role,
        status: newStatus,
        applied_date: formattedDate,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "primary";
      case "Interview":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  if (isLoading) return (
    <Container maxWidth="lg" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" color="primary">Loading your jobs...</Typography>
    </Container>
  );
  if (error) return (
    <Container maxWidth="lg" sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" color="error">Error loading jobs.</Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h1" sx={{ color: "text.primary", mb: 1, letterSpacing: "-0.025em" }}>
          Job Tracker
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage and organize your applications flawlessly.
        </Typography>
      </Box>

      <JobForm />

      <Typography variant="h4" sx={{ mt: 6, mb: 4, pl: 0, fontWeight: 700, color: "text.primary" }}>
        My Applications
      </Typography>

      <Grid container spacing={4}>
        {data.map((job, index) => (
          <Fade in={true} timeout={500 + index * 150} key={job.id}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}>

                <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                  <Chip
                    label={job.status}
                    color={getStatusColor(job.status)}
                    variant="filled"
                    size="small"
                    sx={{ fontWeight: 600, color: "#fff" }}
                  />
                </Box>

                <CardContent sx={{ flexGrow: 1, pt: 4 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <BusinessIcon sx={{ color: "primary.main", mr: 1 }} />
                    <Typography variant="h5" component="div">
                      {job.company}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <WorkIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />
                    <Typography color="text.secondary">
                      {job.role}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <EventIcon sx={{ color: "text.secondary", mr: 1, fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      {job.applied_date ? job.applied_date.split("T")[0] : "No date"}
                    </Typography>
                  </Box>

                  <Select
                    fullWidth
                    size="small"
                    value={job.status}
                    onChange={(e) => handleStatusChange(job, e.target.value)}
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="Applied">Applied</MenuItem>
                    <MenuItem value="Interview">Interview</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>

                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Fade>
        ))}
        {data.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ p: 6, textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px dashed #d1d5db' }}>
              <Typography variant="h6" color="text.primary">No job applications yet.</Typography>
              <Typography color="text.secondary">Start tracking them above!</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
