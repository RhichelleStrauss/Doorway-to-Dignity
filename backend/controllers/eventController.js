const Event = require("../models/Event");
const Signup = require("../models/Signup");


exports.listEvents = async (req, res) => {
  try {
    const events = await Event.find({ end: mongoose.trusted({ $gte: new Date() }) }).sort({ start: 1 }).lean();

    
       const counts = await Signup.aggregate([
      { $match: { event: { $in: events.map((e) => e._id) } } },
      { $group: { _id: { event: "$event", role: "$role" }, count: { $sum: 1 } } },
    ]);
    const countFor = (eventId, role) =>
      counts.find((c) => c._id.event.toString() === eventId && c._id.role === role)?.count || 0;

   
    const mine = await Signup.find({ user: req.user._id }).select("event role").lean();
    const myRoleByEvent = new Map(mine.map((s) => [s.event.toString(), s.role]));


       res.json(
      events.map((e) => {
        const id = e._id.toString();
        const roles = e.roles.map((r) => ({ name: r.name, capacity: r.capacity, filled: countFor(id, r.name) }));
        return {
          ...e,
          roles,
          capacity: roles.reduce((sum, r) => sum + r.capacity, 0),
          volunteerCount: roles.reduce((sum, r) => sum + r.filled, 0),
          signedUp: myRoleByEvent.has(id),
          myRole: myRoleByEvent.get(id),

        };
      })
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

exports.mySignups = async (req, res) => {
  try {
    const signups = await Signup.find({ user: req.user._id }).populate("event").lean();
    res.json(signups.filter((s) => s.event)); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};


exports.signUp = async (req, res) => {
  try {
    const { role } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found." });
    if (event.end < new Date()) return res.status(400).json({ message: "This event has already happened." });
        const chosen = event.roles.find((r) => r.name === role);
    if (!chosen) return res.status(400).json({ message: "Please choose a role for this event." });

    const roleCount = await Signup.countDocuments({ event: event._id, role });
    if (roleCount >= chosen.capacity) return res.status(400).json({ message: "Sorry, that role is full." });

    await Signup.create({ user: req.user._id, event: event._id, role });
    res.status(201).json({ message: "You're signed up!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "You're already signed up for this event." });
    }
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};


exports.createEvent = async (req, res) => {
  try {
        const { title, description, image, location, start, end, roles } = req.body;
    if (!title || !location || !start || !end || !roles?.length) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }
    const event = await Event.create({ title, description, image, location, start, end, roles });
 res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};

exports.cancelSignup = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found." });

    const hoursToGo = (event.start - Date.now()) / 3_600_000;
    if (hoursToGo < 24) {
      return res.status(400).json({ message: "Sign-ups can only be cancelled up to 24 hours before the event." });
    }

    const removed = await Signup.findOneAndDelete({ user: req.user._id, event: event._id });
    if (!removed) return res.status(404).json({ message: "You're not signed up for this event." });

    res.json({ message: "Your sign-up has been cancelled." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
};
