import type { User } from "@/types/user";
import styles from "./UserInfoSection.module.scss";

interface UserInfoSectionProps {
  user: User;
}

function Field({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className={styles.field}>
      <dt className={styles.fieldLabel}>{label}</dt>
      <dd className={styles.fieldValue}>{value || "—"}</dd>
    </div>
  );
}

export function UserInfoSection({ user }: UserInfoSectionProps) {
  const { profile, education, socials, guarantors } = user;

  return (
    <div className={styles.card} role="tabpanel" aria-label="General details">
      {/* Personal Information */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Personal Information</h3>
        <dl className={styles.grid}>
          <Field label="Full Name" value={profile.fullName} />
          <Field label="Phone Number" value={user.phoneNumber} />
          <Field label="Email Address" value={user.email} />
          <Field label="BVN" value={profile.bvn} />
          <Field label="Gender" value={profile.gender} />
          <Field label="Marital Status" value={profile.maritalStatus} />
          <Field label="Children" value={profile.children} />
          <Field label="Type of Residence" value={profile.typeOfResidence} />
        </dl>
      </div>

      {/* Education and Employment */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Education and Employment</h3>
        <dl className={`${styles.grid} ${styles.gridWide}`}>
          <Field label="Level of Education" value={education.levelOfEducation} />
          <Field label="Employment Status" value={education.employmentStatus} />
          <Field label="Sector of Employment" value={education.sectorOfEmployment} />
          <Field label="Duration of Employment" value={education.durationOfEmployment} />
          <Field label="Office Email" value={education.officeEmail} />
          <Field label="Monthly Income" value={education.monthlyIncome} />
          <Field label="Loan Repayment" value={education.loanRepayment} />
        </dl>
      </div>

      {/* Socials */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Socials</h3>
        <dl className={`${styles.grid} ${styles.gridWide}`}>
          <Field label="Twitter" value={socials.twitter} />
          <Field label="Facebook" value={socials.facebook} />
          <Field label="Instagram" value={socials.instagram} />
        </dl>
      </div>

      {/* Guarantors */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Guarantor</h3>
        {guarantors.map((g, i) => (
          <div key={i} className={styles.guarantorBlock}>
            <dl className={`${styles.grid} ${styles.gridWide}`}>
              <Field label="Full Name" value={g.fullName} />
              <Field label="Phone Number" value={g.phoneNumber} />
              <Field label="Email Address" value={g.email} />
              <Field label="Relationship" value={g.relationship} />
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}
