import React, { useEffect, useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { getJobPost, updateJobPost } from './JobPostService';
import JobForm from './JobForm';
import './JobForms.css';
import { JobContext } from '../Jobs/JobsContext';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema } from '../../../schemas/jobSchema';

const JobEditForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { fetchJobPosts } = useContext(JobContext);

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  // 🔽 Cargar datos del backend
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobPost(jobId);
        reset(data);              // 👈 precarga inputs
        setImageUrl(data.imageUrl || null);
      } catch (error) {
        console.error('Failed to fetch job details', error);
      }
    };

    if (jobId) fetchJob();
  }, [jobId, reset]);

  const handleChangeFile = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    setImageFile(null);
  };

  // 🔼 Submit con FormData
  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        formData.append(key, value);
      }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    if (imageUrl === '') {
      formData.append('imageUrl', '');
    }

    try {
      await updateJobPost(jobId, formData);
      setModalMessage('Actualizado correctamente.');
      setShowModal(true);
    } catch (error) {
      setModalMessage('No fue posible actualizar, intente nuevamente.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    fetchJobPosts();
    setShowModal(false);
    navigate(`/dashboard/job/${jobId}`);
  };

  const handleUndo = () => {
    navigate(`/dashboard/job/${jobId}`);
  };

  return (
    <div>
      <div className="actionbutton">
        <span className="material-icons actionbtn" onClick={handleUndo}>
          undo
        </span>
      </div>

      <JobForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(onSubmit)}
        handleChangeFile={handleChangeFile}
        handleRemoveImage={handleRemoveImage}
        imageUrl={imageUrl}
        buttonLabel="Actualizar"
      />

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default JobEditForm;