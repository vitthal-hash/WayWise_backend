const express = require('express');

const { requireAuth } = require('../middleware/auth');
const ScheduledJourney = require('../models/ScheduledJourney');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Every route below requires a valid JWT.
router.use(requireAuth);

const FIELDS = [
  'destinationLat', 'destinationLng', 'destinationName', 'destinationAddress',
  'journeyDate', 'departureTime', 'reminderBeforeMinutes',
  'wakeDistanceKm', 'checklist',
  'status', 'actualStartTime',
];

// Same bulkWrite-upsert shape as POST /sync/journeys. This route is only
// ever called when the user has opted in via Settings — enforcing that
// opt-in is a client-side decision (whether to call this at all), not
// something this endpoint checks server-side.
router.post(
  '/scheduled-journeys',
  asyncHandler(async (req, res) => {
    const journeys = Array.isArray(req.body.journeys) ? req.body.journeys : [];
    if (journeys.length === 0) {
      return res.json({ synced: 0 });
    }

    const ops = journeys
      .filter((j) => typeof j.id === 'string' && j.id.length > 0)
      .map((j) => {
        const set = { ownerId: req.user.id, journeyId: j.id };
        for (const field of FIELDS) {
          if (j[field] !== undefined) set[field] = j[field];
        }

        return {
          updateOne: {
            filter: { ownerId: req.user.id, journeyId: j.id },
            update: { $set: set },
            upsert: true,
          },
        };
      });

    if (ops.length === 0) {
      return res.json({ synced: 0 });
    }

    const result = await ScheduledJourney.bulkWrite(ops);
    res.json({
      synced: ops.length,
      upserted: result.upsertedCount,
      modified: result.modifiedCount,
    });
  }),
);

// Restore-on-new-device pull, same shape/contract as GET /sync/journeys:
// returns { journeys: [...] }, each with "journeyId" (not "id") as the
// client-facing identifier — mirror that mapping on the Flutter side the
// same way pullJourneyHistory() needs to.
router.get(
  '/scheduled-journeys',
  asyncHandler(async (req, res) => {
    const since = req.query.since ? new Date(req.query.since) : new Date(0);

    const journeys = await ScheduledJourney.find({
      ownerId: req.user.id,
      updatedAt: { $gt: since },
    }).sort({ departureTime: 1 });

    res.json({ journeys });
  }),
);

// Called once a scheduled journey locally transitions to completed or
// cancelled, so active future-plan data doesn't linger in this collection
// past the point where it's actually still a "future plan."
router.delete(
  '/scheduled-journeys/:journeyId',
  asyncHandler(async (req, res) => {
    const result = await ScheduledJourney.deleteOne({
      ownerId: req.user.id,
      journeyId: req.params.journeyId,
    });

    res.json({ deleted: result.deletedCount });
  }),
);

module.exports = router;