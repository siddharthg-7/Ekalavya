import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Search, ChevronRight, Building2, Briefcase, GraduationCap, UserPlus } from 'lucide-react';
import { fetchOfficials, type OfficialDetail } from '../../services/api';
import { CreateOfficialModal } from '../../components/CreateOfficialModal';

export const AdminOfficialsPage: React.FC = () => {
  const [officials, setOfficials] = useState<OfficialDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await fetchOfficials();
        setOfficials(data);
      } catch (err) {
        console.error('Failed to fetch officials list', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const departments = ['All', ...Array.from(new Set(officials.map(o => o.department).filter(Boolean)))];

  const filteredOfficials = officials.filter(off => {
    const matchesSearch =
      off.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      off.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (off.department && off.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (off.job_role && off.job_role.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = departmentFilter === 'All' || off.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Back Link */}
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center text-sm font-medium text-[#52657A] hover:text-[#2563D9] mb-3 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Admin Dashboard
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
              MoSPI Statistical Cadre Directory
            </h1>
            <p className="text-xs sm:text-sm text-[#52657A] mt-1">
              Select an official to inspect individual competency mastery scores, diagnostic histories, and skill gaps.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]">
              <Users className="w-3.5 h-3.5 mr-1 text-[#2563D9]" />
              {officials.length} Registered Officials
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mc-btn-primary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Official</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-[#DCE3EA] rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#52657A]" />
          <input
            type="text"
            placeholder="Search by name, role, or division..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-[#DCE3EA] rounded-full text-xs text-[#102A43] placeholder:text-[#52657A] bg-[#F7F9FC] focus:outline-none focus:ring-2 focus:ring-[#2563D9] focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-semibold text-[#52657A] whitespace-nowrap">Division:</label>
          <select
            value={departmentFilter}
            onChange={e => setDepartmentFilter(e.target.value)}
            className="w-full md:w-64 px-3 py-1.5 border border-[#DCE3EA] rounded-full text-xs text-[#102A43] bg-[#F7F9FC] focus:outline-none focus:ring-2 focus:ring-[#2563D9] cursor-pointer"
          >
            {departments.map((dept, i) => (
              <option key={i} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Officials List */}
      {loading ? (
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-12 text-center text-[#52657A]">
          <div className="animate-spin w-8 h-8 border-2 border-[#DCE3EA] border-t-[#2563D9] rounded-full mx-auto mb-3" />
          <p className="text-sm">Fetching statistical cadre directory...</p>
        </div>
      ) : filteredOfficials.length === 0 ? (
        <div className="bg-white border border-[#DCE3EA] rounded-2xl p-12 text-center text-[#52657A]">
          <p className="text-sm">No officials matched your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOfficials.map(off => (
            <Link
              key={off.id}
              to={`/admin/officials/${off.id}`}
              className="group bg-white border border-[#DCE3EA] rounded-2xl p-5 shadow-xs hover:border-[#2563D9]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#102A43] text-white flex items-center justify-center font-bold text-sm">
                      {off.name
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </div>
                    <div>
                      <h2 className="font-semibold text-base text-[#102A43] group-hover:text-[#2563D9] transition-colors">
                        {off.name}
                      </h2>
                      <div className="text-xs text-[#52657A] font-medium">{off.designation}</div>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium ${
                      off.role === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-[#F7F9FC] text-[#52657A] border border-[#DCE3EA]'
                    }`}
                  >
                    {off.role || 'learner'}
                  </span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-[#52657A]">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-[#52657A] shrink-0" />
                    <span className="truncate">{off.department}</span>
                  </div>
                  {off.job_role && (
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-[#52657A] shrink-0" />
                      <span className="truncate">{off.job_role}</span>
                    </div>
                  )}
                  {off.education && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-[#52657A] shrink-0" />
                      <span className="truncate">{off.education}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[#52657A] font-mono">
                  Exp: {off.experience_years ? `${off.experience_years} yrs` : 'N/A'}
                </span>
                <span className="inline-flex items-center font-semibold text-[#2563D9] group-hover:translate-x-0.5 transition-all">
                  View Competencies <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Official Registration Modal */}
      <CreateOfficialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOfficialCreated={(newOfficial) => {
          setOfficials((prev) => [newOfficial, ...prev]);
        }}
      />
    </div>
  );
};
