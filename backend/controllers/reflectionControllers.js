const Reflection = require("../models/Reflection");

async function getAllReflections(req, res, next) {
  try {
    const reflections = await Reflection.find()
      .populate("goal", "title")
      .populate("decision", "title");
    res.json(reflections);
  } catch (err) {
    next(err);
  }
}

async function createReflection(req, res, next) {
  try {
    const { targetType, goal, decision, content } = req.body;

    if (targetType === "Goal" && !goal) {
      return res.status(400).json({ message: "goal is required when targetType is 'Goal'" });
    }
    if (targetType === "Decision" && !decision) {
      return res.status(400).json({ message: "decision is required when targetType is 'Decision'" });
    }

    const newReflection = await Reflection.create({ targetType, goal, decision, content });
    await newReflection.populate("goal", "title");
    await newReflection.populate("decision", "title");

    res.status(201).json(newReflection);
  } catch (err) {
    next(err);
  }
}

async function updateReflection(req, res, next) {
  try {
    const updatedReflection = await Reflection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("goal", "title")
      .populate("decision", "title");

    if (!updatedReflection) {
      return res.status(404).json({ message: "Reflection not found" });
    }
    res.json(updatedReflection);
  } catch (err) {
    next(err);
  }
}

async function deleteReflection(req, res, next) {
  try {
    const deletedReflection = await Reflection.findByIdAndDelete(req.params.id);
    if (!deletedReflection) {
      return res.status(404).json({ message: "Reflection not found" });
    }
    res.json({ message: "Reflection deleted", reflection: deletedReflection });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllReflections,
  createReflection,
  updateReflection,
  deleteReflection,
};