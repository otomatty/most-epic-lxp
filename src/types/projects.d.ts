import { Timestamp } from "@firebase/firestore-types";

declare namespace FirestoreCollections {
  interface Project {
    projectId: string;
    projectName: string;
    ownerId: string;
    members: string[];
    projectType: "list" | "kanban" | "gantt";
    createdAt: Timestamp;
    updatedAt: Timestamp;
    tasks: Task[];
    notes: Note[];
  }

  interface Task {
    taskId: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate: Timestamp;
    subTasks: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }

  interface Note {
    noteId: string;
    content: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
  }
}

declare interface ProjectsCollection {
  [projectId: string]: FirestoreCollections.Project;
}
