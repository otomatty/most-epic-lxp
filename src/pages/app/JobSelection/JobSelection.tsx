import { Component, createSignal, createEffect, For } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { auth } from "../../../firebase/config";
import {
  JobSelectionContainer,
  JobCard,
  JobTitle,
  JobDescription,
  JobRole,
  SelectButton,
} from "./JobSelection.styled";
import { Job } from "../../../types/jobs";
import { recommendJobs } from "../../../utils/jobRecommendation";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { updateSelectedJob } from "../../../services/userService";

const JobSelection: Component = () => {
  const [jobs, setJobs] = createSignal<Job[]>([]);
  const [selectedJob, setSelectedJob] = createSignal<string | null>(null);
  const navigate = useNavigate();
  const [userProfile] = useUserProfile();

  createEffect(() => {
    const recommendedJobs = recommendJobs(userProfile);
    setJobs(recommendedJobs);
  });

  const handleJobSelect = async (jobId: string) => {
    setSelectedJob(jobId);
    const user = auth.currentUser;
    if (user) {
      try {
        await updateSelectedJob(user.uid, jobId);
        navigate("/webapp/dashboard");
      } catch (error) {
        console.error("ジョブの選択に失敗しました:", error);
        alert("ジョブの選択に失敗しました。");
      }
    }
  };

  return (
    <JobSelectionContainer>
      <h1>あなたにおすすめのジョブ</h1>
      <p>以下のジョブの中から、最も興味のあるものを選択してください。</p>
      <For each={jobs()}>
        {(job) => (
          <JobCard>
            <JobTitle>{job.title}</JobTitle>
            <JobRole>{job.role}</JobRole>
            <JobDescription>{job.description}</JobDescription>
            <SelectButton onClick={() => handleJobSelect(job.id)}>
              このジョブを選択
            </SelectButton>
          </JobCard>
        )}
      </For>
    </JobSelectionContainer>
  );
};

export default JobSelection;
