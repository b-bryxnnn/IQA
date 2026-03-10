import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Setup Multer for evidence file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Ensure uploads directory exists (Normally done in setup, just serving static for now)
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Serve Vite frontend in production
app.use(express.static(path.join(__dirname, 'dist')));


// ==========================================
// 1. ดึงรายชื่อครูทั้งหมด (getData)
// returns: [[id, title, firstName, lastName, room, position], ...]
// ==========================================
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await prisma.teacher.findMany({
            orderBy: { id: 'asc' }
        });
        const formatted = teachers.map(t => [
            t.id, t.title || '', t.firstName || '', t.lastName || '', t.room || '', t.position || ''
        ]);
        res.json(formatted);
    } catch (error) {
        console.error("Error /api/teachers:", error);
        res.status(500).json([]);
    }
});

// ==========================================
// 2. ดึงสถานะการประเมิน (getAdditionalData)
// returns: [[stdId, stdName, stdRoom, stdNo, Index/ID], ...]
// index should be +2 from row, but we can just return Assessment id
// ==========================================
app.get('/api/assessments', async (req, res) => {
    try {
        const assessments = await prisma.assessment.findMany({
            orderBy: { id: 'asc' }
        });
        const formatted = assessments.map((a, index) => [
            a.stdId, a.stdName || '', a.stdRoom || '', a.stdNo || '', a.id
        ]);
        res.json(formatted);
    } catch (error) {
        console.error("Error /api/assessments:", error);
        res.status(500).json([]);
    }
});

// ==========================================
// 3. กราฟวงกลม (getPieChartData)
// returns: [[all, done, all - done]]
// ==========================================
app.get('/api/dashboard/pie', async (req, res) => {
    try {
        const all = await prisma.teacher.count();
        const doneAssessments = await prisma.assessment.groupBy({
            by: ['stdId']
        });
        const done = doneAssessments.length;
        res.json([[all, done, Math.max(0, all - done)]]);
    } catch (error) {
        console.error("Error pie chart:", error);
        res.status(500).json([[0, 0, 0]]);
    }
});

// ==========================================
// 4. กราฟแท่ง (getBarChartData)
// returns: [[roomName, total, total, done, total - done], ...]
// ==========================================
app.get('/api/dashboard/bar', async (req, res) => {
    try {
        const teachers = await prisma.teacher.findMany();
        const assessments = await prisma.assessment.findMany({
            distinct: ['stdId'],
            select: { stdId: true, stdRoom: true }
        });

        const stats = {};
        teachers.forEach(t => {
            const room = t.room || 'ไม่ระบุ';
            if (!stats[room]) stats[room] = { total: 0, done: 0 };
            stats[room].total++;
        });

        assessments.forEach(a => {
            const room = a.stdRoom || 'ไม่ระบุ';
            if (stats[room]) stats[room].done++;
        });

        const formatted = Object.keys(stats).map(k => [
            k, stats[k].total, stats[k].total, stats[k].done, stats[k].total - stats[k].done
        ]).sort();

        res.json(formatted);
    } catch (error) {
        res.status(500).json([]);
    }
});

