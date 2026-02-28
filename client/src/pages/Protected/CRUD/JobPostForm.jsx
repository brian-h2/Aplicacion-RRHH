import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { postJob } from './JobPostService';
import JobForm from './JobForm';
import { JobContext } from '../Jobs/JobsContext';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobSchema } from '../../../schemas/jobSchema';

const JobPostForm = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [newJobId, setNewJobId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const navigate = useNavigate();
  const { fetchJobPosts } = useContext(JobContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      contactEmail: 'cmentaseleccion@gmail.com',
    },
  });

  const handleChangeFile = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      const createdJob = await postJob(data, imageFile);
      setModalMessage('Publicado correctamente.');
      setNewJobId(createdJob._id);
      setShowModal(true);
      fetchJobPosts();
      reset();
      setImageFile(null);
    } catch (error) {
      setModalMessage('No fue posible publicarlo, intente nuevamente.');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (newJobId) {
      navigate(`/dashboard/job/${newJobId}`);
    }
  };

  return (
    <div>
      <div className="prediv-postform"></div>

      <JobForm
        register={register}
        errors={errors}
        handleChangeFile={handleChangeFile}
        handleSubmit={handleSubmit(onSubmit)}
        buttonLabel="Publicar"
      />

      {showModal && <Modal message={modalMessage} onClose={closeModal} />}
    </div>
  );
};

export default JobPostForm;