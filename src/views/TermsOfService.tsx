import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  FileText,
  Mail,
  Printer,
  Share2,
  CheckCircle2,
  Building,
  MapPin,
  Scale,
  AlertCircle,
  Shield,
} from 'lucide-react';
import { styles, AppColors } from '../styles/TermsOfService.styles';
import parichayLogo from '../assets/parichay-logo.png';

interface TermsOfServiceProps {
  onBack: () => void;
  isLoggedIn?: boolean;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onNavigateToPrivacy?: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({
  onBack,
  isLoggedIn = false,
  onNavigateToPrivacy,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('section-acceptance');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tocItems = [
    { id: 'section-acceptance', label: '1. Acceptance of Terms' },
    { id: 'section-eligibility', label: '2. Eligibility & Membership' },
    { id: 'section-guidelines', label: '3. Community Code of Conduct' },
    { id: 'section-accounts', label: '4. User Accounts & Security' },
    { id: 'section-family-tree', label: '5. Family Tree & Profiles' },
    { id: 'section-matrimonial', label: '6. Biodata & Matrimonial' },
    { id: 'section-approvals', label: '7. Approvals & Moderation' },
    { id: 'section-prohibited', label: '8. Prohibited Conduct' },
    { id: 'section-content', label: '9. User Content & License' },
    { id: 'section-ip', label: '10. Intellectual Property' },
    { id: 'section-liability', label: '11. Disclaimer & Liability' },
    { id: 'section-termination', label: '12. Account Suspension & Exit' },
    { id: 'section-governing-law', label: '13. Governing Law & Jurisdiction' },
    { id: 'section-modifications', label: '14. Updates to Terms' },
    { id: 'section-contact', label: '15. Contact & Support' },
  ];

  return (
    <div style={styles.container} className="parichay-terms-page">
      {/* Top Navigation Bar */}
      <header style={styles.header} className="parichay-legal-header">
        <div style={styles.brandGroup} className="parichay-brand-group">
          <img src={parichayLogo} alt="PARICHAY Logo" style={styles.logoImg} className="parichay-logo-img" />
          <div>
            <div style={styles.brandTitle} className="parichay-brand-title">PARICHAY</div>
            <div style={styles.brandSubtitle} className="parichay-brand-subtitle">Terms of Service</div>
          </div>
        </div>

        <div style={styles.headerActions} className="parichay-header-actions">
          <button
            onClick={handlePrint}
            className="parichay-btn-outline hide-on-mobile"
            title="Print or Save PDF"
          >
            <Printer size={16} />
            <span>Print</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="parichay-btn-outline parichay-share-btn"
            title="Copy Page Link"
          >
            {copied ? <CheckCircle2 size={16} color={AppColors.green} /> : <Share2 size={16} />}
            <span className="btn-label-desktop">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {onNavigateToPrivacy && (
            <button
              onClick={onNavigateToPrivacy}
              className="parichay-btn-outline parichay-switch-btn"
              title="View Privacy Policy"
            >
              <Shield size={16} />
              <span className="btn-label-desktop">Privacy Policy</span>
              <span className="btn-label-mobile">Privacy</span>
            </button>
          )}

          <button
            onClick={onBack}
            className="parichay-btn-primary parichay-back-btn"
            title={isLoggedIn ? 'Return to Dashboard' : 'Return to Login'}
          >
            <ArrowLeft size={16} />
            <span className="btn-label-desktop">{isLoggedIn ? 'Back to Dashboard' : 'Back to Sign In'}</span>
            <span className="btn-label-mobile">{isLoggedIn ? 'Dashboard' : 'Sign In'}</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section style={styles.heroBanner} className="parichay-hero-banner">
        <div style={styles.heroLogoContainer} className="parichay-hero-logo">
          <img src={parichayLogo} alt="PARICHAY" style={styles.heroLogoImg} />
        </div>

        <div style={styles.heroBadge}>
          <Scale size={14} />
          <span>Official Terms of Service</span>
        </div>

        <h1 style={styles.heroTitle} className="parichay-hero-title">Terms of Service of PARICHAY</h1>

        <p style={styles.heroSubtitle} className="parichay-hero-subtitle">
          Welcome to PARICHAY. These Terms of Service govern your access to and use of the PARICHAY community platform, mobile applications, admin consoles, and related services.
        </p>

        <div style={styles.metaRow} className="parichay-meta-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={14} color={AppColors.orange} />
            <span>Effective Date: <strong>September 2026</strong></span>
          </div>
          <span className="parichay-meta-dot">•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={14} color={AppColors.indigo} />
            <span>Version: <strong>1.0</strong></span>
          </div>
          <span className="parichay-meta-dot">•</span>
          <div>
            Community: <strong>PARICHAY Community Platform</strong>
          </div>
        </div>
      </section>

      {/* Content Layout */}
      <div style={styles.contentWrapper} className="privacy-content-wrapper">
        {/* Table of Contents Sticky Sidebar */}
        <aside style={styles.tocSidebar} className="hide-on-mobile privacy-toc">
          <div style={styles.tocTitle}>Table of Contents</div>
          <ul style={styles.tocList}>
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="privacy-toc-link"
                  style={{
                    ...styles.tocLink,
                    backgroundColor:
                      activeSection === item.id ? AppColors.orangeLight : 'transparent',
                    color:
                      activeSection === item.id ? AppColors.orangeDark : AppColors.textMid,
                    fontWeight: activeSection === item.id ? 700 : 500,
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Document Content */}
        <main style={styles.mainCard} className="privacy-main-panel">
          {/* Notice Box */}
          <div style={styles.noticeBox}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <AlertCircle size={22} color={AppColors.indigo} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.98rem', display: 'block', marginBottom: '6px' }}>
                  Important Agreement Notice
                </strong>
                <p style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.6 }}>
                  By downloading, registering for, accessing, or using PARICHAY, you certify that you have read, understood, and agreed to be bound by these Terms of Service and our{' '}
                  <span
                    onClick={onNavigateToPrivacy}
                    style={{ color: AppColors.orange, cursor: onNavigateToPrivacy ? 'pointer' : 'default', textDecoration: 'underline', fontWeight: 600 }}
                  >
                    Privacy Policy
                  </span>
                  . If you do not agree to these terms, please do not use the platform.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Acceptance of Terms */}
          <section id="section-acceptance" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>1</div>
              <h2 style={styles.sectionTitle}>Acceptance of Terms</h2>
            </div>
            <p style={styles.sectionParagraph}>
              These Terms of Service (“Terms”, “Agreement”) constitute a legally binding agreement between you (“User”, “Member”, “you”, or “your”) and PARICHAY (“Platform”, “App”, “we”, “us”, or “our”).
            </p>
            <p style={styles.sectionParagraph}>
              Your access to and use of PARICHAY is conditioned upon your acceptance of and compliance with these Terms. These Terms apply to all visitors, registered members, administrators, and others who access or use the Service.
            </p>
            <p style={styles.sectionParagraph}>
              By creating an account, requesting membership, submitting personal information, or otherwise using our platform, you acknowledge and agree to comply with all provisions set forth herein.
            </p>
          </section>

          {/* Section 2: Eligibility & Membership */}
          <section id="section-eligibility" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>2</div>
              <h2 style={styles.sectionTitle}>Eligibility & Membership</h2>
            </div>
            <p style={styles.sectionParagraph}>
              PARICHAY is a verified community networking platform established to connect verified members, families, and organizations within the community.
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                <strong>Community Affiliation:</strong> You must belong to or have a genuine affiliation with the designated community represented by PARICHAY.
              </li>
              <li style={styles.bulletItem}>
                <strong>Legal Age:</strong> You must be at least 18 years of age or possess legal parental/guardian consent if you are registering an account or managing family records.
              </li>
              <li style={styles.bulletItem}>
                <strong>Accurate Information:</strong> All information provided during registration, verification, and profile creation must be true, complete, and accurate.
              </li>
            </ul>
          </section>

          {/* Section 3: Community Code of Conduct */}
          <section id="section-guidelines" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>3</div>
              <h2 style={styles.sectionTitle}>Community Code of Conduct</h2>
            </div>
            <p style={styles.sectionParagraph}>
              PARICHAY is built upon mutual trust, respect, and cultural harmony. All members agree to uphold the following standards:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                <strong>Respectful Engagement:</strong> Treat fellow members, elders, community leaders, and administrators with courtesy and respect.
              </li>
              <li style={styles.bulletItem}>
                <strong>No Harassment:</strong> Bullying, intimidation, harassment, hate speech, defamation, or unsolicited commercial messaging is strictly prohibited.
              </li>
              <li style={styles.bulletItem}>
                <strong>Privacy of Others:</strong> Do not capture, screenshot, republish, or distribute contact numbers, photographs, or private details of fellow community members without their express permission.
              </li>
            </ul>
          </section>

          {/* Section 4: User Accounts & Security */}
          <section id="section-accounts" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>4</div>
              <h2 style={styles.sectionTitle}>User Accounts & Security</h2>
            </div>
            <p style={styles.sectionParagraph}>
              Account authentication in PARICHAY is secured via phone number verification (OTP) and administrative approval procedures.
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                You are responsible for maintaining the confidentiality of your login credentials and security tokens.
              </li>
              <li style={styles.bulletItem}>
                You are solely responsible for all activities occurring under your registered account.
              </li>
              <li style={styles.bulletItem}>
                You must immediately notify the administration team if you discover or suspect any unauthorized access or breach of account security.
              </li>
            </ul>
          </section>

          {/* Section 5: Family Tree & Member Profiles */}
          <section id="section-family-tree" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>5</div>
              <h2 style={styles.sectionTitle}>Family Tree & Member Profiles</h2>
            </div>
            <p style={styles.sectionParagraph}>
              PARICHAY enables members to document genealogy, family trees, and ancestral lineages to foster community heritage and preservation.
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                <strong>Authorization for Family Data:</strong> When adding living family members, parents, spouses, or children to the family tree, you confirm that you have informed them and have their consent to record their names and relations.
              </li>
              <li style={styles.bulletItem}>
                <strong>Integrity of Lineage:</strong> Members agree not to deliberately falsify family connections, bloodlines, or ancestral records.
              </li>
              <li style={styles.bulletItem}>
                <strong>Dispute Resolution:</strong> If multiple members claim conflicting family linkages or records, community administrators hold the authority to mediate, review verification documents, and adjust records.
              </li>
            </ul>
          </section>

          {/* Section 6: Biodata & Matrimonial Services */}
          <section id="section-matrimonial" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>6</div>
              <h2 style={styles.sectionTitle}>Biodata & Matrimonial Services</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The platform may offer matrimonial biodata exchange and matrimonial listings for community members seeking life partners:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                <strong>Voluntary Submission:</strong> Submitting biodata, educational records, occupational details, and horoscopic information is entirely voluntary.
              </li>
              <li style={styles.bulletItem}>
                <strong>Independent Due Diligence:</strong> PARICHAY provides a facilitation portal only. The platform and administrators do not guarantee the background, character, marital status, or claims of any biodata candidate. Families are strongly advised to conduct independent due diligence before proceeding with marriage proposals.
              </li>
              <li style={styles.bulletItem}>
                <strong>Dignity & Privacy:</strong> Matrimonial biodata and candidate photographs must never be misused, distributed outside the community, or weaponized for commercial gain.
              </li>
            </ul>
          </section>

          {/* Section 7: Approvals & Moderation */}
          <section id="section-approvals" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>7</div>
              <h2 style={styles.sectionTitle}>Approvals & Administrative Moderation</h2>
            </div>
            <p style={styles.sectionParagraph}>
              To maintain the security, authenticity, and sanctity of the community network, PARICHAY utilizes an administrative approval process:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                New user sign-ups, public profile publishing, and significant profile updates may require verification and clearance from appointed community administrators.
              </li>
              <li style={styles.bulletItem}>
                Administrators reserve the right to accept, reject, or request clarifying documentation for any registration or update request.
              </li>
              <li style={styles.bulletItem}>
                Community administrators serve in a supervisory capacity to uphold community interests and verify valid membership.
              </li>
            </ul>
          </section>

          {/* Section 8: Prohibited Conduct */}
          <section id="section-prohibited" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>8</div>
              <h2 style={styles.sectionTitle}>Prohibited Conduct</h2>
            </div>
            <p style={styles.sectionParagraph}>
              When using the PARICHAY platform, you expressly agree that you will not:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                Scrape, crawl, harvest, or extract data, phone numbers, or images using automated software, scripts, or bots.
              </li>
              <li style={styles.bulletItem}>
                Impersonate any individual, family, community leader, or administrative official.
              </li>
              <li style={styles.bulletItem}>
                Upload or transmit harmful viruses, spyware, corrupted files, or disruptive code.
              </li>
              <li style={styles.bulletItem}>
                Publish false, obscene, defamatory, illegal, or politically inflammatory content.
              </li>
              <li style={styles.bulletItem}>
                Attempt to bypass authentication measures, probe security vulnerabilities, or interfere with network infrastructure.
              </li>
            </ul>
          </section>

          {/* Section 9: User Content & License */}
          <section id="section-content" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>9</div>
              <h2 style={styles.sectionTitle}>User Content & License</h2>
            </div>
            <p style={styles.sectionParagraph}>
              You retain ownership of any photos, biodata, genealogical notes, and personal content you post or submit to the platform.
            </p>
            <p style={styles.sectionParagraph}>
              By submitting content to PARICHAY, you grant the platform a limited, non-exclusive, royalty-free license to store, host, display, and format your content solely for the purpose of operating the community directory, family tree, and related features in accordance with your privacy preferences.
            </p>
          </section>

          {/* Section 10: Intellectual Property */}
          <section id="section-ip" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>10</div>
              <h2 style={styles.sectionTitle}>Intellectual Property</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The PARICHAY name, brand identity, logo, UI design, color schemes, graphics, code, and database architecture are protected by applicable trademark, copyright, and intellectual property laws.
            </p>
            <p style={styles.sectionParagraph}>
              Unauthorized reproduction, modification, distribution, or reverse engineering of any portion of the platform is strictly prohibited.
            </p>
          </section>

          {/* Section 11: Disclaimers & Limitation of Liability */}
          <section id="section-liability" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>11</div>
              <h2 style={styles.sectionTitle}>Disclaimers & Limitation of Liability</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The platform and its services are provided on an <strong>“AS IS”</strong> and <strong>“AS AVAILABLE”</strong> basis without warranties of any kind, either express or implied.
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                We do not warrant that service will be uninterrupted, error-free, completely secure, or free from server downtimes.
              </li>
              <li style={styles.bulletItem}>
                We are not liable for any interpersonal disputes, matrimonial outcomes, business transactions, or communications conducted between members.
              </li>
              <li style={styles.bulletItem}>
                To the fullest extent permitted by applicable law, PARICHAY, its developers, operators, and community administrators shall not be held liable for any indirect, incidental, punitive, or consequential damages resulting from platform usage.
              </li>
            </ul>
          </section>

          {/* Section 12: Account Suspension & Termination */}
          <section id="section-termination" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>12</div>
              <h2 style={styles.sectionTitle}>Account Suspension & Termination</h2>
            </div>
            <p style={styles.sectionParagraph}>
              We reserve the right to suspend, deactivate, or permanently terminate your account and revoke your access to the platform without prior notice if:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>
                You breach or violate any provision of these Terms of Service or community guidelines.
              </li>
              <li style={styles.bulletItem}>
                You provide false identity or fabricated genealogy documents.
              </li>
              <li style={styles.bulletItem}>
                Your membership is flagged for harassment, malicious activity, or fraudulent conduct.
              </li>
              <li style={styles.bulletItem}>
                You submit an official request to permanently delete your account and personal records.
              </li>
            </ul>
          </section>

          {/* Section 13: Governing Law & Dispute Resolution */}
          <section id="section-governing-law" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>13</div>
              <h2 style={styles.sectionTitle}>Governing Law & Jurisdiction</h2>
            </div>
            <p style={styles.sectionParagraph}>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with the platform shall first be submitted to the designated community mediation committee.
            </p>
            <p style={styles.sectionParagraph}>
              In the event that informal resolution is unsuccessful, legal proceedings shall be subject to the exclusive jurisdiction of the competent courts having jurisdiction over the registered community headquarters.
            </p>
          </section>

          {/* Section 14: Updates to Terms */}
          <section id="section-modifications" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>14</div>
              <h2 style={styles.sectionTitle}>Updates to Terms of Service</h2>
            </div>
            <p style={styles.sectionParagraph}>
              We may revise these Terms of Service from time to time to accommodate platform advancements, legal compliance requirements, or operational changes.
            </p>
            <p style={styles.sectionParagraph}>
              When updates are published, the revised effective date will be posted at the top of this document. Continued use of the platform following the publication of revised terms constitutes your acceptance of the updated terms.
            </p>
          </section>

          {/* Section 15: Contact & Support */}
          <section id="section-contact" style={{ ...styles.section, marginBottom: 0 }}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>15</div>
              <h2 style={styles.sectionTitle}>Contact & Support</h2>
            </div>
            <p style={styles.sectionParagraph}>
              If you have any questions, clarifications, feedback, or grievance regarding these Terms of Service, please reach out to our administration team:
            </p>

            <div style={styles.contactGrid}>
              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Building size={18} color={AppColors.orange} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>Entity Details</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid, lineHeight: 1.5 }}>
                  PARICHAY Community Platform<br />
                  Community Administration Board
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Mail size={18} color={AppColors.orange} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>Email Inquiries</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid, lineHeight: 1.5 }}>
                  legal@parichay.community<br />
                  admin@parichay.community
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <MapPin size={18} color={AppColors.orange} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>Administration Office</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid, lineHeight: 1.5 }}>
                  PARICHAY Administrative Headquarters
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer style={styles.footer} className="parichay-legal-footer">
        <div>
          © {new Date().getFullYear()} PARICHAY. All rights reserved.
        </div>
        <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ background: 'none', border: 'none', color: AppColors.orange, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
          >
            Back to Top ↑
          </button>
          <span>•</span>
          {onNavigateToPrivacy && (
            <>
              <button
                onClick={onNavigateToPrivacy}
                style={{ background: 'none', border: 'none', color: AppColors.indigo, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                Privacy Policy
              </button>
              <span>•</span>
            </>
          )}
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: AppColors.textMuted, cursor: 'pointer', fontSize: '0.85rem' }}
          >
            {isLoggedIn ? 'Dashboard' : 'Sign In'}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
