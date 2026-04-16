import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Dashboard from "./pages/Dashboard";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#4f46e5", // Indigo
    },
    background: {
      default: "#f9fafb", // Gray 50
      paper: "#ffffff",
    },
    text: {
      primary: "#111827", // Gray 900
      secondary: "#4b5563", // Gray 600
    },
    error: {
      main: "#ef4444",
    },
    warning: {
      main: "#f59e0b",
    },
    success: {
      main: "#10b981",
    },
    divider: "#e5e7eb", // Gray 200
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#111827" },
    h2: { fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#111827" },
    h3: { fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#111827" },
    h4: { fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#111827" },
    h5: { fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: "#111827" },
    h6: { fontFamily: "'Outfit', sans-serif", fontWeight: 500, color: "#111827" },
    button: { textTransform: "none", fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
          backdropFilter: "none",
          transition: "box-shadow 0.2s ease-in-out, border-color 0.2s ease",
          "&:hover": {
            transform: "none",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
            border: "1px solid #d1d5db",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          },
        },
        containedPrimary: {
          background: "#4f46e5",
          color: "#ffffff",
          "&:hover": {
            background: "#4338ca",
          },
        },
        outlinedError: {
          borderColor: "#fca5a5",
          color: "#ef4444",
          "&:hover": {
            background: "#fef2f2",
            borderColor: "#ef4444",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#ffffff",
            "& fieldset": {
              borderColor: "#d1d5db", // Gray 300
            },
            "&:hover fieldset": {
              borderColor: "#9ca3af", // Gray 400
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4f46e5",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
