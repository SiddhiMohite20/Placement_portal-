const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();


// =============================
// Middleware
// =============================

app.use(cors());
app.use(express.json());


// =============================
// Upload Middleware
// =============================

const upload =
  require("./middleware/upload");


// =============================
// AI Routes
// =============================

const aiRoutes =
  require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);


// =============================
// Chatbot Routes
// =============================

const chatbotRoutes =
  require("./routes/chatRoutes");

app.use("/api", chatbotRoutes);


// =============================
// MongoDB Connection
// =============================

mongoose
  .connect(process.env.MONGO_URL)

  .then(() =>
    console.log(
      "MongoDB Connected"
    )
  )

  .catch((err) =>
    console.log(err)
  );


// =============================
// Models
// =============================

const User =
  require("./models/User");

const Application =
  require("./models/Application");


// =============================
// Upload Resume Route
// =============================

app.post(

  "/upload",

  upload.single("resume"),

  (req, res) => {

    try {

      res.json({

        success: true,

        file:
          req.file.filename
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Upload Failed"
      });
    }
  }
);


// =============================
// Test Route
// =============================

app.get("/", (req, res) => {

  res.send("API Running...");
});


// =============================
// Register
// =============================

app.post("/register", async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existing =
      await User.findOne({
        email
      });

    if (existing) {

      return res.json({

        message:
          "User already exists"
      });
    }

    const user =
      new User({

        name,
        email,
        password
      });

    await user.save();

    res.json({

      message:
        "User Registered"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server Error"
    });
  }
});


// =============================
// Login
// =============================

app.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    // =====================
    // ADMIN LOGIN
    // =====================

    if (
      email === "admin@gmail.com" &&
      password === "admin123"
    ) {

      return res.json({

        message:
          "Admin Login",

        email:
          "admin@gmail.com",

        name:
          "Admin",

        isAdmin: true
      });
    }

    // =====================
    // NORMAL USER LOGIN
    // =====================

    const user =
      await User.findOne({

        email,
        password
      });

    if (user) {

      res.json({

        message:
          "Login Success",

        email:
          user.email,

        name:
          user.name,

        isAdmin: false
      });

    } else {

      res.json({

        message:
          "Invalid Credentials"
      });
    }

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server Error"
    });
  }
});


// =============================
// Apply Job / Internship
// =============================

app.post("/apply", async (req, res) => {

  try {

    const application =
      new Application(req.body);

    await application.save();

    res.json({

      message:
        "Application Saved"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      message:
        "Server Error"
    });
  }
});


// =============================
// Dashboard
// =============================

app.get(

  "/dashboard/:email",

  async (req, res) => {

    try {

      const data =
        await Application.find({

          email:
            req.params.email
        });

      res.json(data);

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"
      });
    }
  }
);


// =============================
// Get All Applications
// =============================

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

        message:
          "Server Error"
      });
    }
  }
);


// =============================
// Update Status
// =============================

app.put(

  "/update-status/:id",

  async (req, res) => {

    try {

      await Application.findByIdAndUpdate(

        req.params.id,

        {
          status:
            req.body.status
        }
      );

      res.json({

        message:
          "Status Updated"
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Server Error"
      });
    }
  }
);


// =============================
// Server Start
// =============================

app.listen(5000, () => {

  console.log(
    "Server started on port 5000"
  );
});