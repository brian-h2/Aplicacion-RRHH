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
    <div className={styles.headerInfo}>
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

        <p><strong>Empresa:</strong> {jobData.company}</p>
        <p><strong>Ubicación:</strong> {jobData.locationTerm}</p>
        <p><strong>Disponibilidad:</strong> {jobData.employmentType}</p>
        <p><strong>Modalidad:</strong> {jobData.employmentStyle}</p>
    </div>

    {jobData.imageUrl && (
        <div className={styles.headerImage}>
            <img src={jobData.imageUrl} alt={`${jobData.company} logo`} />
        </div>
    )}
</div>
        </div>
    );
}
