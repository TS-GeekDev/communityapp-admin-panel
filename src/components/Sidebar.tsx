import React from 'react';
import { Globe, LogOut, X, ChevronLeft, ChevronRight, Shield } from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { styles } from '../styles/Sidebar.styles';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onLogout: () => void;
  communityName: string;
  isCollapsed: boolean;
  onToggleSidebar: () => void;
  onNavigateToPrivacy?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onLogout,
  communityName,
  isCollapsed,
  onToggleSidebar,
  onNavigateToPrivacy,
}) => {
  return (
    <aside style={styles.sidebar}>
      {/* Border Toggle Button (Desktop Only) */}
      <button
        onClick={onToggleSidebar}
        style={styles.borderToggleBtn}
        className="sidebar-border-toggle"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div style={{
        ...styles.brandContainer,
        justifyContent: isCollapsed ? 'center' : 'space-between',
        width: '100%',
        marginBottom: isCollapsed ? '24px' : '32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.logoCircle}>
            <Globe size={20} color="#fff" />
          </div>
          {!isCollapsed && (
            <div>
              <h2 style={styles.brandTitle}>Admin Panel</h2>
              <span style={styles.brandSubtitle}>Community Connect</span>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={onToggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              borderRadius: '50%',
              color: 'var(--text-secondary)',
              transition: 'background var(--transition-fast)',
            }}
            className="sidebar-close-btn"
            title="Close Sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {!isCollapsed && (
        <div style={styles.communitySelector}>
          <div style={styles.communityLabel}>Active Community</div>
          <div style={styles.communityName} title={communityName}>{communityName || 'Loading...'}</div>
        </div>
      )}

      <nav style={styles.nav}>
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              style={{
                ...styles.navButton,
                ...(isActive ? styles.navButtonActive : {}),
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                padding: isCollapsed ? '12px 0' : '12px 14px',
              }}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={18} style={isActive ? styles.iconActive : styles.icon} />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <button
          onClick={onNavigateToPrivacy}
          style={{
            ...styles.navButton,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            padding: isCollapsed ? '10px 0' : '10px 14px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
          }}
          title={isCollapsed ? "Privacy Policy" : undefined}
        >
          <Shield size={16} />
          {!isCollapsed && <span>Privacy Policy</span>}
        </button>

        <button
          onClick={onLogout}
          style={{
            ...styles.logoutButton,
            marginTop: 0,
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            padding: isCollapsed ? '12px 0' : '12px 14px',
          }}
          title={isCollapsed ? "Sign Out" : undefined}
        >
          <LogOut size={18} />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
