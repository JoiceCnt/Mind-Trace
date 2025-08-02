import React from "react";

function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: August 2, 2025</em></p>

      <h2>1. What We Collect</h2>
      <ul>
        <li><strong>Personal Data:</strong> Name, email address, user type (patient/professional).</li>
        <li><strong>Emotional Data:</strong> Mood entries, comments, timestamps.</li>
        <li><strong>Professional Data:</strong> Appointments, notes (for professionals only).</li>
        <li><strong>Usage Data:</strong> App activity and basic device information.</li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <ul>
        <li>To provide personalized support and feedback.</li>
        <li>To connect patients with their assigned professionals.</li>
        <li>To improve the app’s functionality and experience.</li>
        <li>We never sell your data to third parties.</li>
      </ul>

      <h2>3. Data Storage and Security</h2>
      <p>
        Data is encrypted and stored securely in compliance with GDPR. Only authorized users (you and your assigned therapist) can view your emotional logs.
      </p>

      <h2>4. Data Sharing</h2>
      <p>
        We do <strong>not</strong> share your data with advertisers or third parties. Therapists see patient data only when authorized and necessary for treatment.
      </p>

      <h2>5. Your Rights</h2>
      <ul>
        <li>Access your personal data.</li>
        <li>Request correction or deletion of your data.</li>
        <li>Withdraw consent to data processing at any time.</li>
      </ul>

      <h2>6. Children’s Privacy</h2>
      <p>
        MindTrace is intended for users aged 16 and above. If you believe a minor is using the app without consent, contact us.
      </p>

      <h2>7. Updates</h2>
      <p>
        This Privacy Policy may be updated. We will notify users of any significant changes.
      </p>

      <h2>8. Contact</h2>
      <p>
        For privacy-related concerns, contact us at <a href="mailto:support@mindtraceapp.com">support@mindtraceapp.com</a>.
      </p>
    </div>
  );
}

export default PrivacyPolicy;
