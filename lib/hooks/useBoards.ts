"use client";

import { useState } from "react";
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "../actions/job-applications";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);

  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns ?? []);

  const [error, setError] = useState<string | null>(null);

  async function moveJob(
    jobApplicationId: string,
    newColumnId: string,
    newOrder: number,
  ) {
    setColumns((prev) => {
      const newColumns = prev.map((column) => ({
        ...column,
        jobApplications: [...column.jobApplications],
      }));

      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const column of newColumns) {
        const jobIndex = column.jobApplications.findIndex(
          (j) => j._id === jobApplicationId,
        );

        if (jobIndex !== -1) {
          jobToMove = column.jobApplications[jobIndex];
          oldColumnId = column._id;

          column.jobApplications = column.jobApplications.filter(
            (job) => job._id !== jobApplicationId,
          );

          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
          (column) => column._id === newColumnId,
        );

        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];

          const updatedJobs = [...targetColumn.jobApplications];

          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: newOrder * 100,
          });

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: updatedJobs.map((job, idx) => ({
              ...job,
              order: idx * 100,
            })),
          };
        }
      }

      return newColumns;
    });

    try {
      await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: newOrder,
      });
    } catch (err) {
      console.error("Error", err);
    }
  }

 function addJob(newJob: JobApplication, columnId: string) {
  setColumns((prev) =>
    prev.map((column) => {
      if (column._id !== columnId) return column;
      return {
        ...column,
        jobApplications: [...column.jobApplications, newJob],
      };
    })
  );
}
  function removeJob(jobId: string) {
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        jobApplications: column.jobApplications.filter((job) => job._id !== jobId),
      })),
    );
  }

  function updateJob(jobId: string, updatedData: Partial<JobApplication>) {
    setColumns((prev) =>
      prev.map((column) => ({
        ...column,
        jobApplications: column.jobApplications.map((job) =>
          job._id === jobId ? { ...job, ...updatedData } : job,
        ),
      })),
    );
  }

  // update return
  return { board, columns, error, moveJob, addJob, removeJob, updateJob };
}
