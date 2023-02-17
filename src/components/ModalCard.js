import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../styles/Home.module.scss';
import { AutoAwesomeMosaicRounded } from '@mui/icons-material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxHeight: '100%',
  bgcolor: 'background.paper',
  boxShadow: 100,
  border: 'none',
  borderRadius: 'none',
  p: 4,
};

const ModalWindow = ({
  description,
  title,
  id,
  selectedId,
  application,
  country,
  city,
  object,
  solution,
  developer,
  closeModal,
}) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(state => state.posts);
  const router = useRouter();

  const handleClose = () => {
    if (isOpen === false) dispatch(closeModal);
    router.push('');
  };
  return (
    <div>
      <Button
        className={styles.modalLink}
        onClick={() => router.push(`?id=${id}`)}
      >
        Посмотреть
      </Button>
      <Modal
        open={id === selectedId}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div onClick={handleClose} className={styles.closeBtnModal}>
            {' '}
            <CloseIcon fontSize= 'large'/>{' '}
          </div>

          <div className={styles.modalApplicationTitle}>{application}</div>
          {city ? (
            <Typography id="modal-modal-description" sx={{ mt: 1 }} className={styles.modalCountryCity}>
              {country}, {city}
            </Typography>
          ) : (
            <Typography id="modal-modal-title" className={styles.modalCountryCity}>{country}</Typography>
          )}
          <div className={styles.modalTitletxt}>{title}</div>
          <div>
            <div className={styles.modalHiddenContainer}>
              {object ? (
                <Typography>
                  ОБЪЕКТ ВНЕДРЕНИЯ                  
                  <div className={styles.modalHiddentxt}>{object}</div>
                </Typography>
              ) : undefined}

              {solution ? (
                <Typography>
                 ПРИМЕНЯЕМОЕ РЕШЕНЕИЕ
                <div className={styles.modalHiddentxt}>{solution.description}</div> 
                </Typography>
              ) : undefined}
              {developer ? (
                <Typography>
                  РАЗРАБОТЧИК
                  <div className={styles.modalHiddentxt}>{developer}</div> 
                </Typography>
              ) : undefined}
            </div>
            <div className={styles.modalHiddenDescripTitle}>
              ОПИСАНИЕ
            </div> 
              <div className={styles.modalHiddenDescriptxt}>{description}</div>
              
            
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalWindow;
