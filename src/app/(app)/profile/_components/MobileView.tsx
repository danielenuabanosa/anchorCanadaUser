'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2, MapPin, User, Mail, Phone, Globe, Languages, FileText,
  Briefcase, GraduationCap, Pencil, Trash2, Plus, Upload, ArrowRight,
  ChevronRight, Lock, Shield, Download, Target, Building2, Sparkles,
  LayoutGrid, Eye, Award, Star, Trophy, Camera,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageTitle, TabNav, ProfileTags, ProfileStrengthRing,
  textPrimary, textSecondary, textTertiary, textBrand, card, bgBrand, bgBrandSubtle,
} from '@/shared/components/app/page-ui';
import profileAvatar from '@/../assets/images/profile-avatar.png';
import googleLogo from '@/../assets/images/profile-google.png';
import shopifyLogo from '@/../assets/images/saved-shopify.png';
import utorontoLogo from '@/../assets/images/profile-utoronto.png';
import georgebrown from '@/../assets/images/profile-georgebrown.png';

const TABS = [
  { id: 'Overview' as const, label: 'Overview', icon: <LayoutGrid size={14} /> },
  { id: 'Experience' as const, label: 'Experience', icon: <Briefcase size={14} /> },
  { id: 'Education' as const, label: 'Education', icon: <GraduationCap size={14} /> },
  { id: 'Skills' as const, label: 'Skills', icon: <Sparkles size={14} /> },
  { id: 'Documents' as const, label: 'Documents', icon: <FileText size={14} /> },
  { id: 'Preferences' as const, label: 'Preferences', icon: <Target size={14} /> },
];

type TabId = typeof TABS[number]['id'];

const skills = [
  'UI/UX Design', 'User Research', 'Figma', 'Wireframing', 'Prototyping',
  'Interaction Design', 'Adobe XD', 'Web Design',
];

const experiences = [
  { id: 1, title: 'UX Design Intern', company: 'Google', verified: true, period: 'Mar 2024 – Aug 2024 • 4 months', logo: googleLogo },
  { id: 2, title: 'UX Design Intern', company: 'Shopify', verified: true, period: 'Jan 2024 – Apr 2024 • 4 months', logo: shopifyLogo },
];

const education = [
  { id: 1, school: 'University of Toronto', degree: 'Bachelor of Information Science', period: 'Sep 2021 – May 2025', logo: utorontoLogo },
  { id: 2, school: 'George Brown College', degree: 'UI/UX Design Certificate', period: 'Jan 2023 – Apr 2023', logo: georgebrown },
];

const documents = [
  { id: 1, name: 'Resume.pdf', date: 'Uploaded May 6, 2026', type: 'pdf' as const },
  { id: 2, name: 'Cover Letter.pdf', date: 'Uploaded May 6, 2026', type: 'pdf' as const },
  { id: 3, name: 'Portfolio.pdf', date: 'Uploaded Apr 28, 2026', type: 'pdf' as const },
  { id: 4, name: 'Design Certificate.png', date: 'Uploaded Apr 10, 2026', type: 'img' as const },
];

const BADGES = [
  { label: 'Profile Master', desc: 'Completed 90%+ of profile', icon: <Trophy size={18} className="text-[#2F66C8]" />, bg: 'bg-[#EFF4FF]' },
  { label: 'First Application', desc: 'Submitted your first app', icon: <FileText size={18} className="text-[#15803D]" />, bg: 'bg-[#ECFDF5]' },
  { label: 'Shortlisted', desc: 'Got shortlisted once', icon: <Star size={18} className="text-[#7C3AED]" />, bg: 'bg-[#F5F3FF]' },
  { label: 'Rising Star', desc: 'Active for 30+ days', icon: <Award size={18} className="text-[#EA580C]" />, bg: 'bg-[#FFF7ED]' },
];

function CardHeader({ icon, title, action }: { icon?: React.ReactNode; title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className={cn(textPrimary, 'font-medium text-base')}>{title}</h3>
      </div>
      {action}
    </div>
  );
}

