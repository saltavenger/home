import styles from './experienceTitle.module.css';

interface ExperienceTitleProps {
  title: string;
  company: string;
  date: string;
}

export function ExperienceTitle({ title, company, date }: ExperienceTitleProps) {
  return (
    <h3 className={styles.experience}>
        <span className={styles.experienceTitle}>{title}</span>
        <span className={styles.experienceCompany}>{company}</span>
        <span className={styles.experienceDate}>{date}</span>
    </h3>
  );
}