import { dataSelector } from '@/store/postSlice';
import { Box } from '@mui/material';
import styles from '../styles/Home.module.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';


const FilterCategory = ({
  applicationChangeHandler,
  applicationResetHandler,
}) => {
  const data = useSelector(dataSelector);

  const applications = data.map(obj => obj.application);

  const unique = new Set(applications);

  const uniks = [...unique];
  

  return (
    <div>
      <Box>
        {uniks
          .sort((a, b) => {
            let counterA = 0;
            let counterB = 0;
            data.forEach(item => {
              if (item.application === a) counterA++;
              if (item.application === b) counterB++;
            });
            return counterB - counterA;
          })
          
          .map(application => (
            <div key={application} className={styles.filterContainer}>
              <button className={styles.uniksBtns}
              
              onClick={() => applicationChangeHandler(application)}
              
            >
              {application}
            </button>
            </div>
          ))}
      
      <div className={styles.filterContainer}>
      <div className={styles.imageFilter}>
        <Image width='52' height='54' src="/filterpic.png" alt="Filter" />
      </div>
      <button
        className={styles.resetBtn}
        onClick={() => applicationResetHandler()}
      >
        
        Cбросить все фильтры
      </button>
      </div>
    </Box>  
    </div>
  );
};

export default FilterCategory;
