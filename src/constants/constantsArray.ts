/**
 Welcome to the constants array file.
 This file contains all the constants for the project.
 It is used to store all the constants for the project.
 */

import type { Performance } from '../types/performance';

const now = Date.now();

export const MOCK_PERFORMANCES: Performance[] = [
  {
    id: '1',
    creatorName: 'Amara K.',
    talentCategory: 'Spoken Word',
    media:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    applauseCount: 1245,
  },
  {
    id: '2',
    creatorName: 'Jules R.',
    talentCategory: 'Contemporary Dance',
    media:
      'https://videos.pexels.com/video-files/2022395/2022395-hd_1280_720_30fps.mp4',
    applauseCount: 890,
  },
  {
    id: '3',
    creatorName: 'Kenji M.',
    talentCategory: 'Classical Violin',
    media: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    applauseCount: 2104,
  },
  {
    id: '4',
    creatorName: 'Sofia P.',
    talentCategory: 'Jazz Vocals',
    media: 'https://assets.mixkit.co/videos/44523/44523-720.mp4',
    applauseCount: 1560,
    battleStartsAt: new Date(now + 84 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    creatorName: 'Malik T.',
    talentCategory: 'Street Magic',
    media:
      'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4',
    applauseCount: 432,
  },
  {
    id: '6',
    creatorName: 'Elena V.',
    talentCategory: 'Piano',
    media: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    applauseCount: 3078,
    battleStartsAt: new Date(now - 10 * 60 * 1000).toISOString(),
  },
  {
    id: '7',
    creatorName: 'Omar H.',
    talentCategory: 'Stand-up',
    media:
      'https://videos.pexels.com/video-files/1093662/1093662-hd_1280_720_30fps.mp4',
    applauseCount: 674,
  },
  {
    id: '8',
    creatorName: 'Priya S.',
    talentCategory: 'Bollywood Dance',
    media: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    applauseCount: 1987,
  },
  {
    id: '9',
    creatorName: 'Luca B.',
    talentCategory: 'Acoustic Guitar',
    media:
      'https://videos.pexels.com/video-files/3571264/3571264-hd_1280_720_30fps.mp4',
    applauseCount: 1120,
    battleStartsAt: new Date(now + (2 * 60 + 15) * 60 * 1000).toISOString(),
  },
  {
    id: '10',
    creatorName: 'Nina W.',
    talentCategory: 'Theatre',
    media:
      'https://videos.pexels.com/video-files/2098989/2098989-hd_1280_720_30fps.mp4',
    applauseCount: 256,
  },
];
