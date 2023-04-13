import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <h2>
          4<span>😕</span>4
        </h2>
        <br />
        Сторінку не знайдено!
      </h1>
      <p>На жаль, такої сторінки не існує у нашому інтренет-магазині.</p>
    </div>
  );
};

export default NotFoundBlock;
