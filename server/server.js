const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const aiRoutes = require("./routes/aiRoutes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use("/", aiRoutes);
app.use(express.json());


// 🔗 MongoDB Connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// 📦 Models
const User = require("./models/User");
const Application = require("./models/Application");


// 🏠 TEST ROUTE
app.get("/", (req, res) => {

  res.send("API Running...");
});


// 🔐 REGISTER
app.post("/register", async (req, res) => {

  try {

    const { name, email, password } =
      req.body;

    const existing =
      await User.findOne({ email });

    if (existing) {

      return res.json({
        message: "User already exists"
      });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      message: "User Registered"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// 🔐 LOGIN
app.post("/login", async (req, res) => {

  try {

    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
        password
      });

    if (user) {

      res.json({
        message: "Login Success",
        email: user.email,
        name: user.name,
      });

    } else {

      res.json({
        message: "Invalid Credentials"
      });
    }

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// 📝 APPLY JOB / INTERNSHIP
app.post("/apply", async (req, res) => {

  try {

    const application =
      new Application(req.body);

    await application.save();

    res.json({
      message: "Application Saved"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
});


// 📊 DASHBOARD DATA
app.get(
  "/dashboard/:email",
  async (req, res) => {

    try {

      const data =
        await Application.find({
          email: req.params.email
        });

      res.json(data);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);


// 📄 RESUME UPLOAD
const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + file.originalname
    );
  }
});

const upload = multer({ storage });

app.post(
  "/upload",
  upload.single("resume"),
  (req, res) => {

    if (!req.file) {

      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    res.json({
      message: "Resume Uploaded",
      file: req.file.filename
    });
  }
);

app.get(
  "/all-applications",
  async (req, res) => {

    try {

      const data =
        await Application.find();

      res.json(data);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

// 🔄 UPDATE STATUS
app.put(
  "/update-status/:id",
  async (req, res) => {

    try {

      await Application.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        }
      );

      res.json({
        message: "Status Updated"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);


// 🚀 SERVER START
app.listen(5000, () => {

  console.log(
    "Server started on port 5000"
  );
});