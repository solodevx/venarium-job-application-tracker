import mongoose, { Schema, Document } from "mongoose";

export interface IBoard extends Document {
  name: string;
  userId: string;
  columns: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Keep track of job applications with a Kanban board. 
// Each board can have multiple columns (e.g., "Applied", "Interviewing", "Offer")
// And each column can contain multiple job applications.
// Board -> Columns -> JobApplications

const BoardSchema = new Schema<IBoard>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    columns: [
      {
        type: Schema.Types.ObjectId,
        ref: "Column",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Board ||
  mongoose.model<IBoard>("Board", BoardSchema);