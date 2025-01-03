import React, { useState } from "react";
import {
    Button,
    Container,
    Typography,
    Box,
    TextField,
    Grid2,
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";

const App = () => {
    const [image, setImage] = useState(null);
    const [plate, setPlate] = useState("");
    const [fees, setFees] = useState("");
    const [plateOCR, setPlateOCR] = useState("");
    const [feesOCR, setFeesOCR] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    let api = 'http://127.0.0.1:5001';

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const extractPlate = async () => {
        if (!image) {
            alert("Please upload an image first!");
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append("image", image);

        try {
            const response = await fetch(`${api}/extract_plate`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`${api}/Failed to extract plate.`);
            }
            const data = await response.json();
            console.log(data)

            setPlate(data.plate);
            setFees(data.fees);
            setPlateOCR(data.plateOCR);
            setFeesOCR(data.feesOCR);
        } catch (error) {
            console.error("Error extracting plate:", error);
        } finally {
            setLoading(false);
        }
    };

    const trainModel = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${api}/train_model`, {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error("Failed to train model.");
            }

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            console.error("Error training model:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ pt: 5 }}>
            <Typography variant="h3" align="center" gutterBottom>
                License Plate Fee Calculator
            </Typography>

            <Grid2 container spacing={3}>
                <Grid2 item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Upload an Image
                            </Typography>
                            <TextField
                                type="file"
                                fullWidth
                                inputProps={{ accept: "image/*" }}
                                onChange={handleImageUpload}
                            />
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="primary"
                                    onClick={extractPlate}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Extract Plate and Calculate Fees"}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Results (Classifier)
                            </Typography>
                            <Typography variant="body1">
                                <strong>Plate:</strong> {plate || "No plate extracted yet."}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Fees:</strong> {fees ? `$${fees}` : "No fees calculated yet."}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Results (OCR Deep Learning Model)
                            </Typography>
                            <Typography variant="body1">
                                <strong>Plate:</strong> {plateOCR || "No plate extracted yet."}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Fees:</strong> {feesOCR ? `$${feesOCR}` : "No fees calculated yet."}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>

                <Grid2 item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Model Training
                            </Typography>
                            <Box mt={2}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    color="secondary"
                                    onClick={trainModel}
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : "Train Model"}
                                </Button>
                            </Box>
                            {message && (
                                <Typography variant="body2" color="text.secondary" mt={2}>
                                    {message}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Container>
    );
};

export default App;