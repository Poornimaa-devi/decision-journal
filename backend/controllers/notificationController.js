const Goal = require("../models/Goals");
const Decision = require("../models/Decision");

async function getNotifications(req, res, next) {
  try {
    const userId = req.user.userId;

    const parsedDays = Number(req.query.days);
    const days = Number.isNaN(parsedDays) || parsedDays < 0 ? 7 : parsedDays;
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [pendingDecisions, staleGoals, almostDoneGoals] = await Promise.all([
      Decision.find({ user: userId, status: "pending", createdAt: { $lt: cutoff } }),
      Goal.find({ user: userId, completed: false, updatedAt: { $lt: cutoff } }),
      Goal.find({ user: userId, completed: false, progress: { $gte: 80 } }),
    ]);

    const notifications = [
      ...pendingDecisions.map((d) => ({
        type: "decision_pending",
        message: `Decision "${d.title}" has been pending for over ${days} days. Time to decide?`,
        itemId: d._id,
      })),
      ...staleGoals.map((g) => ({
        type: "goal_stale",
        message: `Goal "${g.title}" hasn't been updated in over ${days} days.`,
        itemId: g._id,
      })),
      ...almostDoneGoals.map((g) => ({
        type: "goal_almost_done",
        message: `You're close! "${g.title}" is at ${g.progress}%.`,
        itemId: g._id,
      })),
    ];

    res.json({ count: notifications.length, notifications });
  } catch (err) {
    next(err);
  }
}

module.exports = { getNotifications };