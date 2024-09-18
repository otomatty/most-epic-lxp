import { Component, createSignal, createEffect } from "solid-js";
import { useAuthState } from "../../../../../hooks/useAuthState";
import { getUserData } from "../../../../../services/userService";
import { jobs } from "../../../../../data/jobsData";
import {
  UserJobContainer,
  JobTitle,
  JobLevel,
  JobDescription,
} from "./UserJob.styled";

const UserJob: Component = () => {
  const { user } = useAuthState();
  const [currentJob, setCurrentJob] = createSignal<any>(null);

  createEffect(async () => {
    const currentUser = user();
    if (currentUser && currentUser.uid) {
      try {
        const userData = await getUserData(currentUser.uid);
        if (userData && userData.selectedJob) {
          const jobData = jobs.find((job) => job.id === userData.selectedJob);
          const userJob = userData.Jobs.find(
            (job) => job.jobId === userData.selectedJob
          );
          if (jobData && userJob) {
            setCurrentJob({
              ...jobData,
              level: userJob.level,
              xp: userJob.xp,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
  });

  return (
    <UserJobContainer>
      {currentJob() && (
        <>
          <JobTitle>{currentJob().title}</JobTitle>
          <JobLevel>レベル: {currentJob().level}</JobLevel>
          <JobDescription>{currentJob().description}</JobDescription>
        </>
      )}
    </UserJobContainer>
  );
};

export default UserJob;
