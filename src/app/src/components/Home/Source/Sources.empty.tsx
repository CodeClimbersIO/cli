import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddSources from "./AddSources";
import { useState } from "react";

const SourcesEmpty = () => {
  const [addSourcesOpen, setAddSourcesOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Card sx={{ boxShadow: "none", borderRadius: 0, minWidth: 262 }}>
        <CardContent sx={{ padding: "24px", height: "100%", display: "flex" }}>
          <Stack direction="column">
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h3" alignContent="center" textAlign="left">
                Sources
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon fontSize="small" />}
                onClick={() => setAddSourcesOpen(true)}
                sx={{
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#EBEBEB" : "#1F2122",
                  borderRadius: "2px",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  width: "auto",
                  height: "32px",
                  minWidth: 0,
                }}
              >
                Add
              </Button>
            </Stack>
            <Typography
              variant="body1"
              textAlign="center"
              width="100%"
              marginTop="24px"
            >
              Please connect a source using the 'Add' button
            </Typography>
          </Stack>
        </CardContent>
      </Card>
      <AddSources
        open={addSourcesOpen}
        handleClose={() => setAddSourcesOpen(false)}
      />
    </>
  );
};

export default SourcesEmpty;
