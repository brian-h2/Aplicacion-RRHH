import React, { useContext, useState } from "react";
import { JobContext } from "../Protected/Jobs/JobsContext";
import SearchBar from "../../components/SearchBar/SearchBar";
import JobPreview from "../Protected/Jobs/JobPreview";
import ReusableJobDetail from "../Protected/Jobs/ReusableJobDetail";
import "./MobileClientDashboard.css";

const MobileClientDashboard = () => {
  const { jobPosts, styles } = useContext(JobContext);
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="mobile-client-dashboard">
      <div className="searchbar-div">
        <h2>Encuentra tu próximo trabajo</h2>
        <SearchBar />
      </div>
      <div className="job-listing">
        {jobPosts.map((job) => (
          <div
            key={job._id}
            className="job-preview"
            onClick={() => setSelectedJob(job)}
          >
            <JobPreview job={job} />
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="job-details-modal">
          <button
            className="close-modal"
            onClick={() => setSelectedJob(null)}
          >
            &times;
          </button>
          <ReusableJobDetail job={selectedJob} styles={styles} />
        </div>
      )}
    </div>
  );
};

export default MobileClientDashboard;