// ==========================================
// 8. คลังข้อมูล (getRepositoryData)
// returns: [{ id, name, room, link66, link67, timestamp }, ...]
// ==========================================
app.get('/api/repository', async (req, res) => {
    try {
        const assessments = await prisma.assessment.findMany({
            where: {
                OR: [
                    { link66: { not: null } },
                    { link67: { not: null } }
                ]
            },
            orderBy: [
                { stdRoom: 'asc' },
                { stdName: 'asc' }
            ]
        });

        const formatted = assessments
            .filter(a => (a.link66 && a.link66 !== "") || (a.link67 && a.link67 !== ""))
            .map(a => ({
                id: a.stdId,
                name: a.stdName,
                room: a.stdRoom,
                link66: a.link66,
                link67: a.link67,
                timestamp: a.timestamp
            }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json([]);
    }
});

// ==========================================
// 5. บันทึกผลประเมิน (saveAssessment)
// ==========================================
app.post('/api/assessments', upload.fields([{ name: 'file66', maxCount: 1 }, { name: 'file67', maxCount: 1 }]), async (req, res) => {
    try {
        const form = req.body;

        let link66 = "";
        let link67 = "";

        const reqPort = req.get('host');
        const baseUrl = req.protocol + '://' + reqPort; // simplistic base URL 

        if (req.files['file66'] && req.files['file66'][0]) {
            link66 = baseUrl + '/uploads/' + req.files['file66'][0].filename;
        }
        if (req.files['file67'] && req.files['file67'][0]) {
            link67 = baseUrl + '/uploads/' + req.files['file67'][0].filename;
        }

        await prisma.assessment.create({
            data: {
                stdId: form.stdId,
                stdName: form.stdName,
                stdRoom: form.stdRoom,
                stdNo: form.stdNo,
                q1: parseInt(form.q1 || 0),
                q2: parseInt(form.q2 || 0),
                q3: parseInt(form.q3 || 0),
                q4: parseInt(form.q4 || 0),
                q5: parseInt(form.q5 || 0),
                q6: parseInt(form.q6 || 0),
                q7: parseInt(form.q7 || 0),
                q8: parseInt(form.q8 || 0),
                q9: parseInt(form.q9 || 0),
                comment: form.comment,
                link66: link66,
                link67: link67
            }
        });
        res.json({ success: true });
    } catch (error) {
        console.error("Save assessment error:", error);
        res.json({ success: false, error: error.toString() });
    }
});

// ==========================================
// 6. ลบข้อมูล (deleteItem)
// ==========================================
app.delete('/api/assessments/:id', async (req, res) => {
    try {
        // Find assessment by stdId (since frontend sends stdId, but maybe it sends actual ID? Wait, GAS passed data[i][1] which is stdId)
        // Wait, GAS deletes by ID from array:
        // if (String(data[i][1]) == String(id))
        const { id } = req.params;
        const assessments = await prisma.assessment.findMany({
            where: { stdId: id }
        });

        if (assessments.length > 0) {
            await prisma.assessment.delete({ where: { id: assessments[0].id } });
            res.json({ success: true });
        } else {
            // In case it's actually passing the database primary ID
            await prisma.assessment.delete({ where: { id: parseInt(id) } });
            res.json({ success: true });
        }
    } catch (error) {
        res.json({ success: false, error: "ไม่พบข้อมูล หรือเกิดข้อผิดพลาด" });
    }
});

// ==========================================
// 7. AI Analysis (getAIAnalysis)
// ==========================================
app.post('/api/ai/analysis', async (req, res) => {
    try {
        const assessments = await prisma.assessment.findMany();
        if (assessments.length < 2) return res.send("ยังไม่มีข้อมูลการประเมินมากพอ");

        let scores = Array(9).fill(0);
        let count = assessments.length;

        for (const a of assessments) {
            scores[0] += a.q1 || 0;
            scores[1] += a.q2 || 0;
            scores[2] += a.q3 || 0;
            scores[3] += a.q4 || 0;
            scores[4] += a.q5 || 0;
            scores[5] += a.q6 || 0;
            scores[6] += a.q7 || 0;
            scores[7] += a.q8 || 0;
            scores[8] += a.q9 || 0;
        }

        const avgs = scores.map(s => (s / count).toFixed(2));

        const prompt = `วิเคราะห์ผลการประเมิน Active Learning ครู ${count} คน (เต็ม 5):
    1. Thinking: ${avgs[0]}, ${avgs[1]}, ${avgs[2]}
    2. Doing: ${avgs[3]}, ${avgs[4]}, ${avgs[5]}
    3. Application: ${avgs[6]}, ${avgs[7]}, ${avgs[8]}
    ขอจุดแข็ง จุดพัฒนา ข้อเสนอแนะเชิงกลยุทธ์ สรุปเป็น HTML List`;

        const payload = { "contents": [{ "parts": [{ "text": prompt }] }] };
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': process.env.GEMINI_API_KEY || ''
            },
            body: JSON.stringify(payload)
        };

        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", options);
        const json = await response.json();

        if (json.candidates && json.candidates[0]) {
            res.send(json.candidates[0].content.parts[0].text);
        } else {
            res.send("Error generating AI response.");
        }
    } catch (error) {
        res.send("Error: " + error.toString());
    }
});


// Catch-all route to serve the frontend index.html for unknown routes (SPA fallback)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
