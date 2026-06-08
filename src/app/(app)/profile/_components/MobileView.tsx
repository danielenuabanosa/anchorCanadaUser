'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2, MapPin, User, Mail, Phone, Globe, Languages, FileText,
  Briefcase, GraduationCap, Pencil, Trash2, Plus, Upload, ArrowRight,
  ChevronRight, Lock, Shield, Download, Target, Building2, Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

import profileAvatar from '@/../assets/images/profile-avatar.png';
import googleLogo from '@/../assets/images/profile-google.png';
import shopifyLogo from '@/../assets/images/saved-shopify.png';
import utorontoLogo from '@/../assets/images/profile-utoronto.png';
import georgebrown from '@/../assets/images/profile-georgebrown.png';

const TABS = ['Overview', 'Experience', 'Education', 'Skills', 'Documents'];

const skills = [
  'UI/UX Design', 'User Research', 'Figma', 'Wireframing', 'Prototyping',
  'Interaction Design', 'Adobe XD', 'Web Design',
];

const experiences = [
  {
    id: 1, title: 'UX Design Intern', company: 'Google', verified: true,
    period: 'Mar 2024 – Aug 2024 • 4 months', logo: googleLogo,
  },
  {
    id: 2, title: 'UX Design Intern', company: 'Shopify', verified: true,
    period: 'Jan 2024 – Apr 2024 • 4 months', logo: shopifyLogo,
  },
];

const education = [
  {
    id: 1, school: 'University of Toronto', degree: 'Bachelor of Information Science',
    period: 'Sep 2021 – May 2025', logo: utorontoLogo,
  },
  {
    id: 2, school: 'George Brown College', degree: 'UI/UX Design Certificate',
    period: 'Jan 2023 – Apr 2023', logo: georgebrown,
  },
];

const documents = [
  { id: 1, name: 'Resume.pdf', date: 'Uploaded May 6, 2026', type: 'pdf' },
  { id: 2, name: 'Cover Letter.pdf', date: 'Uploaded May 6, 2026', type: 'pdf' },
  { id: 3, name: 'Portfolio.pdf', date: 'Uploaded Apr 28, 2026', type: 'pdf' },
  { id: 4, name: 'Design Certificate.png', date: 'Uploaded Apr 10, 2026', type: 'img' },
];

const completionTips = [
  { text: 'Add your work experience', done: true },
  { text: 'Upload your resume', done: true },
  { text: 'Add 3+ key skills', done: true },
  { text: 'Set your career goals', done: false },
  { text: 'Add your education', done: true },
];

