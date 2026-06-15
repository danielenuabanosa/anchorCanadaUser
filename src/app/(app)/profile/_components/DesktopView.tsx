'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2, MapPin, User, Mail, Phone, Globe, Languages, FileText,
  Briefcase, GraduationCap, Pencil, Trash2, Plus, Upload, ArrowRight,
  ChevronRight, Lock, Shield, Download, Target, Building2, Sparkles,
  LayoutGrid, Eye, Component, Camera,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageTitle, TabNav, SectionCard, ProfileTags, ProfileStrengthRing,
  textPrimary, textSecondary, textTertiary, textBrand, card, bgBrand, bgBrandSubtle,
} from '@/shared/components/app/page-ui';
import profileAvatar from '@/../assets/images/profile-avatar.png';
import googleLogo from '@/../assets/images/profile-google.png';
import shopifyLogo from '@/../assets/images/saved-shopify.png';
import utorontoLogo from '@/../assets/images/profile-utoronto.png';
import georgebrown from '@/../assets/images/profile-georgebrown.png';

const TABS = [
  { id: 'Overview' as const, label: 'Overview', icon: <LayoutGrid size={16} /> },
  { id: 'Experience' as const, label: 'Experience', icon: <Briefcase size={16} /> },
  { id: 'Education' as const, label: 'Education', icon: <GraduationCap size={16} /> },
  { id: 'Skills' as const, label: 'Skills', icon: <Sparkles size={16} /> },
  { id: 'Documents' as const, label: 'Documents', icon: <FileText size={16} /> },
  { id: 'Preferences' as const, label: 'Preferences', icon: <Target size={16} /> },
];

type TabId = typeof TABS[number]['id'];