export default function MobileView() {
  const [activeTab, setActiveTab] = useState<TabId>('Overview');

  return (
    <div className="flex flex-col gap-4 pb-6">
      <PageTitle
        title="My Profile"
        subtitle="Manage your information and preferences to get better opportunities."
      />

      <div className={cn(card, 'p-4')}>
        <div className="flex gap-3 items-start">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#EEF2F8]">
              <Image src={profileAvatar} alt="Sara Johnson" width={64} height={64} className="object-cover" />
            </div>
            <button type="button" className={cn('absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center', bgBrand)}>
              <Camera size={8} className="text-white" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="font-instrument-serif text-2xl text-[#0F172A]">Sara Johnson</h2>
              <CheckCircle2 size={14} className="text-[#2F66C8] shrink-0" />
            </div>
            <div className={cn('flex items-center gap-1 text-xs mb-0.5', textSecondary)}>
              <MapPin size={10} />
              <span>Toronto, Ontario, Canada</span>
            </div>
            <p className={cn(textSecondary, 'text-xs')}>UX Designer • Student</p>
            <p className={cn(textSecondary, 'text-sm mt-2 leading-relaxed')}>
              Building a career in digital product design and user experience.
            </p>
            <ProfileTags className="mt-2" />
          </div>
        </div>

        <div className="mt-4 border-t border-[#EEF2F8] pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <ProfileStrengthRing percent={92} size={60} />
            <p className={cn(textSecondary, 'text-sm flex-1')}>Excellent! Your profile is almost complete.</p>
          </div>
          <button type="button" className={cn('w-full border border-[#2F66C8] rounded-[6px] h-[45px] text-sm font-medium flex items-center justify-center gap-1 hover:bg-[#EFF4FF]', textBrand)}>
            Complete Profile <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'Overview' && (
        <div className="flex flex-col gap-4">
          <div className={cn(card, 'p-4')}>
            <CardHeader
              icon={<Target size={16} className={textPrimary} />}
              title="Career Goals"
              action={<button type="button" className={cn(textBrand, 'text-xs font-semibold')}>Edit</button>}
            />
            <div className="flex flex-col gap-3">
              {[
                { label: "I'm looking for", value: 'Full-time opportunities' },
                { label: 'Desired Roles', value: 'UX Designer, Product Designer' },
                { label: 'Preferred Industries', value: 'Technology, Non-profit, Education' },
                { label: 'Work Preference', value: 'Hybrid or Remote' },
                { label: 'Preferred Location', value: 'Toronto, Canada' },
                { label: 'Open to relocation', value: 'Yes', highlight: true },
              ].map((item) => (
                <div key={item.label}>
                  <p className={cn(textTertiary, 'text-xs')}>{item.label}</p>
                  <p className={cn('text-sm mt-0.5', item.highlight ? 'text-[#15803D] font-medium' : textPrimary)}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(card, 'p-4')}>
            <CardHeader
              icon={<Sparkles size={16} className={textPrimary} />}
              title="Skills"
              action={<button type="button" className={cn(textBrand, 'text-xs font-semibold')}>Edit</button>}
            />
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className={cn(bgBrandSubtle, textBrand, 'text-xs font-medium px-2.5 py-1 rounded-[4px]')}>{skill}</span>
              ))}
              <button type="button" className={cn('flex items-center gap-0.5 text-xs font-medium px-2.5 py-1 border border-dashed border-[#2F66C8] rounded-[4px]', textBrand)}>
                <Plus size={10} /> Add skill
              </button>
            </div>
          </div>

          <div className={cn(card, 'p-4')}>
            <CardHeader title="Documents" icon={<FileText size={16} className={textPrimary} />}
              action={<button type="button" className={cn(textBrand, 'text-xs font-semibold')}>View All</button>} />
            <div className="flex flex-col gap-2">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center gap-2">
                  <div className={cn('w-7 h-7 rounded-[4px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#FEF2F2]' : 'bg-[#ECFDF5]')}>
                    <FileText size={12} className={doc.type === 'pdf' ? 'text-[#EF4444]' : 'text-[#15803D]'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(textPrimary, 'text-xs font-medium truncate')}>{doc.name}</p>
                    <p className={cn(textSecondary, 'text-xs')}>{doc.date}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button type="button" className={textTertiary}><Eye size={12} /></button>
                    <button type="button" className={textTertiary}><Trash2 size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className={cn('flex items-center gap-1.5 mt-3 text-sm font-medium w-full justify-center border border-[#2F66C8] rounded-[6px] h-[45px] hover:bg-[#EFF4FF]', textBrand)}>
              <Upload size={14} /> Upload New Document
            </button>
          </div>

          <div className={cn(card, 'p-4')}>
            <CardHeader
              icon={<User size={16} className={textPrimary} />}
              title="Personal Information"
              action={<button type="button" className={cn(textBrand, 'text-xs font-semibold')}>Edit</button>}
            />
            <div className="flex flex-col gap-3">
              {[
                { label: 'Full Name', value: 'Jacob Sullivan' },
                { label: 'Email', value: 'jacob.sullivan@gmail.com', badge: 'Verified' },
                { label: 'Phone Number', value: '+1 (647) 555-0198', badge: 'Verified' },
                { label: 'Date of Birth', value: 'May 12, 1988' },
                { label: 'Location', value: 'Toronto, Ontario, Canada' },
                { label: 'Languages', value: 'English (Native), French (Conversational)' },
                { label: 'Nationality', value: 'Canadian' },
              ].map((item) => (
                <div key={item.label}>
                  <p className={cn(textTertiary, 'text-xs')}>{item.label}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className={cn(textPrimary, 'text-sm')}>{item.value}</p>
                    {item.badge && <span className="text-[#15803D] text-xs bg-[#ECFDF5] px-1.5 py-0.5 rounded-[4px]">{item.badge}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(card, 'p-4')}>
            <CardHeader
              icon={<Briefcase size={16} className={textPrimary} />}
              title="Experience"
              action={<button type="button" className={cn(textBrand, 'text-xs font-semibold')}>View All</button>}
            />
            <div className="flex flex-col gap-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center shrink-0">
                    <Image src={exp.logo} alt={exp.company} width={40} height={40} className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className={cn(textPrimary, 'font-medium text-sm')}>{exp.title}</p>
                    <div className="flex items-center gap-1">
                      <span className={cn(textSecondary, 'text-xs')}>{exp.company}</span>
                      {exp.verified && <CheckCircle2 size={10} className="text-[#2F66C8]" />}
                    </div>
                    <p className={cn(textTertiary, 'text-xs')}>{exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className={cn('flex items-center gap-1 mt-3 text-xs font-medium w-full justify-center border border-dashed border-[#2F66C8] rounded-[6px] py-2', textBrand)}>
              <Plus size={12} /> Add Experience
            </button>
          </div>

          <div className={cn(card, 'p-4')}>
            <CardHeader
              icon={<GraduationCap size={16} className={textPrimary} />}
              title="Education"
              action={<button type="button" className={cn(textBrand, 'text-xs font-semibold')}>View All</button>}
            />
            <div className="flex flex-col gap-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center shrink-0">
                    <Image src={edu.logo} alt={edu.school} width={40} height={40} className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className={cn(textPrimary, 'font-medium text-sm')}>{edu.school}</p>
                    <p className={cn(textSecondary, 'text-xs')}>{edu.degree}</p>
                    <p className={cn(textTertiary, 'text-xs')}>{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className={cn('flex items-center gap-1 mt-3 text-xs font-medium w-full justify-center border border-dashed border-[#2F66C8] rounded-[6px] py-2', textBrand)}>
              <Plus size={12} /> Add Education
            </button>
          </div>

          <div className={cn(card, 'p-4')}>
            <CardHeader icon={<Shield size={16} className={textPrimary} />} title="Account & Security" />
            {[
              { icon: <Lock size={14} />, label: 'Change Password' },
              { icon: <Shield size={14} />, label: 'Privacy Settings' },
              { icon: <Download size={14} />, label: 'Download My Data' },
            ].map((item) => (
              <button key={item.label} type="button" className="flex items-center justify-between w-full py-2.5 border-b border-[#EEF2F8] last:border-0">
                <div className={cn('flex items-center gap-2', textPrimary)}>
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </div>
                <ChevronRight size={14} className={textTertiary} />
              </button>
            ))}
          </div>

          <div className={cn(card, 'p-4')}>
            <CardHeader icon={<Award size={16} className={textPrimary} />} title="Badges & Achievements" />
            <div className="grid grid-cols-2 gap-3">
              {BADGES.map((badge) => (
                <div key={badge.label} className={cn('rounded-[8px] p-3 border border-[#EEF2F8]', badge.bg)}>
                  <div className="mb-2">{badge.icon}</div>
                  <p className={cn(textPrimary, 'text-xs font-medium')}>{badge.label}</p>
                  <p className={cn(textTertiary, 'text-xs mt-0.5')}>{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Experience' && (
        <div className={cn(card, 'p-4')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={cn(textPrimary, 'font-medium text-base')}>Work Experience</h3>
            <button type="button" className={cn('flex items-center gap-1 text-xs font-medium border border-[#2F66C8] rounded-[6px] px-2.5 py-1 hover:bg-[#EFF4FF]', textBrand)}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 border-b border-[#EEF2F8] pb-3 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center shrink-0">
                  <Image src={exp.logo} alt={exp.company} width={40} height={40} className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className={cn(textPrimary, 'font-medium text-sm')}>{exp.title}</p>
                  <div className="flex items-center gap-1">
                    <span className={cn(textSecondary, 'text-xs')}>{exp.company}</span>
                    {exp.verified && <CheckCircle2 size={10} className="text-[#2F66C8]" />}
                  </div>
                  <p className={cn(textTertiary, 'text-xs')}>{exp.period}</p>
                </div>
                <div className="flex gap-1.5">
                  <button type="button" className={textTertiary}><Pencil size={14} /></button>
                  <button type="button" className={textTertiary}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Education' && (
        <div className={cn(card, 'p-4')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={cn(textPrimary, 'font-medium text-base')}>Education</h3>
            <button type="button" className={cn('flex items-center gap-1 text-xs font-medium border border-[#2F66C8] rounded-[6px] px-2.5 py-1 hover:bg-[#EFF4FF]', textBrand)}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex items-center gap-3 border-b border-[#EEF2F8] pb-3 last:border-0 last:pb-0">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center shrink-0">
                  <Image src={edu.logo} alt={edu.school} width={40} height={40} className="object-contain" />
                </div>
                <div className="flex-1">
                  <p className={cn(textPrimary, 'font-medium text-sm')}>{edu.school}</p>
                  <p className={cn(textSecondary, 'text-xs')}>{edu.degree}</p>
                  <p className={cn(textTertiary, 'text-xs')}>{edu.period}</p>
                </div>
                <div className="flex gap-1.5">
                  <button type="button" className={textTertiary}><Pencil size={14} /></button>
                  <button type="button" className={textTertiary}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Skills' && (
        <div className={cn(card, 'p-4')}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={cn(textPrimary, 'font-medium text-base')}>Skills</h3>
            <button type="button" className={cn(textBrand, 'text-xs font-semibold')}>Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className={cn(bgBrandSubtle, textBrand, 'text-xs font-medium px-3 py-1.5 rounded-[4px]')}>{skill}</span>
            ))}
            <button type="button" className={cn('flex items-center gap-1 border border-dashed border-[#2F66C8] text-xs px-3 py-1.5 rounded-[4px]', textBrand)}>
              <Plus size={10} /> Add skill
            </button>
          </div>
        </div>
      )}

      {activeTab === 'Documents' && (
        <div className={cn(card, 'p-4')}>
          <h3 className={cn(textPrimary, 'font-medium text-base mb-3')}>Documents</h3>
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 border-b border-[#EEF2F8] pb-3 last:border-0 last:pb-0">
                <div className={cn('w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#FEF2F2]' : 'bg-[#ECFDF5]')}>
                  <FileText size={13} className={doc.type === 'pdf' ? 'text-[#EF4444]' : 'text-[#15803D]'} />
                </div>
                <div className="flex-1">
                  <p className={cn(textPrimary, 'text-xs font-medium')}>{doc.name}</p>
                  <p className={cn(textSecondary, 'text-xs')}>{doc.date}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className={textTertiary}><Eye size={13} /></button>
                  <button type="button" className={textTertiary}><Trash2 size={13} /></button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={cn('flex items-center gap-1.5 mt-3 text-sm font-medium w-full justify-center border border-[#2F66C8] rounded-[6px] h-[45px] hover:bg-[#EFF4FF]', textBrand)}>
            <Upload size={14} /> Upload New Document
          </button>
        </div>
      )}

      {activeTab === 'Preferences' && (
        <div className={cn(card, 'p-4')}>
          <CardHeader icon={<Target size={16} className={textPrimary} />} title="Preferences" action={<button type="button" className={cn(textBrand, 'text-xs font-semibold')}>Edit</button>} />
          <div className="flex flex-col gap-3">
            {[
              { label: "I'm looking for", value: 'Full-time opportunities' },
              { label: 'Desired Roles', value: 'UX Designer, Product Designer' },
              { label: 'Preferred Industries', value: 'Technology, Non-profit, Education' },
              { label: 'Work Preference', value: 'Hybrid or Remote' },
              { label: 'Preferred Location', value: 'Toronto, Canada' },
            ].map((item) => (
              <div key={item.label}>
                <p className={cn(textTertiary, 'text-xs')}>{item.label}</p>
                <p className={cn(textPrimary, 'text-sm mt-0.5')}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
