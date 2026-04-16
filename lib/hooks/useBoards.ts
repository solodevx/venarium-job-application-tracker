"use client";

import { useState } from "react";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";

export function useBoard(initialBoard?: Board | null) {
  

  // Columns MUST be state because we update them (drag & drop)
  const [columns, setColumns] = useState<Column[]>(
    initialBoard?.columns || []
  );

  const [error, setError] = useState<string | null>(null);

  /** MOVE JOB FUNCTION -This handles drag & drop movement in UI AND updates backend */
  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number
  ) {
    setColumns((prev) => {
    //   Make a deep copy of columns (so we don't mutate state directly)
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      let jobToMove: JobApplication | null = null;

      //Find the job and remove it from its old column
      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
          (j) => j._id === jobApplicationId
        );

        if (jobIndex !== -1) {
          jobToMove = col.jobApplications[jobIndex];

          // ❌ Remove job from old column
          col.jobApplications = col.jobApplications.filter(
            (job) => job._id !== jobApplicationId
          );

          break;
        }
      }

      //Add job into new column
      if (jobToMove) {
        const targetColumnIndex = newColumns.findIndex(
          (col) => col._id === newColumnId
        );

        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];

          const updatedJobs = [...(targetColumn.jobApplications || [])];

          // Insert job at correct position
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100, // spacing technique
          });

          // Recalculate all orders
          const jobsWithUpdatedOrders = updatedJobs.map((job, index) => ({
            ...job,
            order: index * 100,
          }));

          // Update column
          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    // Update backend (database)
    try {
      await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Error updating job:", err);
      setError("Failed to move job");
    }
  }

  // RETURN HOOK DATA
  return {
    board: initialBoard, // no need for state
    columns,
    error,
    moveJob,
  };
}