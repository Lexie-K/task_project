import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styles from '@/styles/Home.module.scss';
import { openModal } from '@/store/modalSlice';
import { closeModal } from '@/store/modalSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '100%',
  maxHeight: '100%',
  bgcolor: 'rgba(229, 229, 229, 1)',
  boxShadow: 100,
  border: 'none',
  borderRadius: 'none',
  fontFamily: '--montserrat-font',
  overflow: 'auto',
  '@media(max-width:768px)': {
    minWidth: '100%',
    minHeight: '100%',
  },
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
}) => {
  const dispatch = useDispatch();
  
  const router = useRouter();
 
  const { isOpen } = useSelector(state => state.modal);
  
  const handleClose = () => {
    dispatch(closeModal());
    router.push('');
  };

  const handleOpen = () => {
    dispatch(openModal());
    router.push(`?id=${id}`);
  };

  return (
    <div>
      <Button className={styles.modalLink} onClick={handleOpen}>
        Посмотреть
      </Button>

      {isOpen && <Modal
        open={id === selectedId}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div onClick={handleClose} className={styles.closeBtnModal}>
            {' '}
            <CloseIcon
              fontSize="large"
              stroke="rgba(229, 229, 229, 1)"
              strokeWidth="1"
            />{' '}
          </div>

          <div className={styles.modalApplicationTitle}>{application}</div>
          {city ? (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 1 }}
              className={styles.modalCountryCity}
            >
              {country}, {city}
            </Typography>
          ) : (
            <Typography
              id="modal-modal-title"
              className={styles.modalCountryCity}
            >
              {country}
            </Typography>
          )}
          <div className={styles.modalTitletxt}>{title}</div>

          <div className={styles.modalHiddenContainer}>
            {object ? (
              <Typography className={styles.modalTitleObj}>
                ОБЪЕКТ ВНЕДРЕНИЯ
                <div className={styles.modalHiddentxt}>{object}</div>
              </Typography>
            ) : undefined}

            {solution ? (
              <Typography className={styles.modalTitleSolution}>
                ПРИМЕНЯЕМОЕ РЕШЕНЕИЕ
                <div className={styles.modalHiddentxt}>
                  {solution.description}
                </div>
              </Typography>
            ) : undefined}
            {developer ? (
              <Typography>
                РАЗРАБОТЧИК
                <div className={styles.modalHiddentxt}>{developer}</div>
              </Typography>
            ) : undefined}
          </div>
          <div className={styles.modalHiddenDescripTitle}>ОПИСАНИЕ</div>
          <div
            className={styles.modalHiddenDescriptxt}
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </Box>
      </Modal>
     }
    </div>
  );
};
export default ModalWindow;
