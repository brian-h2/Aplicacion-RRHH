import React, { useContext } from "react";
import { JobContext } from "./JobsContext";
import { formatDate } from "../../../components/components";


export default function JobPreview({job}) {
    const { styles } = useContext(JobContext);
    return (
            <div className={styles.jobPostPreview}>
                <div className={styles.headerRow}>
                    <h3 className={styles.jobTitle}>{job.title}</h3>

                    <span
                    className={
                        job.isDeleted
                        ? styles.statusBadgeClosed
                        : styles.statusBadgeActive
                    }
                    >
                    {job.isDeleted ? "Cerrada" : "Activa"}
                    </span>
                </div>
                <p className="job-detail-row">
                    <strong>Empresa: </strong>
                    {job.company}</p>
                <p className="job-detail-row">
                    <strong>Ubicación: </strong>
                    {job.locationTerm}</p>
                <p className="job-detail-row">
                    <strong>Disponibilidad: </strong>
                    {job.employmentType}</p>
                <p className="job-detail-row">
                    <strong>Publicado: </strong>
                    {formatDate(job.createdAt)}
                </p>             
            </div>          
        )
}
