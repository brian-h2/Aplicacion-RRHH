import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { getJobPost, updateJobPost } from './JobPostService';
import JobForm from './JobForm';
import "./JobForms.css"
import { JobContext } from '../Jobs/JobsContext';


const JobEditForm = () => {
  const { jobId } = useParams(); // Get jobId from the URL parameters
  const [jobData, setJobData] = useState(null); // State to store the job details to be edited
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State to store modal message
  const navigate = useNavigate();
  const { fetchJobPosts } = useContext(JobContext);


  // Fetch job details to prefill the form when component mounts
  useEffect(() => {
    if (jobId) {
      const fetchJob = async () => {
        try {
          const data = await getJobPost(jobId); // Fetch the specific job post details using its ID
          setJobData(data); // Set the fetched data in the state to prefill the form
        } catch (error) {
          console.error('Failed to fetch job details', error);
        }
      };
      fetchJob();
    }
  }, [jobId]);

  const handleRemoveImage = () => {
    setJobData(prev => ({
      ...prev,
      imageUrl: "",
      imageFile: null
    }));
  };

  const handleChangeFile = (e) => {
  setJobData(prev => ({
    ...prev,
      imageFile: e.target.files[0]
    }));
  };


  // Handle form submission for updating a job post
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting job update with data:", jobData);

    const formData = new FormData();

    Object.entries(jobData).forEach(([key, value]) => {
      if (
        value !== null &&
        value !== undefined &&
        value !== "" &&
        key !== "imageFile"
      ) {
        formData.append(key, value);
      }
    });

    if (jobData.imageFile) {
      formData.append("image", jobData.imageFile);
    }

    if (jobData.imageUrl === "") {
      formData.append("imageUrl", "");
    }

    try {
      await updateJobPost(jobId, formData);
      setModalMessage("Actualizado correctamente.");
      setShowModal(true);
    } catch (error) {
      setModalMessage("No fue posible actualizar, intente nuevamente.");
      setShowModal(true);
    }
  };

  // Handle changes to form inputs and update the job data in state
  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  // Close the modal dialog
  const closeModal = () => {
    fetchJobPosts()
     setShowModal(false);
    navigate(`/dashboard/job/${jobId}`)
  };

  // Show a loading message if the job data has not been fetched yet
  if (!jobData) return <div>Loading...</div>;

  const handleUndo = () => {
    navigate(`/dashboard/job/${jobId}`)
 }

  // Render the form and modal component
  return (
    <div>
      <div className="actionbutton">
      <span className="material-icons actionbtn" onClick={handleUndo} >undo</span>

      </div>
      <JobForm
        jobData={jobData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeFile={handleChangeFile}
        handleRemoveImage={handleRemoveImage}
        buttonLabel="Actualizar"
      />
      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default JobEditForm;
