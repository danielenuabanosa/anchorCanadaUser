'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2, MapPin, User, Mail, Phone, Globe, Languages, FileText,
  Briefcase, GraduationCap, Pencil, Trash2, Plus, Upload, ArrowRight,
  ChevronRight, Lock, Shield, Download, Target, Building2, Sparkles,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';

import profileAvatar from '@/../assets/images/profile-avatar.png';
import googleLogo from '@/../assets/images/profile-google.png';
import shopifyLogo from '@/../assets/images/saved-shopify.png';
import utorontoLogo from '@/../assets/images/profile-utoronto.png';
import georgebrown from '@/../assets/images/profile-georgebrown.png';

const TABS = ['Overview', 'Experience', 'Education', 'Skills', 'Documents', 'Preferences'];

const TAB_ICONS: Record<string, React.ReactNode> = {
  Overview: <LayoutGrid size={14} />,
  Experience: <Briefcase size={14} />,
  Education: <GraduationCap size={14} />,
  Skills: <Sparkles size={14} />,
  Documents: <FileText size={14} />,
  Preferences: <Target size={14} />,
};

const skills = [
  'UI/UX Design', 'User Research', 'Figma', 'Wireframing', 'Prototyping',
  'Interaction Design', 'Adobe XD', 'Information Architecture', 'Web Design', 'Usability Testing',
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

function OverviewTab() {
  return (
    <div className="flex gap-5">
      <div className="flex-1 flex flex-col gap-5 min-w-0">
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#44516a]" />
                <h3 className="text-[#0f172a] font-medium text-base">Personal Information</h3>
              </div>
              <button className="text-[#2f66c8] text-sm font-semibold flex items-center gap-1 hover:underline">
                <Pencil size={12} />
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: <User size={14} />, label: 'Full Name', value: 'Jacob Sullivan' },
                { icon: <Mail size={14} />, label: 'Email', value: 'jacob.sullivan@gmail.com', badge: 'Verified' },
                { icon: <Phone size={14} />, label: 'Phone Number', value: '+1 (647) 555-0198', badge: 'Verified' },
                { icon: <MapPin size={14} />, label: 'Location', value: 'Toronto, Ontario, Canada' },
                { icon: <Languages size={14} />, label: 'Languages', value: 'English (Native), French (Conversational)' },
                { icon: <Globe size={14} />, label: 'Nationality', value: 'Canadian' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#8c97ad]">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#8c97ad] text-xs">{item.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[#0f172a] text-sm">{item.value}</p>
                      {item.badge && (
                        <span className="text-[#15803d] text-xs bg-[#ecfdf5] px-2 py-0.5 rounded-full font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-[#44516a]" />
                <h3 className="text-[#0f172a] font-medium text-base">Career Goals</h3>
              </div>
              <button className="text-[#2f66c8] text-sm font-semibold flex items-center gap-1 hover:underline">
                <Pencil size={12} />
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: <Target size={14} />, label: "I'm looking for", value: 'Full-time opportunities' },
                { icon: <Briefcase size={14} />, label: 'Desired Roles', value: 'UX Designer, Product Designer' },
                { icon: <Building2 size={14} />, label: 'Preferred Industries', value: 'Technology, Non-profit, Education' },
                { icon: <Globe size={14} />, label: 'Work Preference', value: 'Hybrid or Remote' },
                { icon: <MapPin size={14} />, label: 'Preferred Locations', value: 'Toronto, Canada\nOpen to relocation' },
              ].map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 text-[#8c97ad]">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#8c97ad] text-xs">{item.label}</p>
                    <p className="text-[#0f172a] text-sm mt-0.5 whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-[#44516a]" />
                <h3 className="text-[#0f172a] font-medium text-base">Experience</h3>
              </div>
              <button className="text-[#2f66c8] text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="flex flex-col gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
                    <Image src={exp.logo} alt={exp.company} width={40} height={40} className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0f172a] text-sm font-medium">{exp.title}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[#44516a] text-xs">{exp.company}</span>
                      {exp.verified && <CheckCircle2 size={10} className="text-[#2f66c8]" />}
                    </div>
                    <p className="text-[#8c97ad] text-xs">{exp.period}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="text-[#8c97ad] hover:text-[#44516a]"><Pencil size={14} /></button>
                    <button className="text-[#8c97ad] hover:text-[#ef4444]"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 mt-4 text-[#2f66c8] text-sm font-medium w-full justify-center border border-dashed border-[#2f66c8] rounded-[6px] py-2 hover:bg-[#eff4ff] transition-colors">
              <Plus size={14} />
              Add Experience
            </button>
          </div>

          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-[#44516a]" />
                <h3 className="text-[#0f172a] font-medium text-base">Education</h3>
              </div>
              <button className="text-[#2f66c8] text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
                    <Image src={edu.logo} alt={edu.school} width={40} height={40} className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0f172a] text-sm font-medium">{edu.school}</p>
                    <p className="text-[#44516a] text-xs">{edu.degree}</p>
                    <p className="text-[#8c97ad] text-xs">{edu.period}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button className="text-[#8c97ad] hover:text-[#44516a]"><Pencil size={14} /></button>
                    <button className="text-[#8c97ad] hover:text-[#ef4444]"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 mt-4 text-[#2f66c8] text-sm font-medium w-full justify-center border border-dashed border-[#2f66c8] rounded-[6px] py-2 hover:bg-[#eff4ff] transition-colors">
              <Plus size={14} />
              Add Education
            </button>
          </div>
        </div>
      </div>

      <div className="w-64 flex flex-col gap-4 shrink-0">
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[#44516a]" />
              <h3 className="text-[#0f172a] font-medium text-sm">Skills</h3>
            </div>
            <button className="text-[#2f66c8] text-xs font-semibold hover:underline">Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-[#eff4ff] text-[#2f66c8] text-xs px-3 py-1 rounded-full font-medium">
                {skill}
              </span>
            ))}
            <button className="text-[#2f66c8] text-xs font-medium flex items-center gap-0.5 hover:underline">
              <Plus size={10} />
              Add skill
            </button>
          </div>
        </div>

        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-[#44516a]" />
              <h3 className="text-[#0f172a] font-medium text-sm">Documents</h3>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2">
                <div className={cn('w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#fef2f2]' : 'bg-[#ecfdf5]')}>
                  <FileText size={14} className={doc.type === 'pdf' ? 'text-[#ef4444]' : 'text-[#15803d]'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0f172a] text-xs font-medium truncate">{doc.name}</p>
                  <p className="text-[#8c97ad] text-xs">{doc.date}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button className="text-[#8c97ad] hover:text-[#44516a]"><Globe size={12} /></button>
                  <button className="text-[#8c97ad] hover:text-[#ef4444]"><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 mt-3 text-[#2f66c8] text-xs font-medium w-full justify-center border border-[#d9e1ef] rounded-[6px] py-2 hover:bg-[#f8fafc] transition-colors">
            <Upload size={12} />
            Upload New Document
          </button>
        </div>

        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={14} className="text-[#44516a]" />
            <h3 className="text-[#0f172a] font-medium text-sm">Account & Security</h3>
          </div>
          {[
            { icon: <Lock size={14} />, label: 'Change Password' },
            { icon: <Shield size={14} />, label: 'Privacy Settings' },
            { icon: <Download size={14} />, label: 'Download My Data' },
          ].map((item) => (
            <button key={item.label} className="flex items-center justify-between w-full py-3 border-b border-[#eef2f8] last:border-0 hover:bg-[#f8fafc] -mx-4 px-4 transition-colors">
              <div className="flex items-center gap-2 text-[#44516a]">
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight size={14} className="text-[#8c97ad]" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-['Instrument_Serif'] text-[36px] leading-[56px] text-[#0f172a]">My Profile</h1>
        <p className="text-[#44516a] text-base">Manage your information and preferences to get better opportunities.</p>
      </div>

      <div className="flex gap-5">
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
            <div className="flex gap-5 items-start">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#eef2f8]">
                  <Image src={profileAvatar} alt="Sara Johnson" width={80} height={80} className="object-cover" />
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#2f66c8] rounded-full flex items-center justify-center">
                  <Pencil size={10} className="text-white" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-[#0f172a] font-medium text-lg">Sara Johnson</h2>
                  <CheckCircle2 size={16} className="text-[#2f66c8] fill-[#2f66c8] text-white" />
                </div>
                <div className="flex items-center gap-1.5 text-[#44516a] text-sm mb-1">
                  <MapPin size={12} />
                  <span>Toronto, Ontario, Canada</span>
                </div>
                <p className="text-[#44516a] text-sm mb-2">UX Designer • Student</p>
                <p className="text-[#44516a] text-sm leading-relaxed">Building a career in digital product design and user experience.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Open to Opportunities', 'Work Permit Holder', 'Available Immediately'].map((tag) => (
                    <span key={tag} className="bg-[#eff4ff] border border-[#2f66c8] text-[#2f66c8] text-xs px-3 py-1 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
              <h3 className="text-[#0f172a] font-medium text-base mb-4">Profile Strength</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 shrink-0">
                  <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#eef2f8" strokeWidth="8" />
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#22c55e" strokeWidth="8"
                      strokeDasharray="188.5" strokeDashoffset={188.5 * (1 - 0.92)}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[#0f172a] font-semibold text-base">92%</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[#44516a] text-sm">Excellent! Your profile is almost complete.</p>
                  <button className="mt-3 w-full border border-[#2f66c8] rounded-[6px] py-2 text-[#2f66c8] text-sm font-medium flex items-center justify-center gap-1 hover:bg-[#eff4ff] transition-colors">
                    Complete Profile (1 Remaining)
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#0f172a] font-medium text-base">Profile Completion Tips</h3>
              </div>
              <div className="flex flex-col gap-2">
                {completionTips.map((tip) => (
                  <div key={tip.text} className="flex items-center gap-2">
                    {tip.done ? (
                      <CheckCircle2 size={14} className="text-[#22c55e] shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-[#d9e1ef] shrink-0" />
                    )}
                    <span className={cn('text-sm', tip.done ? 'text-[#44516a]' : 'text-[#0f172a] font-medium')}>{tip.text}</span>
                  </div>
                ))}
              </div>
              <button className="mt-3 flex items-center gap-1 text-[#2f66c8] text-sm font-semibold hover:underline">
                View all tips
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-0 border-b border-[#eef2f8]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px',
              activeTab === tab
                ? 'border-[#2f66c8] text-[#2f66c8]'
                : 'border-transparent text-[#44516a] hover:text-[#0f172a]'
            )}
          >
            {TAB_ICONS[tab]}
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'Experience' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0f172a] font-medium text-base">Work Experience</h3>
            <button className="flex items-center gap-1 text-[#2f66c8] text-sm font-medium border border-[#2f66c8] rounded-[6px] px-3 py-1.5 hover:bg-[#eff4ff]">
              <Plus size={14} />
              Add Experience
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 border-b border-[#eef2f8] pb-4 last:border-0 last:pb-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
                  <Image src={exp.logo} alt={exp.company} width={48} height={48} className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0f172a] font-medium">{exp.title}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-[#44516a] text-sm">{exp.company}</span>
                    {exp.verified && <CheckCircle2 size={12} className="text-[#2f66c8]" />}
                  </div>
                  <p className="text-[#8c97ad] text-xs">{exp.period}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-[#8c97ad] hover:text-[#44516a]"><Pencil size={16} /></button>
                  <button className="text-[#8c97ad] hover:text-[#ef4444]"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'Education' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0f172a] font-medium text-base">Education</h3>
            <button className="flex items-center gap-1 text-[#2f66c8] text-sm font-medium border border-[#2f66c8] rounded-[6px] px-3 py-1.5 hover:bg-[#eff4ff]">
              <Plus size={14} />
              Add Education
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-center gap-3 border-b border-[#eef2f8] pb-4 last:border-0 last:pb-0">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
                  <Image src={edu.logo} alt={edu.school} width={48} height={48} className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-[#0f172a] font-medium">{edu.school}</p>
                  <p className="text-[#44516a] text-sm">{edu.degree}</p>
                  <p className="text-[#8c97ad] text-xs">{edu.period}</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-[#8c97ad] hover:text-[#44516a]"><Pencil size={16} /></button>
                  <button className="text-[#8c97ad] hover:text-[#ef4444]"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'Skills' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0f172a] font-medium text-base">Skills</h3>
            <button className="text-[#2f66c8] text-sm font-semibold">Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-[#eff4ff] text-[#2f66c8] text-sm px-4 py-2 rounded-full font-medium">
                {skill}
              </span>
            ))}
            <button className="flex items-center gap-1 border border-dashed border-[#2f66c8] text-[#2f66c8] text-sm px-4 py-2 rounded-full font-medium hover:bg-[#eff4ff]">
              <Plus size={14} />
              Add skill
            </button>
          </div>
        </div>
      )}
      {activeTab === 'Documents' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#0f172a] font-medium text-base">Documents</h3>
          </div>
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 border-b border-[#eef2f8] pb-3 last:border-0 last:pb-0">
                <div className={cn('w-10 h-10 rounded-[6px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#fef2f2]' : 'bg-[#ecfdf5]')}>
                  <FileText size={16} className={doc.type === 'pdf' ? 'text-[#ef4444]' : 'text-[#15803d]'} />
                </div>
                <div className="flex-1">
                  <p className="text-[#0f172a] font-medium text-sm">{doc.name}</p>
                  <p className="text-[#8c97ad] text-xs">{doc.date}</p>
                </div>
                <div className="flex gap-3">
                  <button className="text-[#8c97ad] hover:text-[#44516a]"><Globe size={16} /></button>
                  <button className="text-[#8c97ad] hover:text-[#ef4444]"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          <button className="flex items-center gap-2 mt-4 text-[#2f66c8] text-sm font-medium w-full justify-center border border-[#d9e1ef] rounded-[6px] py-2.5 hover:bg-[#f8fafc]">
            <Upload size={14} />
            Upload New Document
          </button>
        </div>
      )}
      {activeTab === 'Preferences' && (
        <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5">
          <h3 className="text-[#0f172a] font-medium text-base mb-4">Preferences</h3>
          <p className="text-[#44516a] text-sm">Manage your notification and opportunity preferences.</p>
        </div>
      )}
    </div>
  );
}
