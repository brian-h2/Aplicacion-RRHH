import axios from 'axios';
import * as USER_HELPERS from '../../../utils/userToken';

const jobService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/jobposts`, 
});

// Helper function to get Authorization header
const getAuthHeader = () => {
  const token = USER_HELPERS.getUserToken();
  return token ? { Authorization: token } : {};
};

// Function to create a new job post
export const postJob = (jobData, imageFile) => {

  const formData = new FormData();
  Object.keys(jobData).forEach(key => {
    formData.append(key, jobData[key]);
  });
  if (imageFile) {
    formData.append('image', imageFile);
  }


  return jobService
    .post('/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error creating job post:', error);
      throw error;
    });
};

// Function to get a specific job post by ID
export const getJobPost = (jobId) => {
  return jobService
    .get(`/${jobId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching job post:', error);
      throw error;
    });
};

// Function to update an existing job post
export const updateJobPost = (jobId, updatedJobData) => {
  return jobService
    .put(`/${jobId}`, updatedJobData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error updating job:', error);
      throw error;
    });
};

// Function to delete a job post
export const deleteJobPost = (jobId) => {
  return jobService
    .delete(`/${jobId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error deleting job post:', error);
      throw error;
    });
};

// Function to restore a deleted job post
export const restoreJobPost = async (id) => {
  return jobService
  .post(`/restore/${id}`, undefined, {
      headers: {
        ...getAuthHeader(), // si es JWT
      },
  })
  .then((res) => res.data)
  .catch((error) => {
    console.error('Error restoring job post:', error);
    throw error;
  });
};


// Function to fetch all job posts
export const getAllJobPosts = (searchTerm = '', locationTerm = '', statusTerm = '') => {
  return jobService
    .get('/', {
      params: { searchTerm, locationTerm, statusTerm }, // Use query params for filtering
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error fetching all job posts:', error);
      throw error;
    });
};
