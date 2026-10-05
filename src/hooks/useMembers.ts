import { useState, useEffect, useMemo, useCallback } from 'react';
import { apiGet } from '../config/api';
import { downloadMembersCsv } from '../utils/csvExport';

interface MemberRecord {
  id: string;
  userId: string;
  joinedAt: string;
  role: string;
  familyMemberCount?: number;
  user: {
    mobileNumber: string;
    profile?: {
      fullName: string;
      city: string;
      nativeVillage?: string;
      surname: string;
      gotra: string;
    };
  };
}

interface UseMembersProps {
  communityId: string | null;
  showToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const useMembers = ({ communityId, showToast }: UseMembersProps) => {
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState('');

  // Pagination states
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchMembers = useCallback(async (commId: string) => {
    setLoading(true);
    try {
      let allMembers: MemberRecord[] = [];
      let currentPage = 1;
      let moreToFetch = true;
      const fetchLimit = 100;

      while (moreToFetch) {
        const res = await apiGet(`/communities/${commId}/members?limit=${fetchLimit}&page=${currentPage}`);
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          allMembers = [...allMembers, ...res.data];
          if (res.data.length < fetchLimit) {
            moreToFetch = false;
          } else {
            currentPage++;
          }
        } else {
          moreToFetch = false;
        }
      }

      setMembers(allMembers);
    } catch (err: any) {
      showToast(err.message || 'Failed to fetch community members', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    if (communityId) {
      fetchMembers(communityId);
    } else {
      setMembers([]);
    }
    setPage(1);
    setSearchQuery('');
  }, [communityId, fetchMembers]);

  // Client-side filtering when search query changes across all community members
  const filteredMembers = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();
    if (!trimmed) {
      return members;
    }

    const tokens = trimmed.split(/\s+/).filter(Boolean);
    return members.filter((member) => {
      const profile = member.user?.profile;
      const fullName = profile?.fullName?.toLowerCase() || '';
      const mobile = member.user?.mobileNumber?.toLowerCase() || '';
      const city = profile?.city?.toLowerCase() || '';
      const gotra = profile?.gotra?.toLowerCase() || '';
      const surname = profile?.surname?.toLowerCase() || '';
      const nativeVillage = profile?.nativeVillage?.toLowerCase() || '';
      const role = member.role?.toLowerCase() || '';

      const combined = `${fullName} ${mobile} ${city} ${gotra} ${surname} ${nativeVillage} ${role}`;
      return tokens.every((token) => combined.includes(token));
    });
  }, [members, searchQuery]);

  // Reset page to 1 when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));

  // Ensure page is within valid range
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedMembers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, page, pageSize]);

  const hasMore = page < totalPages;
  const hasPrev = page > 1;

  const exportMembers = async (startDate?: string, endDate?: string) => {
    if (!communityId) return;
    setExporting(true);
    setExportProgress(20);
    setExportStatus('Preparing records for export...');
    try {
      let sourceMembers = members;

      // If members state is empty for some reason, fetch from server
      if (sourceMembers.length === 0) {
        setExportStatus('Fetching records from directory...');
        let all: MemberRecord[] = [];
        let currentPage = 1;
        let moreToFetch = true;
        const exportLimit = 100;

        while (moreToFetch) {
          setExportStatus(`Fetching records (page ${currentPage})...`);
          const res = await apiGet(
            `/communities/${communityId}/members?limit=${exportLimit}&page=${currentPage}`
          );
          if (res.success && Array.isArray(res.data) && res.data.length > 0) {
            all = [...all, ...res.data];
            setExportProgress(Math.min(20 + currentPage * 20, 75));
            if (res.data.length < exportLimit) {
              moreToFetch = false;
            } else {
              currentPage++;
            }
          } else {
            moreToFetch = false;
          }
        }
        sourceMembers = all;
      }

      if (sourceMembers.length === 0) {
        showToast('No approved members found to export', 'info');
        return;
      }

      setExportProgress(75);
      setExportStatus('Filtering records by date...');

      let filtered = sourceMembers;
      if (startDate) {
        const start = new Date(`${startDate}T00:00:00.000Z`).getTime();
        filtered = filtered.filter((m) => {
          const raw = m.joinedAt || (m as any).createdAt || (m as any).joined_at || (m as any).created_at;
          const time = raw ? new Date(raw).getTime() : NaN;
          return !isNaN(time) && time >= start;
        });
      }
      if (endDate) {
        const end = new Date(`${endDate}T23:59:59.999Z`).getTime();
        filtered = filtered.filter((m) => {
          const raw = m.joinedAt || (m as any).createdAt || (m as any).joined_at || (m as any).created_at;
          const time = raw ? new Date(raw).getTime() : NaN;
          return !isNaN(time) && time <= end;
        });
      }

      if (filtered.length === 0) {
        showToast('No members found within the selected date range', 'info');
        return;
      }

      setExportProgress(90);
      setExportStatus(`Generating CSV for ${filtered.length} member${filtered.length > 1 ? 's' : ''}...`);
      await new Promise((r) => setTimeout(r, 200));

      downloadMembersCsv(filtered, 'community_members');
      setExportProgress(100);
      setExportStatus('Download started!');
      await new Promise((r) => setTimeout(r, 250));

      showToast(`Exported ${filtered.length} members successfully!`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to export members', 'error');
    } finally {
      setExporting(false);
      setExportProgress(0);
      setExportStatus('');
    }
  };

  return {
    members,
    filteredMembers,
    paginatedMembers,
    searchQuery,
    setSearchQuery,
    loading,
    exporting,
    exportProgress,
    exportStatus,
    exportMembers,
    page,
    setPage,
    totalPages,
    totalCount: filteredMembers.length,
    totalMembers: members.length,
    hasMore,
    hasPrev,
    refetchMembers: () => communityId && fetchMembers(communityId),
  };
};

export type { MemberRecord };
