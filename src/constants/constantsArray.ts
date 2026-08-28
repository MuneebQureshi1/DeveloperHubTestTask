/**
 Welcome to the constants array file.
 This file contains all the constants for the project.
 It is used to store all the constants for the project.
 */

import type { Creator } from '../types/creator';

 export const MOCK_CREATORS = [
   {
     id: '1',
     name: 'Amara K.',
     category: 'Spoken Word',
     avatar: 'https://i.pravatar.cc/150?img=47',
     score: 120,
   },
   {
     id: '2',
     name: 'Marcus T.',
     category: 'Beatbox',
     avatar: 'https://i.pravatar.cc/150?img=12',
     score: 98,
   },
 ] as const satisfies readonly [Creator, Creator];
 