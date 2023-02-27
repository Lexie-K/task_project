import { Button, Grid, Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import React from 'react';
import ModalCard from '@/components/ModalCard';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.scss';
import { applicationSelector } from '@/store/postSlice';
import moment from 'moment/moment';

const CardsLayout = ({ filter }) => {
  const filteredItems = useSelector(applicationSelector);
  const [showAll, setShowAll] = useState(false);
  const [showAllFiltered, setShowAllFiltered] = useState(false);
  const router = useRouter();

  const handleBtn = () => {
    setShowAll(!showAll);
    setShowAllFiltered(!showAllFiltered);
  };
  const dataDisplay = showAll ? filteredItems : filteredItems.slice(0, 8);
  const dataFilteredDisplay = showAllFiltered
    ? filteredItems
    : filteredItems.slice(0, 8);

  return (
    <>
      <main>
        <div>
          <Grid container rowSpacing={3} columnSpacing={2}>
            {(filter ? dataFilteredDisplay : dataDisplay).map(item => (
              <Grid
                item
                xs={12}
                sm={3}
                md={3}
                lg={3}
                key={item.id}
                className={styles.cards}
              >
                <Card
                  sx={{
                    p: '20px 1rem',
                    width: '100%',
                    height: '90%',
                    borderRadius: '0%',
                  }}
                >
                  {item.city ? (
                    <Typography className={styles.countryCityTitle}>
                      {' '}
                      {item.country}, {item.city}
                    </Typography>
                  ) : (
                    <Typography className={styles.countryCityTitle}>
                      {item.country}
                    </Typography>
                  )}
                  <Typography className={styles.titleStyle}>
                    {item.title}
                  </Typography>

                  <ModalCard
                    id={item.id}
                    selectedId={router.query.id}
                    title={item.title}
                    country={item.country}
                    city={item.city}
                    application={item.application}
                    object={item.object}
                    solution={item.solution}
                    developer={item.developer}
                    description={item.description}
                  />
                </Card>
                <div>
                  {!item.updated ? (
                    <div className={styles.date}>
                      <p>
                        Добавлено {moment(item.created).format('DD.MM.YYYY')}
                      </p>
                    </div>
                  ) : (
                    <div className={styles.date}>
                      <p>
                        Обновлено {moment(item.updated).format('DD.MM.YYYY')}
                      </p>
                    </div>
                  )}
                </div>
              </Grid>
            ))}
          </Grid>

          {(filter && filteredItems.length > 7) ||
          (!filter && filteredItems.length > 7) ? (
            <Button className={styles.showBtn} onClick={handleBtn}>
              {showAll || showAllFiltered ? 'Свернуть все' : 'Показать все'}
            </Button>
          ) : undefined}
        </div>
      </main>
    </>
  );
};

export default CardsLayout;
