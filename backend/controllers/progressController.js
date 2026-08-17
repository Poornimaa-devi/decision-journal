let progressList = [
  { id: 1, goalId: 1, value: 25, note: "Started working on it" },
  { id: 2, goalId: 2, value: 50, note: "In progress" },
];

let nextId = 3;

function getAllProgress(req, res) {
  res.json(progressList);
}

function getProgressById(req, res) {
  const id = Number(req.params.id);
  const item = progressList.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ message: "Progress not found" });
  }

  return res.json(item);
}

function createProgress(req, res) {
  const { goalId, value, note } = req.body;

  if (!goalId || value === undefined) {
    return res.status(400).json({ message: "goalId and value are required" });
  }

  const newProgress = {
    id: nextId,
    goalId: Number(goalId),
    value: Number(value),
    note: note || "",
  };

  progressList.push(newProgress);
  nextId += 1;

  return res.status(201).json(newProgress);
}

function updateProgress(req, res) {
  const id = Number(req.params.id);
  const item = progressList.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ message: "Progress not found" });
  }

  const { goalId, value, note } = req.body;

  if (goalId !== undefined) item.goalId = Number(goalId);
  if (value !== undefined) item.value = Number(value);
  if (note !== undefined) item.note = note;

  return res.json(item);
}

function deleteProgress(req, res) {
  const id = Number(req.params.id);
  const index = progressList.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Progress not found" });
  }

  const deleted = progressList.splice(index, 1)[0];
  return res.json({ message: "Progress deleted", progress: deleted });
}

module.exports = {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
};