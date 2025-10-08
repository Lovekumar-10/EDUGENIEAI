
const express = require('express');
const connectDB = require('./config/database')
const pdfRoute = require('./routes/pdfRoute');
const summaryRoute = require('./routes/summaryRoute');
const flashcardRoute = require("./routes/flashcardRoute");
const quizmakerRouter = require("./routes/quizmakerRouter");
const notesRoute = require('./routes/notesRoute')




const cors = require('cors');
require('dotenv').config();


const app = express();

// Proxy trust
app.set('trust proxy', 1);

// CORS
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'https://edugenieai.vercel.app',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true,
}));

// Body + Cookies
app.use(express.json());


// DB
connectDB();

// Routes
app.use("/api/pdf", pdfRoute);

app.use("/api/pdf", summaryRoute);

app.use("/api/pdf", flashcardRoute);

app.use("/api/quiz", quizmakerRouter);

app.use("/api/notes", notesRoute);



app.get("/", (req, res) => {
  res.send("EduGenieAI Summary API running ");
});

//68ccff68d0a0dbe51f712516


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