export default function MobileView() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div>
        <h1 className="font-['Instrument_Serif'] text-[28px] leading-[1.2] text-[#0f172a]">My Profile</h1>
        <p className="text-[#44516a] text-sm mt-1">Manage your information and preferences to get better opportunities.</p>
      </div>

      <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
        <div className="flex gap-3 items-start">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#eef2f8]">
              <Image src={profileAvatar} alt="Sara Johnson" width={64} height={64} className="object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-5 h-5 bg-[#2f66c8] rounded-full flex items-center justify-center">
              <Pencil size={8} className="text-white" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="text-[#0f172a] font-medium text-base">Sara Johnson</h2>
              <CheckCircle2 size={14} className="text-[#2f66c8]" />
            </div>
            <div className="flex items-center gap-1 text-[#44516a] text-xs mb-0.5">
              <MapPin size={10} />
              <span>Toronto, Ontario, Canada</span>
            </div>
            <p className="text-[#44516a] text-xs">UX Designer • Student</p>
            <p className="text-[#44516a] text-xs mt-1 leading-relaxed">Building a career in digital product design and user experience.</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {['Open to Opportunities', 'Work Permit Holder'].map((tag) => (
                <span key={tag} className="bg-[#eff4ff] border border-[#2f66c8] text-[#2f66c8] text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 border-t border-[#eef2f8] pt-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 shrink-0">
              <svg viewBox="0 0 80 80" className="w-12 h-12 -rotate-90">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#eef2f8" strokeWidth="10" />
                <circle cx="40" cy="40" r="30" fill="none" stroke="#22c55e" strokeWidth="10"
                  strokeDasharray="188.5" strokeDashoffset={188.5 * (1 - 0.92)} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[#0f172a] font-semibold text-xs">92%</span>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[#44516a] text-xs">Excellent! Your profile is almost complete.</p>
              <button className="mt-1.5 w-full border border-[#2f66c8] rounded-[6px] py-1.5 text-[#2f66c8] text-xs font-medium flex items-center justify-center gap-1 hover:bg-[#eff4ff]">
                Complete Profile →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0 overflow-x-auto border-b border-[#eef2f8] scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-3 py-2.5 text-xs font-medium border-b-2 transition-colors -mb-px whitespace-nowrap',
              activeTab === tab
                ? 'border-[#2f66c8] text-[#2f66c8]'
                : 'border-transparent text-[#44516a]'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target size={14} className="text-[#44516a]" />
                <h3 className="text-[#0f172a] font-medium text-sm">Career Goals</h3>
              </div>
              <button className="text-[#2f66c8] text-xs font-semibold">Edit</button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: "I'm looking for", value: 'Full-time opportunities' },
                { label: 'Desired Roles', value: 'UX Designer, Product Designer' },
                { label: 'Work Preference', value: 'Hybrid or Remote' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#8c97ad] text-xs">{item.label}</p>
                  <p className="text-[#0f172a] text-sm mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#44516a]" />
                <h3 className="text-[#0f172a] font-medium text-sm">Skills</h3>
              </div>
              <button className="text-[#2f66c8] text-xs font-semibold">Edit</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill} className="bg-[#eff4ff] text-[#2f66c8] text-xs px-2.5 py-1 rounded-full">
                  {skill}
                </span>
              ))}
              <button className="flex items-center gap-0.5 text-[#2f66c8] text-xs px-2.5 py-1 border border-dashed border-[#2f66c8] rounded-full">
                <Plus size={10} />
                Add skill
              </button>
            </div>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#0f172a] font-medium text-sm">Documents</h3>
              <button className="text-[#2f66c8] text-xs font-semibold">View All</button>
            </div>
            <div className="flex flex-col gap-2">
              {documents.slice(0, 3).map((doc) => (
                <div key={doc.id} className="flex items-center gap-2">
                  <div className={cn('w-7 h-7 rounded-[4px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#fef2f2]' : 'bg-[#ecfdf5]')}>
                    <FileText size={12} className={doc.type === 'pdf' ? 'text-[#ef4444]' : 'text-[#15803d]'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0f172a] text-xs font-medium truncate">{doc.name}</p>
                    <p className="text-[#8c97ad] text-xs">{doc.date}</p>
                  </div>
                  <button className="text-[#8c97ad]"><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-1.5 mt-2 text-[#2f66c8] text-xs font-medium w-full justify-center border border-[#d9e1ef] rounded-[6px] py-2 hover:bg-[#f8fafc]">
              <Upload size={11} />
              Upload New Document
            </button>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={14} className="text-[#44516a]" />
              <h3 className="text-[#0f172a] font-medium text-sm">Account & Security</h3>
            </div>
            {[
              { icon: <Lock size={12} />, label: 'Change Password' },
              { icon: <Shield size={12} />, label: 'Privacy Settings' },
              { icon: <Download size={12} />, label: 'Download My Data' },
            ].map((item) => (
              <button key={item.label} className="flex items-center justify-between w-full py-2.5 border-b border-[#eef2f8] last:border-0">
                <div className="flex items-center gap-2 text-[#44516a]">
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight size={12} className="text-[#8c97ad]" />
              </button>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Experience' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#0f172a] font-medium text-sm">Work Experience</h3>
            <button className="flex items-center gap-1 text-[#2f66c8] text-xs font-medium border border-[#2f66c8] rounded-[6px] px-2.5 py-1 hover:bg-[#eff4ff]">
              <Plus size={12} />
              Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 border-b border-[#eef2f8] pb-3 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
                  <Image src={exp.logo} alt={exp.company} width={40} height={40} className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0f172a] font-medium text-sm">{exp.title}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-[#44516a] text-xs">{exp.company}</span>
                    {exp.verified && <CheckCircle2 size={10} className="text-[#2f66c8]" />}
                  </div>
                  <p className="text-[#8c97ad] text-xs">{exp.period}</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="text-[#8c97ad]"><Pencil size={14} /></button>
                  <button className="text-[#8c97ad]"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Education' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#0f172a] font-medium text-sm">Education</h3>
            <button className="flex items-center gap-1 text-[#2f66c8] text-xs font-medium border border-[#2f66c8] rounded-[6px] px-2.5 py-1 hover:bg-[#eff4ff]">
              <Plus size={12} />
              Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-center gap-3 border-b border-[#eef2f8] pb-3 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
                  <Image src={edu.logo} alt={edu.school} width={40} height={40} className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0f172a] font-medium text-sm">{edu.school}</p>
                  <p className="text-[#44516a] text-xs">{edu.degree}</p>
                  <p className="text-[#8c97ad] text-xs">{edu.period}</p>
                </div>
                <div className="flex gap-1.5">
                  <button className="text-[#8c97ad]"><Pencil size={14} /></button>
                  <button className="text-[#8c97ad]"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Skills' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[#0f172a] font-medium text-sm">Skills</h3>
            <button className="text-[#2f66c8] text-xs font-semibold">Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-[#eff4ff] text-[#2f66c8] text-xs px-3 py-1.5 rounded-full">
                {skill}
              </span>
            ))}
            <button className="flex items-center gap-1 border border-dashed border-[#2f66c8] text-[#2f66c8] text-xs px-3 py-1.5 rounded-full">
              <Plus size={10} />
              Add skill
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Documents' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <h3 className="text-[#0f172a] font-medium text-sm mb-3">Documents</h3>
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 border-b border-[#eef2f8] pb-3 last:border-0 last:pb-0">
                <div className={cn('w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#fef2f2]' : 'bg-[#ecfdf5]')}>
                  <FileText size={13} className={doc.type === 'pdf' ? 'text-[#ef4444]' : 'text-[#15803d]'} />
                </div>
                <div className="flex-1">
                  <p className="text-[#0f172a] text-xs font-medium">{doc.name}</p>
                  <p className="text-[#8c97ad] text-xs">{doc.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-[#8c97ad]"><Globe size={13} /></button>
                  <button className="text-[#8c97ad]"><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-1.5 mt-3 text-[#2f66c8] text-xs font-medium w-full justify-center border border-[#d9e1ef] rounded-[6px] py-2 hover:bg-[#f8fafc]">
            <Upload size={11} />
            Upload New Document
          </button>
        </div>
      )}
    </div>
  );
}
