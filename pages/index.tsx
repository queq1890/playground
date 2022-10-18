import type { NextPage } from 'next';

import { QRCodeReader } from '../components/QRCodeReader';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <QRCodeReader />
    </div>
  );
};

export default Home;
