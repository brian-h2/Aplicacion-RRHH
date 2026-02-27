// JobContext.js
import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { getAllJobPosts } from '../CRUD/JobPostService';
import { SearchContext } from '../../../components/SearchBar/SearchContext';
import { useLocation, matchPath } from 'react-router-dom';
import stylesJobList from './JobList.module.css';
import stylesClientDashboard from '../../Client/JobPreviewClientDashboard.module.css';


export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobPosts, setJobPosts] = useState([]);
  const { searchTerm, locationTerm, statusTerm } = useContext(SearchContext);

  //Hay que evaluar porque sorteddata viene vacio, probablemente porque las tablas estan vacias.

    const fetchJobPosts = useCallback(async () => {
        try {
        const data = await getAllJobPosts(searchTerm, locationTerm, statusTerm);
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setJobPosts(sortedData);
      } catch (error) {
        console.error('Error fetching job posts:', error);
      }
    }, [searchTerm, locationTerm, statusTerm]);


  useEffect(() => {
    fetchJobPosts();
  }, [fetchJobPosts]);

  const location = useLocation();

  // Define routes that should not display the admin job preview CSS
  const clientStylePaths = ['/clientdashboard',  "/clientdashboard/job/:id", "/clientdashboard/clientjobs", "/clientdashboard/clientjobs/:id"];

  const matchesClientPath = clientStylePaths.some((path) =>
    matchPath({ path, exact: true }, location.pathname)
  );

  // Conditional styling with CSS modules according to pathname
  const styles = matchesClientPath ? stylesClientDashboard : stylesJobList;

 

  return (
    <JobContext.Provider value={{ jobPosts, styles, fetchJobPosts }}>
      {children}
    </JobContext.Provider>
  );
};
