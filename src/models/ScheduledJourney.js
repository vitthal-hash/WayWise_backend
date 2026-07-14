const mongoose = require('mongoose');

// Mirrors ScheduledJourney on the Flutter side (see
// lib/models/scheduled_journey.dart / scheduled_journey_service.dart).
// Unlike JourneyHistory, this collection is opt-in — the app only ever
// pushes here if the user has turned on backup for upcoming trips in
// Settings, since a scheduled journey reveals *future* location, not past.
//
// Keyed on (ownerId, journeyId) so re-syncing the same journey never
// duplicates, same pattern as journeyhistories.
const checklistItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    checked: { type: Boolean, default: false },
  },
  { _id: false },
);

const scheduledJourneySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    journeyId: { type: String, required: true },

    destinationLat: Number,
    destinationLng: Number,
    destinationName: String,
    destinationAddress: String,

    journeyDate: Date,
    departureTime: Date,
    reminderBeforeMinutes: Number,

    wakeDistanceKm: Number,
    checklist: [checklistItemSchema],

    // Enum name as a string (e.g. "scheduled", "active", "completed",
    // "cancelled") — mirrors how JourneyHistory.status is stored, so both
    // collections follow the same convention.
    status: String,

    actualStartTime: Date,
  },
  { timestamps: true },
);

scheduledJourneySchema.index({ ownerId: 1, journeyId: 1 }, { unique: true });

module.exports = mongoose.model('ScheduledJourney', scheduledJourneySchema);