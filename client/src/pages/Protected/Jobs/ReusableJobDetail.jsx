import React, {useEffect, useState} from "react";
import { formatDate } from "../../../components/components";
import { JobDescription } from "../../../components/components";
import { useParams } from "react-router-dom";
import { getJobPost } from "../CRUD/JobPostService";

export default function ReusableJobDetail({ job, styles }) {
    const { jobId } = useParams(); // Extract jobId from the URL
    const [jobData, setJobData] = useState(job);

    // Fetch job details if the job prop is null and there's a jobId in the URL
    useEffect(() => {
        if (!job && jobId) {
            const fetchJobById = async () => {
                try {
                    const fetchedJob = await getJobPost(jobId);
                    setJobData(fetchedJob);
                } catch (error) {
                    console.error("Failed to fetch job details:", error);
                }
            };
            fetchJobById();
        } else if (job) {
            setJobData(job);
        }
    }, [job, jobId]);

    if (!jobData) {
        return null; // Return null or a loading state if job is not available
    }
    // Constructing the Gmail link
    const mailToLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${jobData.contactEmail}&su=${jobData.applicationCode}&body=Estimada Cecilia Menta,%0D%0A%0D%0A Estoy interesado/a en aplicar al trabajo de ${jobData.title}.%0D%0A%0D%0A Adjunto CV y carta de presentación.%0D%0A%0D%0A Saludos Cordiales, %0D%0A[Tu nombre]`;

    return (
        <div className={styles.wholeJobDiv}>
            <div className={styles.headerRow}>
                <h3 className={styles.jobTitle}>{jobData.title}</h3>

                <span
                className={
                    jobData.isDeleted
                    ? styles.statusBadgeClosed
                    : styles.statusBadgeActive
                }
                >
                {jobData.isDeleted ? "Cerrada" : "Activa"}
                </span>
            </div>
            <p className="job-detail-row">
                <strong>Empresa: </strong>
                {jobData.company}
            </p>
            <p className="job-detail-row">
                <strong>Ubicación:</strong>
                {jobData.locationTerm}
            </p>

            <p className="job-detail-row">
            <strong>Disponibilidad:</strong>
            {jobData.employmentType}
            </p>

            <p className="job-detail-row">
            <strong>Modalidad:</strong>
            {jobData.employmentStyle}
            </p>

            <p className="job-detail-row">
                <strong>Descripción:</strong>
                <JobDescription description={jobData.description} />
            </p>
            {jobData.salaryRange && (
                <p className="job-detail-row">                    
                    <strong>Salario: </strong>
                    {jobData.salaryRange}
                </p>
            )}
            {jobData.contactEmail && (
                <p className="job-detail-row">
                    <strong>Email de contacto: </strong>
                    {jobData.contactEmail}
                </p>
               
            )}
            {/* {jobData.applicationCode && (
                  <p>
                  <strong>Codigo Ref. Email: </strong>
              {jobData.applicationCode}
          </p>

            )} */}
            <div className="apply-links">    
                {jobData.linkedinLink && !jobData.isDeleted && (
                    <p>
                        <a
                            href={jobData.linkedinLink}
                            className="linkedin-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <strong>LinkedIn</strong>
                        </a>
                    </p>
                )}
                <p className="Mail-link-div">
                    <button
                        disabled={jobData.isDeleted}
                        className={`apply-btn ${jobData.isDeleted ? "disabled" : ""}`}
                        onClick={() => {
                            if (!jobData.isDeleted) window.open(mailToLink, "_blank");
                        }}
                    >
                        Aplicar 
                        <span className="material-symbols-outlined">mail</span>
                    </button>
                </p>        
           </div>
           <div className="image">
            {jobData.imageUrl && (
                <img src={jobData.imageUrl} alt={`${jobData.company} logo`} />
            )}
           </div>
           <p className="job-detail-row">
                <strong>Publicado: </strong>
                {formatDate(job.createdAt)}
            </p>
        </div>
    );
}
