const express = require('express');

const { requireAuth } = require('../middleware/auth');
const JourneyHistory = require('../models/JourneyHistory');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

// Every route below requires a valid JWT.
router.use(requireAuth);

const FIELDS = [
  'startedAt', 'startLat', 'startLng',
  'destinationName', 'destinationAddress', 'destLat', 'destLng',
  'thresholdLabel', 'thresholdType', 'thresholdValue',
  'thresholdTimeMinutes', 'thresholdDistanceKm',
  'wakeLat', 'wakeLng', 'wakeAt',
  'endLat', 'endLng', 'endAt',
  'status', 'endReason',
];

router.post(
  '/journeys',
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

    const result = await JourneyHistory.bulkWrite(ops);
    res.json({
      synced: ops.length,
      upserted: result.upsertedCount,
      modified: result.modifiedCount,
    });
  }),
);

// Bonus endpoint for a future "restore on a new device" flow — not
// currently called by the app, but here so that's a small addition
// later rather than a new backend deploy.
router.get(
  '/journeys',
  asyncHandler(async (req, res) => {
    const since = req.query.since ? new Date(req.query.since) : new Date(0);

    const journeys = await JourneyHistory.find({
      ownerId: req.user.id,
      updatedAt: { $gt: since },
    }).sort({ startedAt: -1 });

    res.json({ journeys });
  }),
);

module.exports = router;
