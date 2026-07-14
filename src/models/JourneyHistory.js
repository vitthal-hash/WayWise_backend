const mongoose = require('mongoose');

// Mirrors JourneyHistoryRecord on the Flutter side (see
// lib/models/journey_history.dart / journey_history_service.dart) so
// syncing is a straightforward field-for-field upsert, keyed on
// (ownerId, journeyId) so re-syncing the same journey never duplicates.
const journeyHistorySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    journeyId: { type: String, required: true },

    startedAt: Date,
    startLat: Number,
    startLng: Number,

    destinationName: String,
    destinationAddress: String,
    destLat: Number,
    destLng: Number,

    thresholdLabel: String,
    thresholdType: String,
    thresholdValue: Number,
    thresholdTimeMinutes: Number,
    thresholdDistanceKm: Number,

    wakeLat: Number,
    wakeLng: Number,
    wakeAt: Date,

    endLat: Number,
    endLng: Number,
    endAt: Date,

    status: String,
    endReason: String,
  },
  { timestamps: true },
);

journeyHistorySchema.index({ ownerId: 1, journeyId: 1 }, { unique: true });

module.exports = mongoose.model('JourneyHistory', journeyHistorySchema);
