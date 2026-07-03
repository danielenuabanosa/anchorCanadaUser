import avatar1 from '@assets/images/profile-avatar.png';
import avatar2 from '@assets/images/profile-google.png';
import avatar3 from '@assets/images/profile-georgebrown.png';

export interface MessageThread {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread: boolean;
  avatar: typeof avatar1;
  role: string;
}

export const MESSAGE_THREADS: MessageThread[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    preview: 'Thank you for reviewing my application for the Youth Innovation Grant.',
    time: '2 mins ago',
    unread: true,
    avatar: avatar1,
    role: 'Applicant',
  },
  {
    id: '2',
    name: 'Michael Adams',
    preview: 'I have completed the review batch assigned yesterday.',
    time: '1 hour ago',
    unread: true,
    avatar: avatar2,
    role: 'Reviewer',
  },
  {
    id: '3',
    name: 'Jessica Lee',
    preview: 'Can we schedule a team sync for the upcoming deadline?',
    time: '3 hours ago',
    unread: false,
    avatar: avatar3,
    role: 'Team Member',
  },
  {
    id: '4',
    name: 'David Chen',
    preview: 'The external opportunity redirect is working as expected.',
    time: 'Yesterday',
    unread: false,
    avatar: avatar2,
    role: 'Team Member',
  },
];

export const SAMPLE_CONVERSATION = {
  name: 'Sarah Johnson',
  role: 'Applicant · Youth Innovation Grant',
  avatar: avatar1,
  messages: [
    { id: '1', from: 'them', text: 'Hello, I wanted to follow up on my application status.', time: 'Jun 12, 2:15 PM' },
    { id: '2', from: 'us', text: 'Hi Sarah, your application is currently under review. We will update you soon.', time: 'Jun 12, 2:30 PM' },
    { id: '3', from: 'them', text: 'Thank you for reviewing my application for the Youth Innovation Grant.', time: 'Jun 12, 3:05 PM' },
  ],
};
