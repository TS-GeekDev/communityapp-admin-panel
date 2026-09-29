import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Lock,
  FileText,
  Mail,
  Printer,
  Share2,
  CheckCircle2,
  UserCheck,
  Building,
  Phone,
  MapPin,
  Eye,
} from 'lucide-react';
import { styles, AppColors } from '../styles/PrivacyPolicy.styles';
import parichayLogo from '../assets/parichay-logo.png';

interface PrivacyPolicyProps {
  onBack: () => void;
  isLoggedIn?: boolean;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onNavigateToTerms?: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  onBack,
  isLoggedIn = false,
  onNavigateToTerms,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('section-purpose');

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
    { id: 'section-purpose', label: '1. Purpose of the App' },
    { id: 'section-collection', label: '2. Information We Collect' },
    { id: 'section-family', label: '3. Family & Family Tree' },
    { id: 'section-biodata', label: '4. Biodata Information' },
    { id: 'section-business', label: '5. Business & Professional' },
    { id: 'section-privacy-controls', label: '6. Privacy & Visibility Controls' },
    { id: 'section-verification', label: '7. Community Access & Verification' },
    { id: 'section-search', label: '8. Search and Discovery' },
    { id: 'section-usage', label: '9. How We Use Personal Information' },
    { id: 'section-notifications', label: '10. Notifications' },
    { id: 'section-sharing', label: '11. Sharing & Disclosure' },
    { id: 'section-family-profiles', label: '12. Family-Created Profiles' },
    { id: 'section-security', label: '13. Information Security' },
    { id: 'section-retention', label: '14. Data Retention' },
    { id: 'section-rights', label: '15. User Rights & Control' },
    { id: 'section-deletion', label: '16. Deletion & Account Closure' },
    { id: 'section-third-party', label: '17. Third-Party Services' },
    { id: 'section-children', label: "18. Children's & Minors' Info" },
    { id: 'section-settings-changes', label: '19. Privacy Settings Changes' },
    { id: 'section-policy-changes', label: '20. Changes to This Policy' },
    { id: 'section-contact', label: '21. Contact Us' },
    { id: 'section-consent', label: '22. Consent & Acknowledgement' },
  ];

  return (
    <div style={styles.container} className="parichay-privacy-page">
      {/* Top Navigation Bar */}
      <header style={styles.header} className="parichay-legal-header">
        <div style={styles.brandGroup} className="parichay-brand-group">
          <img src={parichayLogo} alt="PARICHAY Logo" style={styles.logoImg} className="parichay-logo-img" />
          <div>
            <div style={styles.brandTitle} className="parichay-brand-title">PARICHAY</div>
            <div style={styles.brandSubtitle} className="parichay-brand-subtitle">Privacy & Legal Information</div>
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
            title="Copy page link"
          >
            {copied ? <CheckCircle2 size={16} color={AppColors.green} /> : <Share2 size={16} />}
            <span className="btn-label-desktop">{copied ? 'Copied' : 'Share'}</span>
          </button>

          {onNavigateToTerms && (
            <button
              onClick={onNavigateToTerms}
              className="parichay-btn-outline parichay-switch-btn"
              title="View Terms of Service"
            >
              <FileText size={16} />
              <span className="btn-label-desktop">Terms of Service</span>
              <span className="btn-label-mobile">Terms</span>
            </button>
          )}

          <button
            onClick={onBack}
            className="parichay-btn-primary parichay-back-btn"
            title={isLoggedIn ? 'Back to Dashboard' : 'Back to Sign In'}
          >
            <ArrowLeft size={16} />
            <span className="btn-label-desktop">{isLoggedIn ? 'Back to Dashboard' : 'Back to Sign In'}</span>
            <span className="btn-label-mobile">{isLoggedIn ? 'Dashboard' : 'Sign In'}</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div style={styles.heroBanner} className="parichay-hero-banner">
        <div style={styles.heroLogoContainer} className="parichay-hero-logo">
          <img src={parichayLogo} alt="PARICHAY" style={styles.heroLogoImg} />
        </div>

        <div style={styles.heroBadge}>
          <Lock size={14} />
          <span>Official Privacy Policy</span>
        </div>
        <h1 style={styles.heroTitle} className="parichay-hero-title">Privacy Policy of PARICHAY</h1>
        <p style={styles.heroSubtitle} className="parichay-hero-subtitle">
          Welcome to PARICHAY (“App”, “Platform”, “we”, “us”, or “our”). This Privacy Policy explains how
          we collect, use, store, disclose, and protect personal information when you use our community-based application.
        </p>

        <div style={styles.metaRow} className="parichay-meta-row">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} color={AppColors.orange} />
            <strong style={{ color: AppColors.textDark }}>Effective Date:</strong> 28/09/2026
          </span>
          <span className="parichay-meta-dot">•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} color={AppColors.orange} />
            <strong style={{ color: AppColors.textDark }}>Last Updated:</strong> 28/09/2026
          </span>
          <span className="parichay-meta-dot">•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={15} color={AppColors.indigo} />
            <span style={{ color: AppColors.indigo, fontWeight: 600 }}>Version 1.0 (Public)</span>
          </span>
        </div>
      </div>

      {/* Content Layout */}
      <div style={styles.contentWrapper} className="privacy-content-wrapper">
        {/* Quick Jump Sidebar (Sticky) */}
        <aside style={styles.tocSidebar} className="hide-on-mobile privacy-toc">
          <div style={styles.tocTitle}>Table of Contents</div>
          <ul style={styles.tocList}>
            {tocItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
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
                      backgroundColor: isActive ? AppColors.orangeLight : 'transparent',
                      color: isActive ? AppColors.orangeDark : AppColors.textMid,
                      fontWeight: isActive ? 700 : 500,
                      borderLeft: isActive ? `3px solid ${AppColors.orange}` : '3px solid transparent',
                    }}
                    title={item.label}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Main Document Body */}
        <main style={styles.mainCard} className="privacy-main-panel">
          {/* Preamble Overview */}
          <div style={styles.noticeBox}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Eye size={20} color={AppColors.indigo} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ ...styles.sectionParagraph, margin: 0, color: AppColors.textDark }}>
                  The App is designed as a closed community platform that enables verified or approved community members
                  to connect with one another, maintain family information and family trees, view and exchange biodata,
                  and support professional and business networking within the community.
                </p>
                <p style={{ ...styles.sectionParagraph, margin: '8px 0 0 0', fontWeight: 600, color: AppColors.indigo }}>
                  By accessing or using the App, you acknowledge that you have read and understood this Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Section 1: Purpose of the App */}
          <section id="section-purpose" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>1</div>
              <h2 style={styles.sectionTitle}>Purpose of the App</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The App provides a private community environment where members may:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Join a community through an invitation code or administrator approval.</li>
              <li style={styles.bulletItem}>Create and manage their personal profile.</li>
              <li style={styles.bulletItem}>Add and maintain family members and family relationships.</li>
              <li style={styles.bulletItem}>Create or manage biodata for themselves or, where authorized, another family member.</li>
              <li style={styles.bulletItem}>View biodata and family information shared by community members.</li>
              <li style={styles.bulletItem}>Search for members based on permitted profile information.</li>
              <li style={styles.bulletItem}>Connect with members for marriage-related biodata discovery.</li>
              <li style={styles.bulletItem}>Discover professional and business information shared within the community.</li>
              <li style={styles.bulletItem}>Participate in community and professional networking.</li>
              <li style={styles.bulletItem}>Receive community notifications and announcements.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              The App is intended to facilitate interaction within the relevant community, rather than function as a general public social network.
            </p>
          </section>

          {/* Section 2: Information We Collect */}
          <section id="section-collection" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>2</div>
              <h2 style={styles.sectionTitle}>Information We Collect</h2>
            </div>
            <p style={styles.sectionParagraph}>
              Depending on how you use the App, we may collect the following categories of information.
            </p>

            <h3 style={styles.subHeading}>2.1 Account and Authentication Information</h3>
            <p style={styles.sectionParagraph}>
              When you register or access the App, we may collect:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Mobile number</li>
              <li style={styles.bulletItem}>OTP/authentication information</li>
              <li style={styles.bulletItem}>Community membership information</li>
              <li style={styles.bulletItem}>User/account identifier</li>
              <li style={styles.bulletItem}>Account status</li>
              <li style={styles.bulletItem}>Community approval or verification status</li>
            </ul>
            <p style={styles.sectionParagraph}>
              The App uses mobile-number-based OTP authentication and community-based access controls.
            </p>

            <h3 style={styles.subHeading}>2.2 Personal Profile Information</h3>
            <p style={styles.sectionParagraph}>
              A member may provide information such as:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Full name</li>
              <li style={styles.bulletItem}>Date of birth</li>
              <li style={styles.bulletItem}>Gender</li>
              <li style={styles.bulletItem}>Profile photograph</li>
              <li style={styles.bulletItem}>City</li>
              <li style={styles.bulletItem}>Native village/area</li>
              <li style={styles.bulletItem}>Community sub-group</li>
              <li style={styles.bulletItem}>Surname</li>
              <li style={styles.bulletItem}>Gotra</li>
              <li style={styles.bulletItem}>Other profile information made available through the App</li>
            </ul>
            <p style={styles.sectionParagraph}>
              The exact information displayed to another community member may depend on the privacy settings selected for the relevant fields.
            </p>
          </section>

          {/* Section 3: Family Information and Family Tree */}
          <section id="section-family" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>3</div>
              <h2 style={styles.sectionTitle}>Family Information and Family Tree</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The App allows members to create and maintain family relationships and family trees. A user may add information relating to family members, including:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Name</li>
              <li style={styles.bulletItem}>Relationship</li>
              <li style={styles.bulletItem}>Family connections</li>
              <li style={styles.bulletItem}>Parents</li>
              <li style={styles.bulletItem}>Spouse</li>
              <li style={styles.bulletItem}>Children</li>
              <li style={styles.bulletItem}>Grandparents</li>
              <li style={styles.bulletItem}>Other family relationships</li>
              <li style={styles.bulletItem}>Ancestor information</li>
              <li style={styles.bulletItem}>Other information necessary to represent the family tree</li>
            </ul>
            <p style={styles.sectionParagraph}>
              The App may also support information about deceased family members for historical and family-tree purposes.
            </p>

            <h3 style={styles.subHeading}>Information About Another Family Member</h3>
            <p style={styles.sectionParagraph}>
              The App allows a family member to create or manage a profile or biodata for another family member, where the feature permits this.
            </p>
            <p style={styles.sectionParagraph}>
              When entering information about another person, the person creating the information should provide accurate information and should have the necessary authorization or permission to provide and manage that person's information where required.
            </p>
            <p style={styles.sectionParagraph}>
              The person whose information has been added may, where supported by the App, request correction, modification, restriction, or removal of information associated with their profile.
            </p>
            <p style={styles.sectionParagraph}>
              Where a family member's information is entered by another person, we may retain information about the person who created or modified the record for account security, audit, and administrative purposes.
            </p>
          </section>

          {/* Section 4: Biodata Information */}
          <section id="section-biodata" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>4</div>
              <h2 style={styles.sectionTitle}>Biodata Information</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The App may allow community members to create and view biodata for marriage-related community discovery. Biodata may include information such as:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Name</li>
              <li style={styles.bulletItem}>Age / date of birth</li>
              <li style={styles.bulletItem}>Gender</li>
              <li style={styles.bulletItem}>Education</li>
              <li style={styles.bulletItem}>Occupation & job information</li>
              <li style={styles.bulletItem}>Business information</li>
              <li style={styles.bulletItem}>Family background & community information</li>
              <li style={styles.bulletItem}>Gotra</li>
              <li style={styles.bulletItem}>Maternal / family information</li>
              <li style={styles.bulletItem}>Other information voluntarily provided by the member</li>
            </ul>
            <p style={styles.sectionParagraph}>
              The App may also provide functionality to generate or export biodata in PDF format.
              Users should carefully consider the information they include in biodata because information shared
              with other community members may be viewed, copied, downloaded, or otherwise used by recipients.
            </p>
          </section>

          {/* Section 5: Business and Professional Information */}
          <section id="section-business" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>5</div>
              <h2 style={styles.sectionTitle}>Business and Professional Information</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The App may allow members to voluntarily provide professional and business information to support career and business networking within the community. This may include:
            </p>

            <h3 style={styles.subHeading}>Employment Information</h3>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Designation</li>
              <li style={styles.bulletItem}>Company / employer name</li>
              <li style={styles.bulletItem}>Industry</li>
              <li style={styles.bulletItem}>City / location</li>
              <li style={styles.bulletItem}>Years of experience</li>
            </ul>

            <h3 style={styles.subHeading}>Business Information</h3>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Business name</li>
              <li style={styles.bulletItem}>Business type</li>
              <li style={styles.bulletItem}>Services or products</li>
              <li style={styles.bulletItem}>Business location</li>
              <li style={styles.bulletItem}>Website</li>
              <li style={styles.bulletItem}>Business contact information</li>
              <li style={styles.bulletItem}>Professional / business categories or tags</li>
            </ul>
            <p style={styles.sectionParagraph}>
              Members may be searchable based on permitted professional or business information.
            </p>
          </section>

          {/* Section 6: Privacy and Visibility Controls */}
          <section id="section-privacy-controls" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>6</div>
              <h2 style={styles.sectionTitle}>Privacy and Visibility Controls</h2>
            </div>
            <p style={styles.sectionParagraph}>
              We recognize that different members may have different preferences regarding the information they share.
              The App therefore provides privacy controls that allow members to control the visibility of certain categories of information.
            </p>
            <p style={styles.sectionParagraph}>
              Depending on the features available in the App, members may control the visibility of:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Mobile Number</li>
              <li style={styles.bulletItem}>Email Address</li>
              <li style={styles.bulletItem}>Family Information</li>
              <li style={styles.bulletItem}>Business and Professional Information</li>
              <li style={styles.bulletItem}>Gotra</li>
              <li style={styles.bulletItem}>Maternal Information</li>
            </ul>
            <p style={styles.sectionParagraph}>
              A member may enable or disable the applicable privacy toggle for these fields.
              When a privacy control is disabled, the corresponding information should not be displayed to users who are not authorized to view it through the applicable access rules.
            </p>
            <p style={styles.sectionParagraph}>
              However, privacy controls may not prevent information from being accessed by:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>The member who owns the information;</li>
              <li style={styles.bulletItem}>Authorized community administrators;</li>
              <li style={styles.bulletItem}>Authorized personnel responsible for operating or supporting the Platform;</li>
              <li style={styles.bulletItem}>Persons to whom the member has separately provided the information;</li>
              <li style={styles.bulletItem}>Where disclosure is required by applicable law or a valid legal process.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              Privacy settings may be subject to technical, administrative, and security limitations.
            </p>
          </section>

          {/* Section 7: Community Access and Member Verification */}
          <section id="section-verification" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>7</div>
              <h2 style={styles.sectionTitle}>Community Access and Member Verification</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The App is designed for a closed community. Community membership may be controlled through:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Invitation codes;</li>
              <li style={styles.bulletItem}>Administrator approval;</li>
              <li style={styles.bulletItem}>Member management by community administrators; and</li>
              <li style={styles.bulletItem}>Verification mechanisms.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              Community administrators may have access to information necessary to administer the community, verify members,
              manage accounts, and maintain the integrity and safety of the Platform.
            </p>
            <p style={styles.sectionParagraph}>
              The App may display a verified status or badge for members who have been verified by the community administrator.
              Being a verified community member does not necessarily mean that every piece of information associated with that member has been independently verified.
            </p>
          </section>

          {/* Section 8: Search and Discovery */}
          <section id="section-search" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>8</div>
              <h2 style={styles.sectionTitle}>Search and Discovery</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The App may provide search and filtering functionality to help community members discover other members.
              Depending on privacy settings and applicable access permissions, users may be searchable using information such as:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Name</li>
              <li style={styles.bulletItem}>City</li>
              <li style={styles.bulletItem}>Profession</li>
              <li style={styles.bulletItem}>Business type</li>
              <li style={styles.bulletItem}>Surname</li>
              <li style={styles.bulletItem}>Gotra</li>
              <li style={styles.bulletItem}>Age range</li>
              <li style={styles.bulletItem}>Gender</li>
              <li style={styles.bulletItem}>Occupation category</li>
            </ul>
            <p style={styles.sectionParagraph}>
              The information returned through search will be subject to applicable privacy and visibility settings.
            </p>
          </section>

          {/* Section 9: How We Use Personal Information */}
          <section id="section-usage" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>9</div>
              <h2 style={styles.sectionTitle}>How We Use Personal Information</h2>
            </div>
            <p style={styles.sectionParagraph}>
              We may use personal information for the following purposes:
            </p>

            <h3 style={styles.subHeading}>Providing the Platform</h3>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Creating and maintaining user accounts;</li>
              <li style={styles.bulletItem}>Authenticating users;</li>
              <li style={styles.bulletItem}>Managing community membership;</li>
              <li style={styles.bulletItem}>Providing profiles and family-tree functionality;</li>
              <li style={styles.bulletItem}>Enabling biodata functionality;</li>
              <li style={styles.bulletItem}>Enabling business and professional networking;</li>
              <li style={styles.bulletItem}>Providing search and discovery features;</li>
              <li style={styles.bulletItem}>Generating biodata PDFs where requested.</li>
            </ul>

            <h3 style={styles.subHeading}>Community Administration</h3>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Processing community membership requests;</li>
              <li style={styles.bulletItem}>Verifying members;</li>
              <li style={styles.bulletItem}>Managing invitations;</li>
              <li style={styles.bulletItem}>Managing community users;</li>
              <li style={styles.bulletItem}>Maintaining community records;</li>
              <li style={styles.bulletItem}>Communicating community announcements.</li>
            </ul>

            <h3 style={styles.subHeading}>Security and Fraud Prevention</h3>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Protecting accounts;</li>
              <li style={styles.bulletItem}>Detecting unauthorized access;</li>
              <li style={styles.bulletItem}>Preventing misuse of the Platform;</li>
              <li style={styles.bulletItem}>Maintaining system and community security;</li>
              <li style={styles.bulletItem}>Investigating suspicious or unauthorized activity.</li>
            </ul>

            <h3 style={styles.subHeading}>Platform Improvement</h3>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Maintaining and improving Platform functionality;</li>
              <li style={styles.bulletItem}>Troubleshooting technical issues;</li>
              <li style={styles.bulletItem}>Monitoring system performance;</li>
              <li style={styles.bulletItem}>Improving user experience.</li>
            </ul>

            <h3 style={styles.subHeading}>Legal and Regulatory Requirements</h3>
            <p style={styles.sectionParagraph}>
              We may process or disclose information where reasonably necessary to:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Comply with applicable laws;</li>
              <li style={styles.bulletItem}>Respond to lawful requests from authorities;</li>
              <li style={styles.bulletItem}>Protect our legal rights;</li>
              <li style={styles.bulletItem}>Investigate suspected fraud, abuse, or security incidents;</li>
              <li style={styles.bulletItem}>Enforce our Terms of Use or other applicable policies.</li>
            </ul>
          </section>

          {/* Section 10: Notifications */}
          <section id="section-notifications" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>10</div>
              <h2 style={styles.sectionTitle}>Notifications</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The App may send notifications relating to:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>New members joining the community;</li>
              <li style={styles.bulletItem}>Community announcements;</li>
              <li style={styles.bulletItem}>Account or profile activity;</li>
              <li style={styles.bulletItem}>Administrative actions;</li>
              <li style={styles.bulletItem}>Other important Platform communications.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              Users may be able to manage notification preferences through the App's settings, subject to essential service and security communications.
            </p>
          </section>

          {/* Section 11: Information Sharing and Disclosure */}
          <section id="section-sharing" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>11</div>
              <h2 style={styles.sectionTitle}>Information Sharing and Disclosure</h2>
            </div>
            <p style={styles.sectionParagraph}>
              <strong>We do not intend to sell members' personal information to third parties.</strong>
            </p>
            <p style={styles.sectionParagraph}>
              Information may be made available to other community members when:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>The member has chosen to make that information visible;</li>
              <li style={styles.bulletItem}>The information is intended to be part of a community directory or profile;</li>
              <li style={styles.bulletItem}>Access is necessary for a specific App feature;</li>
              <li style={styles.bulletItem}>A community administrator has appropriate administrative access; or</li>
              <li style={styles.bulletItem}>Disclosure is otherwise permitted or required under applicable law.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              We may also share information with service providers who help us operate the Platform, such as providers supporting:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Cloud infrastructure;</li>
              <li style={styles.bulletItem}>Database services;</li>
              <li style={styles.bulletItem}>Authentication;</li>
              <li style={styles.bulletItem}>File or image storage;</li>
              <li style={styles.bulletItem}>Push notifications;</li>
              <li style={styles.bulletItem}>Application monitoring;</li>
              <li style={styles.bulletItem}>Security;</li>
              <li style={styles.bulletItem}>Analytics or technical operations.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              Such providers may process information only as necessary to provide their services to us and subject to applicable contractual and legal requirements.
            </p>
          </section>

          {/* Section 12: Family Member-Created Profiles */}
          <section id="section-family-profiles" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>12</div>
              <h2 style={styles.sectionTitle}>Family Member-Created Profiles</h2>
            </div>
            <p style={styles.sectionParagraph}>
              Because the App permits a member of a family to create or manage information about another family member,
              users should exercise care when entering information about other individuals.
            </p>
            <p style={styles.sectionParagraph}>
              If you create a profile, biodata, or family-tree entry for another person:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>You should provide information accurately;</li>
              <li style={styles.bulletItem}>You should not intentionally provide false or misleading information;</li>
              <li style={styles.bulletItem}>You should have appropriate authorization or permission where required;</li>
              <li style={styles.bulletItem}>You should avoid adding unnecessary sensitive or private information;</li>
              <li style={styles.bulletItem}>You should respect the privacy preferences of the person concerned.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              If you believe that information about you has been added without authorization or is inaccurate,
              you may contact the Platform administrator using the contact information provided in this Privacy Policy.
            </p>
          </section>

          {/* Section 13: Information Security */}
          <section id="section-security" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>13</div>
              <h2 style={styles.sectionTitle}>Information Security</h2>
            </div>
            <p style={styles.sectionParagraph}>
              We use reasonable technical and organizational measures intended to protect personal information against:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Unauthorized access;</li>
              <li style={styles.bulletItem}>Unauthorized disclosure;</li>
              <li style={styles.bulletItem}>Accidental loss;</li>
              <li style={styles.bulletItem}>Alteration;</li>
              <li style={styles.bulletItem}>Destruction;</li>
              <li style={styles.bulletItem}>Misuse.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              These measures may include access controls, authentication mechanisms, authorization controls,
              secure infrastructure, and other appropriate security measures. The Platform's backend uses a database
              and API-based architecture to manage application data and access controls.
            </p>
            <p style={styles.sectionParagraph}>
              However, no electronic transmission, storage system, or Internet-based service can be guaranteed to be completely secure.
              Accordingly, users should also protect their account credentials, OTPs, devices, and other authentication information.
            </p>
          </section>

          {/* Section 14: Data Retention */}
          <section id="section-retention" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>14</div>
              <h2 style={styles.sectionTitle}>Data Retention</h2>
            </div>
            <p style={styles.sectionParagraph}>
              We retain personal information for as long as reasonably necessary to:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Provide the Platform and its features;</li>
              <li style={styles.bulletItem}>Maintain community records;</li>
              <li style={styles.bulletItem}>Meet legitimate operational requirements;</li>
              <li style={styles.bulletItem}>Resolve disputes;</li>
              <li style={styles.bulletItem}>Maintain security and audit records;</li>
              <li style={styles.bulletItem}>Comply with applicable legal obligations.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              When information is no longer required for these purposes, it may be deleted, anonymized, or securely disposed of,
              subject to applicable legal, regulatory, security, and operational requirements.
            </p>
            <p style={styles.sectionParagraph}>
              Certain records may need to be retained for longer periods where required by law or necessary to establish,
              exercise, or defend legal claims.
            </p>
          </section>

          {/* Section 15: User Rights and Control Over Information */}
          <section id="section-rights" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>15</div>
              <h2 style={styles.sectionTitle}>User Rights and Control Over Information</h2>
            </div>
            <p style={styles.sectionParagraph}>
              Subject to applicable law and the functionality available within the Platform, users may have rights relating to their personal information, including the ability to:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Access information associated with their profile;</li>
              <li style={styles.bulletItem}>Correct inaccurate or incomplete information;</li>
              <li style={styles.bulletItem}>Update their profile;</li>
              <li style={styles.bulletItem}>Change applicable privacy settings;</li>
              <li style={styles.bulletItem}>Request deletion of information where legally applicable;</li>
              <li style={styles.bulletItem}>Withdraw consent where processing is based on consent;</li>
              <li style={styles.bulletItem}>Raise concerns regarding unauthorized use or disclosure;</li>
              <li style={styles.bulletItem}>Request assistance regarding their personal information.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              Requests may be submitted using the contact details provided below. Certain information may not be immediately removable where it is required for legal, security, dispute-resolution, or legitimate administrative purposes.
            </p>
          </section>

          {/* Section 16: Deletion and Account Closure */}
          <section id="section-deletion" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>16</div>
              <h2 style={styles.sectionTitle}>Deletion and Account Closure</h2>
            </div>
            <p style={styles.sectionParagraph}>
              A user may request closure or deletion of their account, subject to applicable procedures.
              Upon receiving a valid deletion request, we may delete or anonymize personal information associated with the account,
              except where retention is necessary or permitted under applicable law.
            </p>
            <p style={styles.sectionParagraph}>
              Information already shared with other community members may have been copied, downloaded, or independently retained by those users.
              Deleting information from the Platform may therefore not remove copies that another person has independently retained.
            </p>
            <p style={styles.sectionParagraph}>
              Family-tree information may also have relationships with other members' profiles. Accordingly, deletion of one profile
              may not necessarily remove all references to that person from other family records where those records are independently
              maintained by another community member.
            </p>
          </section>

          {/* Section 17: Third-Party Services */}
          <section id="section-third-party" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>17</div>
              <h2 style={styles.sectionTitle}>Third-Party Services</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The Platform may rely on third-party service providers for certain technical functions.
              These services may include authentication, cloud hosting, storage, notifications, analytics, security,
              and other infrastructure services.
            </p>
            <p style={styles.sectionParagraph}>
              Third-party providers may process information in accordance with their own privacy policies and applicable contractual arrangements.
              Users should review the privacy policies of third-party services where relevant.
            </p>
          </section>

          {/* Section 18: Children's and Minors' Information */}
          <section id="section-children" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>18</div>
              <h2 style={styles.sectionTitle}>Children's and Minors' Information</h2>
            </div>
            <p style={styles.sectionParagraph}>
              The Platform may contain family and biodata information that could relate to family members of different ages.
              If information concerning a minor is added to the Platform, the person providing that information should have
              the appropriate authority and permissions required under applicable law.
            </p>
            <p style={styles.sectionParagraph}>
              We do not knowingly encourage children to independently provide personal information through the Platform
              where such collection or processing is not legally permitted.
            </p>
            <p style={styles.sectionParagraph}>
              If you believe that information relating to a minor has been submitted improperly, please contact us using the details below.
            </p>
          </section>

          {/* Section 19: Changes to Privacy Settings */}
          <section id="section-settings-changes" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>19</div>
              <h2 style={styles.sectionTitle}>Changes to Privacy Settings</h2>
            </div>
            <p style={styles.sectionParagraph}>
              Privacy settings may be updated by the user through the relevant settings or profile functionality provided by the App.
              Changes to privacy settings may affect who can view the relevant information.
            </p>
            <p style={styles.sectionParagraph}>
              For example, changing the visibility of business/professional information may affect whether that information
              appears in professional searches or on a member's profile.
              Similarly, changing the visibility of family, gotra, or maternal information may affect its availability to other community members.
            </p>
          </section>

          {/* Section 20: Changes to This Privacy Policy */}
          <section id="section-policy-changes" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>20</div>
              <h2 style={styles.sectionTitle}>Changes to This Privacy Policy</h2>
            </div>
            <p style={styles.sectionParagraph}>
              We may update this Privacy Policy from time to time to reflect:
            </p>
            <ul style={styles.bulletList}>
              <li style={styles.bulletItem}>Changes to the Platform;</li>
              <li style={styles.bulletItem}>New features;</li>
              <li style={styles.bulletItem}>Changes in data-processing practices;</li>
              <li style={styles.bulletItem}>Changes in applicable laws or regulations;</li>
              <li style={styles.bulletItem}>Security or operational requirements.</li>
            </ul>
            <p style={styles.sectionParagraph}>
              When material changes are made, we may provide notice through the App, website, email, or other appropriate communication methods.
              The updated Privacy Policy will indicate the date on which it was last revised.
            </p>
          </section>

          {/* Section 21: Contact Us */}
          <section id="section-contact" style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>21</div>
              <h2 style={styles.sectionTitle}>Contact Us</h2>
            </div>
            <p style={styles.sectionParagraph}>
              If you have questions, concerns, complaints, or requests regarding this Privacy Policy or your personal information, please contact:
            </p>

            <div style={styles.contactGrid}>
              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Building size={18} color={AppColors.orange} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>App / Platform</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid }}>
                  <strong>App Name:</strong> PARICHAY
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid, marginTop: '4px' }}>
                  <strong>Organization:</strong> Community Connect
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <UserCheck size={18} color={AppColors.indigo} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>Privacy Contact</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid }}>
                  Designated Privacy Officer / Community Administrator
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Mail size={18} color={AppColors.orange} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>Email</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid }}>
                  privacy@parichay.community
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Phone size={18} color={AppColors.indigo} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>Phone</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid }}>
                  Support / Helpline Contact
                </div>
              </div>

              <div style={styles.contactCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <MapPin size={18} color={AppColors.orange} />
                  <strong style={{ fontSize: '0.9rem', color: AppColors.textDark }}>Registered Office</strong>
                </div>
                <div style={{ fontSize: '0.85rem', color: AppColors.textMid }}>
                  PARICHAY Community Administration Office
                </div>
              </div>
            </div>

            <p style={{ ...styles.sectionParagraph, marginTop: '20px' }}>
              For privacy-related requests, please provide sufficient information for us to identify your account and understand the nature of your request.
            </p>
          </section>

          {/* Section 22: Consent and Acknowledgement */}
          <section id="section-consent" style={{ ...styles.section, marginBottom: 0 }}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionNumber}>22</div>
              <h2 style={styles.sectionTitle}>Consent and Acknowledgement</h2>
            </div>
            <p style={styles.sectionParagraph}>
              By registering for or using the App, you acknowledge that you have read and understood this Privacy Policy
              and understand how your information may be collected, used, stored, and shared as described herein.
            </p>
            <p style={styles.sectionParagraph}>
              Where specific consent is required under applicable law, such consent will be obtained through the applicable mechanism provided by the Platform.
            </p>
            <p style={styles.sectionParagraph}>
              Users are responsible for reviewing their profile information and available privacy settings and selecting the level of visibility they are comfortable with.
            </p>
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
          {onNavigateToTerms && (
            <>
              <button
                onClick={onNavigateToTerms}
                style={{ background: 'none', border: 'none', color: AppColors.indigo, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
              >
                Terms of Service
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
