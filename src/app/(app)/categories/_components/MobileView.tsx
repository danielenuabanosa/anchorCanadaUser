'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, ChevronDown, Bell, EllipsisVertical, CheckCircle2, X, Filter } from 'lucide-react';
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
    id: 'wwf', name: 'World Wildlife Fund Canada', type: 'Non-profit', location: 'Toronto, ON', verified: true,
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

function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1 text-[#15803d]">
      <CheckCircle2 size={12} className="fill-[#15803d] text-white" />
      <span className="text-xs font-medium text-[#15803d]">Verified</span>
    </div>
  );
}

function ProviderCard({ provider }: { provider: typeof providers[0] }) {
  return (
    <div className="bg-white border border-[#eef2f8] rounded-[10px] p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <VerifiedBadge />
        <button className="text-[#8c97ad]">
          <EllipsisVertical size={16} />
        </button>
      </div>

      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f8fafc] flex items-center justify-center shrink-0">
          {provider.logo ? (
            <Image src={provider.logo} alt={provider.name} width={40} height={40} className="object-contain" />
          ) : (
            <span className="text-xs font-bold text-[#44516a]">{(provider as { initials?: string }).initials}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#0f172a] font-medium text-sm">{provider.name}</p>
          <p className="text-[#44516a] text-xs">{provider.type} • {provider.location}</p>
        </div>
      </div>

      <p className="text-[#44516a] text-xs leading-relaxed line-clamp-2">{provider.description}</p>

      <div>
        <p className="text-[#0f172a] font-semibold text-base">{provider.opportunities}</p>
        <p className="text-[#8c97ad] text-xs">Active Opportunities</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="bg-[#2f66c8] text-white text-xs font-medium rounded-[6px] flex-1 h-9 flex items-center justify-center">
          View Profile
        </button>
        <button className="border border-[#d9e1ef] rounded-[6px] p-2 text-[#8c97ad]">
          <Bell size={14} />
        </button>
      </div>
    </div>
  );
}

export default function MobileView() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div>
        <h1 className="font-['Instrument_Serif'] text-[28px] leading-[1.2] text-[#0f172a]">Providers</h1>
        <p className="text-[#44516a] text-sm mt-1">Explore trusted organizations creating opportunities across Canada.</p>
      </div>

      <div className="flex items-center gap-2 border border-[#d9e1ef] rounded-[8px] px-3 py-2.5 bg-white">
        <Search size={14} className="text-[#8c97ad]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search jobs, grants, support..."
          className="flex-1 text-sm text-[#0f172a] placeholder-[#8c97ad] outline-none bg-transparent"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button className="flex items-center gap-1 border border-[#d9e1ef] rounded-[6px] px-3 py-1.5 text-xs text-[#44516a] bg-white whitespace-nowrap">
          Industry <span className="font-medium text-[#0f172a]">All</span>
          <ChevronDown size={12} />
        </button>
        <button className="flex items-center gap-1 border border-[#d9e1ef] rounded-[6px] px-3 py-1.5 text-xs text-[#44516a] bg-white whitespace-nowrap">
          Province/Territory <span className="font-medium text-[#0f172a]">All</span>
          <ChevronDown size={12} />
        </button>
        <button className="flex items-center gap-1 border border-[#d9e1ef] rounded-[6px] px-3 py-1.5 text-xs text-[#44516a] bg-white whitespace-nowrap">
          <Filter size={12} />
          More filters
        </button>
      </div>

      <p className="text-[#44516a] text-xs">Showing 90 applications</p>

      <div className="flex flex-col gap-4">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={cn(
              'w-8 h-8 rounded-[6px] text-sm font-medium',
              page === 1 ? 'bg-[#2f66c8] text-white' : 'bg-white border border-[#d9e1ef] text-[#44516a]'
            )}
          >
            {page}
          </button>
        ))}
        <button className="flex items-center gap-1 px-3 py-1.5 border border-[#d9e1ef] rounded-[6px] text-xs text-[#44516a]">
          Next
          <ChevronDown size={12} className="rotate-[-90deg]" />
        </button>
      </div>
    </div>
  );
}
