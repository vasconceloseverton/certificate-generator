const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate', (req, res) => {
    const { name, course, date, instructor } = req.body;

    if (!name || !course || !date) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const pythonScriptPath = path.join(__dirname, '../python_service/generate.py');

    // Spawn Python process
    const pythonProcess = spawn('python', [
        pythonScriptPath,
        JSON.stringify({ name, course, date, instructor })
    ]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${name.replace(/\s+/g, '_')}.pdf`);

    // Pipe Python stdout to response
    pythonProcess.stdout.pipe(res);

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
            // If headers haven't been sent, send error
            if (!res.headersSent) {
                res.status(500).json({ error: 'Failed to generate certificate' });
            }
        }
    });
});

module.exports = app;
