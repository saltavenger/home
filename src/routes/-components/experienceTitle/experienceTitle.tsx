import styles from './experienceTitle.module.css';

interface ExperienceTitleProps {
  title: string;
  company: string;
  date: string;
}

export function ExperienceTitle({ title, company, date }: ExperienceTitleProps) {
  return (
    <div className={styles.experience}>
        <div className={styles.row}>
            <span className={styles.experienceTitle}>{title}</span>
            <span className={styles.experienceDate}>{date}</span>
        </div>
        <span className={styles.experienceCompany}>{company}</span>
    </div>
  );
}