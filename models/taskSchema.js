const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, `Task title is required`],
    },
    description: {
      type: String,
      required: [true, `Task description is required`],
    },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 9,
    },
    status: {
      type: [String],
      enum: ["pending", "completed", "canceled", "deleted"],
      default: ["pending"],
    },
  },
  {
    timestamps: true,
  }
);
