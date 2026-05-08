import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1/hospital";

app.use(express.json());
app.use(cors());

async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to mongoose");
  } catch (error) {
    console.log("faild to connect to mongoose : ", error.message);
  }
}

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "doctor", "pharmacists"],
    },
  },
  { timestamps: true, versionKey: false }
);

const sessionSchema = new mongoose.Schema(
  {
    tittle: { type: String, required: true },
    doctor: { type: String, required: true },
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
    totalSlot: { type: Number, required: true },
    leftSlot: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

const appointmentSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    tittle: { type: String, required: true },
    appointment: { type: String, required: true },
    doctor: { type: String, required: true },
    doctorId: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

const medicineSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    doctorId: { type: String, required: true },
    disease: { type: String, required: true },
    medicine: { type: String, required: true },
    doctorName: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "ordered", "completed"],
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
const Session = mongoose.model("Session", sessionSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const Medicine = mongoose.model("Medicine", medicineSchema);

const signup = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    if (!userName || !userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail });
    if (user) {
      return res.status(401).json({ message: "User already exgists" });
    }
    const newUser = await User.create({ userName, userEmail, userPassword });
    if (newUser) {
      return res
        .status(200)
        .json({ message: "User Signup successfully", user: newUser });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  try {
    if (!userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail });
    if (user?.userPassword !== userPassword) {
      return res.status(401).json({ message: "Invaild credentials" });
    }
    return res.status(200).json({ message: "User Login successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const about = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.json({ user: null });
  }
  res.json({ user });
};

const deleteAcc = async (req, res) => {
  try {
    const account = await User.findByIdAndDelete(req.params.id);
    if (account) {
      return res.json({ message: "Account successfully deleted" });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAcc = async (req, res) => {
  console.log(req.body);
  const { userName, userEmail, userPassword, userId } = req.body;
  console.log(userName, userEmail, userPassword, userId);
  try {
    if (!userName || !userEmail || !userId) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findById(userId);

    if (user.userEmail !== userEmail) {
      const user = await User.find({ userEmail });
      if (user) {
        return res.status(401).json({ message: "Email already in use" });
      }
      const newUser = await User.findByIdAndUpdate(
        userId,
        { userName, userEmail, userPassword },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "User successfully  updated", user: newUser });
    }
    if (userPassword) {
      const newUser = await User.findByIdAndUpdate(
        userId,
        { userName, userPassword },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "User successfully  updated", user: newUser });
    }
    const newUser = await User.findByIdAndUpdate(
      userId,
      { userName },
      { new: true }
    );
    if (newUser) {
      return res
        .status(200)
        .json({ message: "User successfully  updated", user: newUser });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminGetSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminGetAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find();
    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    res.status(200).json({ doctors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDoctor = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    if (!userName || !userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail });
    if (user) {
      return res.status(401).json({ message: "User already exgists" });
    }
    const doctor = await User.create({
      userName,
      userEmail,
      userPassword,
      role: "doctor",
    });
    if (doctor) {
      return res
        .status(200)
        .json({ message: "Doctor added successfully", doctor });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

const createSessions = async (req, res) => {
  const { sessionTitle, doctorEmail, time, slot } = req.body;
  try {
    if (!sessionTitle || !doctorEmail || !time || !slot) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const doctor = await User.findOne({ userEmail: doctorEmail });
    if (!doctor || doctor.role !== "doctor") {
      return res.status(401).json({ message: "Invalid doctor email" });
    }
    const newSession = await Session.create({
      tittle: sessionTitle,
      doctor: doctor.userName,
      doctorId: doctor._id,
      date: time,
      totalSlot: slot,
      leftSlot: slot,
    });
    if (newSession) {
      return res
        .status(200)
        .json({ message: "Session created successfully", session: newSession });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSession = async (req, res) => {
  try {
    const deletedSessions = await Session.findByIdAndDelete(req.params.id);
    if (deletedSessions) {
      return res.status(200).json({
        message: "Session deleted successfully",
        session: deletedSessions,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const deletedDoctor = await User.findByIdAndDelete(req.params.id);
    if (deletedDoctor) {
      return res.status(200).json({
        message: "Doctor deleted successfully",
        session: deletedDoctor,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      return res.status(200).json({
        message: "User deleted successfully",
        session: deletedUser,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  try {
    if (!userName || !userEmail || !userPassword) {
      return res.status(404).json({ message: "All fields are require" });
    }
    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedDoctor = await User.findByIdAndUpdate(req.params.id, {
      userName,
      userEmail,
      userPassword,
    });
    if (updatedDoctor) {
      return res.status(200).json({
        message: "Doctor updated successfully",
        doctor: updatedDoctor,
      });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminGetInfo = async (req, res) => {
  try {
    const users = await User.find();
    const sessions = (await Session.find()).length;
    const appointment = (await Appointment.find()).length;
    let doctors = users.filter((user) => user.role === "doctor");
    doctors = doctors.length;
    let patients = users.filter((user) => user.role === "user");
    patients = patients.length;
    res.json({ doctors, patients, sessions, appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const adminGetMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find();
    if (medicine.length === 0) {
      return res.json({ medicine: null });
    }
    if (medicine) {
      return res.json({ medicine });
    }
    return res.json({ message: "Something whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const adminGiveMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(400).json({ message: "invalid id" });
    }
    if (medicine.status === "completed") {
      return res.json({ message: "Already given" });
    }
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, {
      status: "completed",
    });
    if (updatedMedicine) {
      return res.json({ message: "Successfully given" });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const doctorGetSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ doctorId: req.params.id });
    res.status(200).json({ sessions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const doctorGetAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find({ doctorId: req.params.id });
    if (appointment.length === 0) {
      return res.status(200).json({ appointment: null });
    }
    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const doctorGiveMedicine = async (req, res) => {
  const { userId, doctorId, disease, medicine } = req.body;
  try {
    if (!userId || !doctorId || !disease || !medicine) {
      return res.status(400).json({ message: "All feild are required" });
    }
    const doctor = await User.findById(doctorId);
    const user = await User.findById(userId);
    if (doctor.role !== "doctor") {
      return res.status(400).json({ message: "invalid doctor" });
    }
    if (user.role !== "user") {
      return res.status(400).json({ message: "invalid user" });
    }
    const medicineD = await Medicine.create({
      userId,
      userName: user.userName,
      doctorId,
      disease,
      medicine,
      doctorName: doctor.userName,
    });
    if (medicineD) {
      return res.json({ message: "Medicine given successfully" });
    }
    return res.status(500).json({ message: "Something whent wrong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userGetAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.params.id });
    if (appointments.length === 0) {
      return res.status(200).json({ appointments: null });
    }
    return res.status(200).json({ appointments });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createAppointment = async (req, res) => {
  const { userId, sessionId } = req.body;

  try {
    if (!userId || !sessionId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });
    if (session.leftSlot <= 0) {
      return res.status(400).json({ message: "No slots left" });
    }

    const existing = await Appointment.findOne({
      userId,
      doctorId: session.doctorId,
      date: session.date,
    });
    if (existing) {
      return res
        .status(400)
        .json({ message: "You already have an appointment for this session" });
    }

    session.leftSlot -= 1;
    await session.save();

    const appointment = await Appointment.create({
      userId,
      tittle: session.tittle,
      appointment: session.totalSlot - session.leftSlot,
      doctor: session.doctor,
      doctorId: session.doctorId,
      date: session.date,
    });

    res.status(200).json({ message: "Appointment created", appointment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const userGetInfo = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" });
    const appointments = await Appointment.find({ userId: req.params.id });
    res.json({
      doctors: doctors.length,
      appointment: appointments.length,
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (appointment) {
      return res
        .status(200)
        .json({ message: "Appointment successfully canceled" });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const userGetMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.find({ userId: req.params.id });
    if (medicine.length === 0) {
      return res.json({ medicine: null });
    }
    if (medicine) {
      return res.json({ medicine });
    }
    return res.json({ message: "Something whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const buyMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(400).json({ message: "invalid id" });
    }
    if (medicine.status === "ordered") {
      return res.json({ message: "Already bought" });
    }
    const updatedMedicine = await Medicine.findByIdAndUpdate(req.params.id, {
      status: "ordered",
    });
    if (updatedMedicine) {
      return res.json({ message: "Successfully bought" });
    }
    res.status(500).json({ message: "Somthing whent wrong" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const adminRoutes = express.Router();
adminRoutes.get("/appointment", adminGetAppointments);
adminRoutes.get("/medicine", adminGetMedicine);
adminRoutes.get("/sessions", adminGetSessions);
adminRoutes.post("/sessions", createSessions);
adminRoutes.delete("/sessions/:id", deleteSession);
adminRoutes.get("/doctors", getDoctors);
adminRoutes.post("/doctor", createDoctor);
adminRoutes.put("/doctor/:id", updateDoctor);
adminRoutes.put("/medicine/:id", adminGiveMedicine);
adminRoutes.delete("/doctor/:id", deleteDoctor);
adminRoutes.delete("/user/:id", deleteUser);
adminRoutes.get("/patients", getUsers);
adminRoutes.get("/info", adminGetInfo);

const doctorRoutes = express.Router();
doctorRoutes.get("/appointment/:id", doctorGetAppointments);
doctorRoutes.get("/sessions/:id", doctorGetSessions);
doctorRoutes.post("/medicine", doctorGiveMedicine);

const userRoutes = express.Router();
userRoutes.get("/appointment/:id", userGetAppointment);
userRoutes.get("/info/:id", userGetInfo);
userRoutes.get("/medicine/:id", userGetMedicine);
userRoutes.put("/medicine/:id", buyMedicine);
userRoutes.get("/sessions", adminGetSessions);
userRoutes.post("/appointment", createAppointment);
userRoutes.delete("/appointment/:id", deleteAppointment);

const authRoutes = express.Router();
authRoutes.post("/login", login);
authRoutes.post("/signup", signup);
authRoutes.get("/about/:id", about);
authRoutes.delete("/delete/:id", deleteAcc);
authRoutes.put("/delete", updateAcc);

await connectDb();

app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}/`);
});
