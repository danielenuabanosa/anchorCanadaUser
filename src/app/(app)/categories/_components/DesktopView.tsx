'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Bell, EllipsisVertical, CheckCircle2, X, Share2, Flag, BellPlus, Copy, Link } from 'lucide-react';
import { cn } from '@/lib/utils';

import shopifyLogo from '@/../assets/images/saved-shopify.png';
import rbcLogo from '@/../assets/images/saved-rbc.png';
import googleLogo from '@/../assets/images/saved-google.png';
import tdLogo from '@/../assets/images/saved-tdbank.png';

const providers = [
  {
    id: 'shopify', name: 'Shopify', type: 'Technology', location: 'Ottawa, ON', verified: true,
    description: 'Empowering entrepreneurs worldwide with the tools they need to build their businesses.',
    opportunities: 12, followers: '8.5K', logo: shopifyLogo,
  },
  {
    id: 'rbc', name: 'RBC Foundation', type: 'Finance', location: 'Toronto, ON', verified: true,
    description: 'Supporting communities and driving positive change through economic empowerment.',
    opportunities: 18, followers: '6.2K', logo: rbcLogo,
  },
  {
    id: 'utoronto', name: 'University of Toronto', type: 'Education', location: 'Toronto, ON', verified: true,
    description: "Canada's leading university committed to research, learning and community impact.",
    opportunities: 24, followers: '15.3K', logo: null, initials: 'UofT',
  },
  {
    id: 'ymca', name: 'YMCA Canada', type: 'Non-profit', location: 'Multiple Locations', verified: true,
    description: 'Building healthy communities through programs that support youth growth and well-being.',
    opportunities: 9, followers: '4.1K', logo: null, initials: 'Y',
  },
  {
    id: 'google', name: 'Google', type: 'Technology', location: 'Waterloo, ON', verified: true,
    description: 'Innovating for everyone and creating tools that empower people everywhere.',
    opportunities: 16, followers: '22.1K', logo: googleLogo,
  },
  {
    id: 'wwf', name: 'World Wildlife Fund Can...', type: 'Non-profit', location: 'Toronto, ON', verified: true,
    description: 'Protecting nature and biodiversity for a sustainable future.',
    opportunities: 7, followers: '3.2K', logo: null, initials: 'WWF',
  },
  {
    id: 'td', name: 'TD Bank Group', type: 'Finance', location: 'Toronto, ON', verified: true,
    description: 'Committed to enriching the lives of customers, communities and colleagues.',
    opportunities: 20, followers: '7.8K', logo: tdLogo,
  },
  {
    id: 'sickkids', name: 'SickKids Foundation', type: 'Non-profit', location: 'Multiple Locations', verified: true,
    description: 'Advancing child health through research, education and compassionate care.',
    opportunities: 5, followers: '2.7K', logo: null, initials: 'SK',
  },
];

type ModalType = 'share' | 'report' | 'notification' | null;

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1 text-[#15803d]">
      <CheckCircle2 size={14} className="fill-[#15803d] text-white" />
      <span className="text-xs font-medium text-[#15803d]">Verified</span>
    </div>
  );
}

function ProviderCard({ provider, onMenuClick }: {
  provider: typeof providers[0];
  onMenuClick: (id: string, action: 'share' | 'report' | 'notification') => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] p-5 flex flex-col gap-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.05)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <VerifiedBadge />
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#8c97ad] hover:text-[#44516a] p-1"
          >
            <EllipsisVertical size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 bg-white border border-[#d9e1ef] rounded-[8px] shadow-[0px_6px_16px_rgba(0,0,0,0.08)] z-10 w-48 overflow-hidden">
              <button
                onClick={() => { setMenuOpen(false); onMenuClick(provider.id, 'report'); }}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#44516a] hover:bg-[#f8fafc] w-full text-left"
              >
                <Flag size={14} />
                Report Provider
              </button>
              <button
                onClick={() => { setMenuOpen(false); onMenuClick(provider.id, 'notification'); }}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#44516a] hover:bg-[#f8fafc] w-full text-left"
              >
                <BellPlus size={14} />
                Notify Me Of Updates
              </button>
              <button
                onClick={() => { setMenuOpen(false); onMenuClick(provider.id, 'share'); }}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#44516a] hover:bg-[#f8fafc] w-full text-left"
              >
                <Share2 size={14} />
                Share Provider
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center">
          {provider.logo ? (
            <Image src={provider.logo} alt={provider.name} width={48} height={48} className="object-contain" />
          ) : (
            <span className="text-xs font-bold text-[#44516a]">{provider.initials}</span>
          )}
        </div>
        <div>
          <p className="text-[#0f172a] font-medium text-base">{provider.name}</p>
          <p className="text-[#44516a] text-xs mt-0.5">{provider.type} • {provider.location}</p>
        </div>
        <p className="text-[#44516a] text-xs leading-relaxed line-clamp-2">{provider.description}</p>
      </div>

      <div>
        <p className="text-[#0f172a] font-semibold text-xl">{provider.opportunities}</p>
        <p className="text-[#8c97ad] text-xs">Active Opportunities</p>
      </div>

      <div className="flex items-center gap-3">
        <button className="bg-[#2f66c8] text-white text-sm font-medium rounded-[6px] flex-1 h-10 flex items-center justify-center hover:bg-[#2558b3] transition-colors">
          View Profile
        </button>
        <button className="border border-[#d9e1ef] rounded-[6px] p-2.5 text-[#8c97ad] hover:text-[#44516a] hover:border-[#8c97ad] transition-colors">
          <Bell size={16} />
        </button>
      </div>
    </div>
  );
}

function ShareModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-[#0f172a]/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] w-[440px] p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[#0f172a] font-semibold text-lg">Share Provider</h3>
            <p className="text-[#44516a] text-sm mt-0.5">Help someone discover this provider</p>
          </div>
          <button onClick={onClose} className="text-[#8c97ad] hover:text-[#44516a]">
            <X size={20} />
          </button>
        </div>
        <div className="border border-[#eef2f8] rounded-[10px] p-4 flex gap-3 items-start">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-[#44516a]">S</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <VerifiedBadge />
              <span className="text-[#2f66c8] text-xs">#PVD-2026-00231</span>
            </div>
            <p className="text-[#0f172a] font-medium text-sm">Shopify</p>
            <p className="text-[#44516a] text-xs">Technology • Ottawa, ON</p>
            <p className="text-[#44516a] text-xs mt-1">Empowering entrepreneurs worldwide with the tools they need to build their businesses.</p>
          </div>
        </div>
        <div>
          <p className="text-[#0f172a] font-medium text-sm mb-3">What went wrong?</p>
          <div className="flex gap-4 justify-around">
            {['LinkedIn', 'Email', 'WhatsApp', 'Instagram', 'More'].map((platform) => (
              <button key={platform} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-full bg-[#f8fafc] border border-[#eef2f8] flex items-center justify-center">
                  <Share2 size={20} className="text-[#44516a]" />
                </div>
                <span className="text-xs text-[#44516a]">{platform}</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[#0f172a] font-medium text-sm mb-2">Link</p>
          <div className="flex items-center gap-2 border border-[#d9e1ef] rounded-[6px] px-3 py-2">
            <span className="text-[#8c97ad] text-sm flex-1">https://anchorcanada.ca/providers/shopify</span>
            <button className="flex items-center gap-1 text-[#2f66c8] text-sm font-medium">
              <Copy size={14} />
              Copy
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center text-[#8c97ad] text-xs">
          <Link size={12} />
          <span>Shared links open the providers details page directly.</span>
        </div>
      </div>
    </div>
  );
}

function ReportModal({ onClose }: { onClose: () => void }) {
  const topics = ['Application Tracking', 'Account Configuration', 'Provider Listings', 'Opportunity Timeline', 'Saved Opportunities', 'Password Setup', 'Account Creation', 'Notification & Alerts', 'Other'];
  const [selected, setSelected] = useState<string[]>(['Application Tracking']);
  const [message, setMessage] = useState('');

  return (
    <div className="fixed inset-0 bg-[#0f172a]/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] w-[440px] p-6 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[#0f172a] font-semibold text-lg">Report a Problem</h3>
            <p className="text-[#44516a] text-sm mt-0.5">Having trouble with your workspace?<br />Let us know that happened so we can help resolve the issue quickly.</p>
          </div>
          <button onClick={onClose} className="text-[#8c97ad] hover:text-[#44516a] mt-1">
            <X size={20} />
          </button>
        </div>
        <div className="border border-[#eef2f8] rounded-[10px] p-4 flex gap-3 items-start">
          <div className="w-10 h-10 rounded-lg bg-[#f8fafc] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-[#44516a]">S</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <VerifiedBadge />
              <span className="text-[#2f66c8] text-xs">#PVD-2026-00231</span>
            </div>
            <p className="text-[#0f172a] font-medium text-sm">Shopify</p>
            <p className="text-[#44516a] text-xs">Technology • Ottawa, ON</p>
            <p className="text-[#44516a] text-xs mt-1">Empowering entrepreneurs worldwide with the tools they need to build their businesses.</p>
          </div>
        </div>
        <div>
          <p className="text-[#0f172a] font-medium text-sm mb-3">What went wrong?</p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelected(prev =>
                  prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
                )}
                className={cn(
                  'flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
                  selected.includes(topic)
                    ? 'bg-[#2f66c8] text-white border-[#2f66c8]'
                    : 'bg-white text-[#44516a] border-[#d9e1ef]'
                )}
              >
                {topic}
                {selected.includes(topic) ? <X size={10} /> : <span className="text-[#8c97ad]">+</span>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[#0f172a] text-sm mb-2">Describe your issue with this section. We will review it shortly.</p>
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={80}
              placeholder="Enter your message here..."
              className="w-full border border-[#d9e1ef] rounded-[6px] p-3 text-sm text-[#0f172a] placeholder-[#8c97ad] resize-none h-24 focus:outline-none focus:border-[#2f66c8]"
            />
            <span className="absolute bottom-2 right-3 text-[#8c97ad] text-xs">{message.length} / 80</span>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm text-[#44516a] font-medium hover:bg-[#f8fafc] rounded-[6px]">
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#ef4444] text-white text-sm font-medium rounded-[6px] hover:bg-[#dc2626]">
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationToast({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed top-20 right-6 bg-white border border-[#eef2f8] rounded-[12px] shadow-[0px_6px_16px_rgba(0,0,0,0.08)] p-4 flex items-start gap-3 z-50 max-w-sm">
      <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center shrink-0">
        <Bell size={18} className="text-[#2f66c8]" />
      </div>
      <div className="flex-1">
        <p className="text-[#0f172a] font-semibold text-sm">Notification Alert Set!</p>
        <p className="text-[#44516a] text-xs mt-0.5">This means that you&apos;ll be notified of all updates from this provider.</p>
      </div>
      <button onClick={onClose} className="text-[#8c97ad] hover:text-[#44516a] shrink-0">
        <X size={16} />
      </button>
    </div>
  );
}

export default function DesktopView() {
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<ModalType>(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleMenuClick = (id: string, action: 'share' | 'report' | 'notification') => {
    if (action === 'notification') {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    } else {
      setModal(action);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-['Instrument_Serif'] text-[36px] leading-[56px] text-[#0f172a]">Providers</h1>
        <p className="text-[#44516a] text-base">Explore trusted organizations creating opportunities across Canada.</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-2 border border-[#d9e1ef] rounded-[8px] px-4 py-2.5 bg-white">
          <Search size={16} className="text-[#8c97ad]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, grants, support..."
            className="flex-1 text-sm text-[#0f172a] placeholder-[#8c97ad] outline-none bg-transparent"
          />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#44516a] text-sm">Sort by</span>
          <button className="bg-white border border-[#d9e1ef] rounded-[6px] flex items-center gap-2 px-4 py-2.5 text-sm text-[#0f172a]">
            Most Relevant
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {[
          { label: 'Industry', value: 'All' },
          { label: 'Province/Territory', value: 'All' },
          { label: 'Organization Type', value: 'All' },
        ].map((filter) => (
          <button key={filter.label} className="flex items-center gap-1.5 border border-[#d9e1ef] rounded-[6px] px-3 py-2 text-sm text-[#44516a] bg-white hover:bg-[#f8fafc]">
            {filter.label}
            <span className="text-[#0f172a] font-medium">{filter.value}</span>
            <ChevronDown size={14} />
          </button>
        ))}
        <button className="flex items-center gap-1.5 border border-[#2f66c8] bg-[#eff4ff] rounded-[6px] px-3 py-2 text-sm text-[#2f66c8] font-medium">
          Verified only
          <CheckCircle2 size={14} className="fill-[#2f66c8] text-white" />
        </button>
        <button className="flex items-center gap-1.5 border border-[#d9e1ef] rounded-[6px] px-3 py-2 text-sm text-[#44516a] bg-white hover:bg-[#f8fafc]">
          <Bell size={14} />
          Hiring now
        </button>
        <button className="flex items-center gap-1.5 border border-[#d9e1ef] rounded-[6px] px-3 py-2 text-sm text-[#44516a] bg-white hover:bg-[#f8fafc]">
          More filters
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[#44516a] text-sm">Showing 120 applications</p>
        <button className="text-[#2f66c8] text-sm font-medium hover:underline">Clear all</button>
      </div>

      <div className="grid grid-cols-4 gap-5">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} onMenuClick={handleMenuClick} />
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-[#44516a] text-sm">Showing 1 to 12 of 120 organisations</p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, '...', 10].map((page, i) => (
            <button
              key={i}
              className={cn(
                'w-9 h-9 rounded-[6px] text-sm font-medium transition-colors',
                page === 1 ? 'bg-[#2f66c8] text-white' : 'bg-white border border-[#d9e1ef] text-[#44516a] hover:bg-[#f8fafc]'
              )}
            >
              {page}
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 py-2 border border-[#d9e1ef] rounded-[6px] text-sm text-[#44516a] hover:bg-[#f8fafc]">
            Next
            <ChevronDown size={14} className="rotate-[-90deg]" />
          </button>
        </div>
      </div>

      {modal === 'share' && <ShareModal onClose={() => setModal(null)} />}
      {modal === 'report' && <ReportModal onClose={() => setModal(null)} />}
      {showNotification && <NotificationToast onClose={() => setShowNotification(false)} />}
    </div>
  );
}