const skills = [
  'UI/UX Design', 'User Research', 'Figma', 'Wireframing', 'Prototyping',
  'Interaction Design', 'Adobe XD', 'Information Architecture', 'Web Design', 'Usability Testing',
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

const completionTips = [
  { text: 'Add your work experience', done: true },
  { text: 'Upload your resume', done: true },
  { text: 'Add 3+ key skills', done: true },
  { text: 'Set your career goals', done: false },
  { text: 'Add your education', done: true },
];

function EditLink() {
  return (
    <button type="button" className={cn(textBrand, 'text-sm font-semibold flex items-center gap-1 hover:underline')}>
      <Pencil size={12} /> Edit
    </button>
  );
}

function InfoField({ icon, label, value, badge }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div className="flex gap-3 items-start">
      <div className={cn('w-5 h-5 flex items-center justify-center shrink-0 mt-0.5', textTertiary)}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className={cn(textTertiary, 'text-xs')}>{label}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <p className={cn(textPrimary, 'text-sm whitespace-pre-line')}>{value}</p>
          {badge && (
            <span className="text-[#15803D] text-xs bg-[#ECFDF5] px-2 py-0.5 rounded-[4px] font-medium">{badge}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ExperienceItem({ exp, large }: { exp: typeof experiences[0]; large?: boolean }) {
  const sz = large ? 48 : 40;
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center shrink-0" style={{ width: sz, height: sz }}>
        <Image src={exp.logo} alt={exp.company} width={sz} height={sz} className="object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(textPrimary, large ? 'font-medium' : 'text-sm font-medium')}>{exp.title}</p>
        <div className="flex items-center gap-1">
          <span className={cn(textSecondary, large ? 'text-sm' : 'text-xs')}>{exp.company}</span>
          {exp.verified && <CheckCircle2 size={large ? 12 : 10} className="text-[#2F66C8]" />}
        </div>
        <p className={cn(textTertiary, 'text-xs')}>{exp.period}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button type="button" className={cn(textTertiary, 'hover:text-[#44516A]')}><Pencil size={large ? 16 : 14} /></button>
        <button type="button" className={cn(textTertiary, 'hover:text-[#EF4444]')}><Trash2 size={large ? 16 : 14} /></button>
      </div>
    </div>
  );
}

function EducationItem({ edu, large }: { edu: typeof education[0]; large?: boolean }) {
  const sz = large ? 48 : 40;
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg overflow-hidden bg-[#F8FAFC] flex items-center justify-center shrink-0" style={{ width: sz, height: sz }}>
        <Image src={edu.logo} alt={edu.school} width={sz} height={sz} className="object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(textPrimary, large ? 'font-medium' : 'text-sm font-medium')}>{edu.school}</p>
        <p className={cn(textSecondary, large ? 'text-sm' : 'text-xs')}>{edu.degree}</p>
        <p className={cn(textTertiary, 'text-xs')}>{edu.period}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button type="button" className={cn(textTertiary, 'hover:text-[#44516A]')}><Pencil size={large ? 16 : 14} /></button>
        <button type="button" className={cn(textTertiary, 'hover:text-[#EF4444]')}><Trash2 size={large ? 16 : 14} /></button>
      </div>
    </div>
  );
}

function AddButton({ label }: { label: string }) {
  return (
    <button type="button" className={cn('flex items-center gap-2 mt-4 text-sm font-medium w-full justify-center border border-dashed border-[#2F66C8] rounded-[6px] py-2 hover:bg-[#EFF4FF] transition-colors', textBrand)}>
      <Plus size={14} /> {label}
    </button>
  );
}

function OverviewTab() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 items-start">
      <div className="flex flex-col gap-5">
        <SectionCard icon={<FileText size={20} />} title="Personal Information" action={<EditLink />}>
          <div className="flex flex-col gap-4">
            <InfoField icon={<User size={14} />} label="Full Name" value="Jacob Sullivan" />
            <InfoField icon={<Mail size={14} />} label="Email" value="jacob.sullivan@gmail.com" badge="Verified" />
            <InfoField icon={<Phone size={14} />} label="Phone Number" value="+1 (647) 555-0198" badge="Verified" />
            <InfoField icon={<MapPin size={14} />} label="Location" value="Toronto, Ontario, Canada" />
            <InfoField icon={<Languages size={14} />} label="Languages" value="English (Native), French (Conversational)" />
            <InfoField icon={<Globe size={14} />} label="Nationality" value="Canadian" />
          </div>
        </SectionCard>

        <SectionCard
          icon={<Briefcase size={20} />}
          title="Experience"
          action={<button type="button" className={cn(textBrand, 'text-sm font-semibold hover:underline')}>View All</button>}
        >
          <div className="flex flex-col gap-4">
            {experiences.map((exp) => <ExperienceItem key={exp.id} exp={exp} />)}
          </div>
          <AddButton label="Add Experience" />
        </SectionCard>
      </div>

      <div className="flex flex-col gap-5">
        <SectionCard icon={<Target size={20} />} title="Career Goals" action={<EditLink />}>
          <div className="flex flex-col gap-4">
            <InfoField icon={<Target size={14} />} label="I'm looking for" value="Full-time opportunities" />
            <InfoField icon={<Briefcase size={14} />} label="Desired Roles" value="UX Designer, Product Designer" />
            <InfoField icon={<Building2 size={14} />} label="Preferred Industries" value="Technology, Non-profit, Education" />
            <InfoField icon={<Globe size={14} />} label="Work Preference" value="Hybrid or Remote" />
            <InfoField icon={<MapPin size={14} />} label="Preferred Locations" value={'Toronto, Canada\nOpen to relocation'} />
          </div>
        </SectionCard>

        <SectionCard
          icon={<GraduationCap size={20} />}
          title="Education"
          action={<button type="button" className={cn(textBrand, 'text-sm font-semibold hover:underline')}>View All</button>}
        >
          <div className="flex flex-col gap-4">
            {education.map((edu) => <EducationItem key={edu.id} edu={edu} />)}
          </div>
          <AddButton label="Add Education" />
        </SectionCard>
      </div>

      <div className="flex flex-col gap-5">
        <SectionCard
          icon={<Component size={20} />}
          title="Skills"
          action={<button type="button" className={cn(textBrand, 'text-sm font-semibold hover:underline')}>Edit</button>}
        >
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <span key={skill} className={cn(bgBrandSubtle, textBrand, 'text-sm font-medium px-2.5 py-1 rounded-[4px]')}>
                {skill}
              </span>
            ))}
            <button type="button" className={cn(textBrand, 'text-sm font-medium flex items-center gap-0.5 hover:underline')}>
              <Plus size={10} /> Add skill
            </button>
          </div>
        </SectionCard>

        <SectionCard icon={<FileText size={20} />} title="Documents">
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2">
                <div className={cn('w-8 h-8 rounded-[4px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#FEF2F2]' : 'bg-[#ECFDF5]')}>
                  <FileText size={14} className={doc.type === 'pdf' ? 'text-[#EF4444]' : 'text-[#15803D]'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn(textPrimary, 'text-sm font-medium truncate')}>{doc.name}</p>
                  <p className={cn(textSecondary, 'text-xs')}>{doc.date}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button type="button" className={cn(textTertiary, 'hover:text-[#44516A]')}><Eye size={14} /></button>
                  <button type="button" className={cn(textTertiary, 'hover:text-[#EF4444]')}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={cn('flex items-center gap-2 mt-4 text-sm font-medium w-full justify-center border border-[#2F66C8] rounded-[6px] h-[45px] hover:bg-[#EFF4FF] transition-colors', textBrand)}>
            <Upload size={16} /> Upload New Document
          </button>
        </SectionCard>

        <SectionCard icon={<Shield size={20} />} title="Account & Security">
          {[
            { icon: <Lock size={18} />, label: 'Change Password' },
            { icon: <Shield size={18} />, label: 'Privacy Settings' },
            { icon: <Download size={18} />, label: 'Download My Data' },
          ].map((item) => (
            <button key={item.label} type="button" className="flex items-center justify-between w-full py-2.5 border-b border-[#EEF2F8] last:border-0 hover:bg-[#F8FAFC] -mx-5 px-5 transition-colors">
              <div className={cn('flex items-center gap-3.5', textPrimary)}>
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </div>
              <ChevronRight size={18} className={textTertiary} />
            </button>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}

export default function DesktopView() {
  const [activeTab, setActiveTab] = useState<TabId>('Overview');

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        title="My Profile"
        subtitle="Manage your information and preferences to get better opportunities."
      />

      <div className="flex flex-col lg:flex-row gap-5">
        <div className={cn(card, 'p-5 flex-1 min-h-[301px] flex flex-col justify-between')}>
          <div className="flex gap-5 items-start">
            <div className="relative shrink-0">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-[#EEF2F8]">
                <Image src={profileAvatar} alt="Sara Johnson" width={100} height={100} className="object-cover" />
              </div>
              <button type="button" className="absolute bottom-0 right-0 w-[26px] h-[26px] bg-white rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.05)] flex items-center justify-center">
                <Camera size={13} className="text-[#0F172A]" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <h2 className="font-instrument-serif text-2xl text-[#0F172A]">Sara Johnson</h2>
                <CheckCircle2 size={18} className="text-[#2F66C8] shrink-0" />
              </div>
              <div className={cn('flex items-center gap-1.5 text-xs mb-1', textSecondary)}>
                <MapPin size={12} />
                <span>Toronto, Ontario, Canada</span>
              </div>
              <p className={cn(textSecondary, 'text-xs')}>UX Designer • Student</p>
              <p className={cn(textSecondary, 'text-sm mt-3 leading-[1.6]')}>
                Building a career in digital product design and user experience.
              </p>
            </div>
          </div>
          <ProfileTags className="mt-4" />
        </div>

        <div className={cn(card, 'p-5 flex-1 min-h-[301px] flex flex-col justify-between')}>
          <h3 className={cn(textPrimary, 'font-medium text-lg')}>Profile Strength</h3>
          <div className="flex items-center gap-5">
            <ProfileStrengthRing percent={92} size={140} />
            <div className="flex-1">
              <p className={cn(textSecondary, 'text-sm')}>Excellent! Your profile is almost complete.</p>
              <button type="button" className={cn('mt-3 w-full border border-[#2F66C8] rounded-[6px] py-2.5 text-sm font-medium flex items-center justify-center gap-1 hover:bg-[#EFF4FF] transition-colors', textBrand)}>
                Complete Profile (1 Remaining)
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        <div className={cn(card, 'p-5 flex-1 min-h-[301px] flex flex-col justify-between')}>
          <h3 className={cn(textPrimary, 'font-medium text-lg')}>Profile Completion Tips</h3>
          <div className="flex flex-col gap-2">
            {completionTips.map((tip) => (
              <div key={tip.text} className="flex items-center gap-2">
                {tip.done ? (
                  <CheckCircle2 size={14} className="text-[#22C55E] shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-[#D9E1EF] shrink-0" />
                )}
                <span className={cn('text-sm', tip.done ? textSecondary : cn(textPrimary, 'font-medium'))}>{tip.text}</span>
              </div>
            ))}
          </div>
          <button type="button" className={cn('flex items-center gap-1 text-sm font-semibold hover:underline', textBrand)}>
            View all tips <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <TabNav tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {activeTab === 'Overview' && <OverviewTab />}
      {activeTab === 'Experience' && (
        <SectionCard
          icon={<Briefcase size={20} />}
          title="Work Experience"
          action={
            <button type="button" className={cn('flex items-center gap-1 text-sm font-medium border border-[#2F66C8] rounded-[6px] px-3 py-1.5 hover:bg-[#EFF4FF]', textBrand)}>
              <Plus size={14} /> Add Experience
            </button>
          }
        >
          <div className="flex flex-col gap-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="border-b border-[#EEF2F8] pb-4 last:border-0 last:pb-0">
                <ExperienceItem exp={exp} large />
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {activeTab === 'Education' && (
        <SectionCard
          icon={<GraduationCap size={20} />}
          title="Education"
          action={
            <button type="button" className={cn('flex items-center gap-1 text-sm font-medium border border-[#2F66C8] rounded-[6px] px-3 py-1.5 hover:bg-[#EFF4FF]', textBrand)}>
              <Plus size={14} /> Add Education
            </button>
          }
        >
          <div className="flex flex-col gap-4">
            {education.map((edu) => (
              <div key={edu.id} className="border-b border-[#EEF2F8] pb-4 last:border-0 last:pb-0">
                <EducationItem edu={edu} large />
              </div>
            ))}
          </div>
        </SectionCard>
      )}
      {activeTab === 'Skills' && (
        <SectionCard icon={<Component size={20} />} title="Skills" action={<button type="button" className={cn(textBrand, 'text-sm font-semibold')}>Edit</button>}>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <span key={skill} className={cn(bgBrandSubtle, textBrand, 'text-sm font-medium px-2.5 py-1 rounded-[4px]')}>{skill}</span>
            ))}
            <button type="button" className={cn('flex items-center gap-1 border border-dashed border-[#2F66C8] text-sm px-2.5 py-1 rounded-[4px] font-medium hover:bg-[#EFF4FF]', textBrand)}>
              <Plus size={14} /> Add skill
            </button>
          </div>
        </SectionCard>
      )}
      {activeTab === 'Documents' && (
        <SectionCard icon={<FileText size={20} />} title="Documents">
          <div className="flex flex-col gap-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center gap-3 border-b border-[#EEF2F8] pb-3 last:border-0 last:pb-0">
                <div className={cn('w-10 h-10 rounded-[6px] flex items-center justify-center shrink-0', doc.type === 'pdf' ? 'bg-[#FEF2F2]' : 'bg-[#ECFDF5]')}>
                  <FileText size={16} className={doc.type === 'pdf' ? 'text-[#EF4444]' : 'text-[#15803D]'} />
                </div>
                <div className="flex-1">
                  <p className={cn(textPrimary, 'font-medium text-sm')}>{doc.name}</p>
                  <p className={cn(textTertiary, 'text-xs')}>{doc.date}</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" className={cn(textTertiary, 'hover:text-[#44516A]')}><Eye size={16} /></button>
                  <button type="button" className={cn(textTertiary, 'hover:text-[#EF4444]')}><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className={cn('flex items-center gap-2 mt-4 text-sm font-medium w-full justify-center border border-[#2F66C8] rounded-[6px] h-[45px] hover:bg-[#EFF4FF]', textBrand)}>
            <Upload size={14} /> Upload New Document
          </button>
        </SectionCard>
      )}
      {activeTab === 'Preferences' && (
        <SectionCard icon={<Target size={20} />} title="Preferences" action={<EditLink />}>
          <div className="flex flex-col gap-4">
            <InfoField icon={<Target size={14} />} label="I'm looking for" value="Full-time opportunities" />
            <InfoField icon={<Briefcase size={14} />} label="Desired Roles" value="UX Designer, Product Designer" />
            <InfoField icon={<Building2 size={14} />} label="Preferred Industries" value="Technology, Non-profit, Education" />
            <InfoField icon={<Globe size={14} />} label="Work Preference" value="Hybrid or Remote" />
            <InfoField icon={<MapPin size={14} />} label="Preferred Locations" value="Toronto, Canada — Open to relocation" />
          </div>
        </SectionCard>
      )}
    </div>
  );
}
