const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/anthonywebstudio",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => {
  console.log("✅ Database connected");
})
.catch((error) => {
  console.error("❌ Database connection error:", error);
});

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model("Contact", ContactSchema);

// Contact Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const newMessage = new Contact({
      name,
      email,
      message
    });

    await newMessage.save();

    res.status(200).json({
      success: true,
      message: "Message sent successfully!"
    });

  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("Anthony Web Studio Backend Running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
