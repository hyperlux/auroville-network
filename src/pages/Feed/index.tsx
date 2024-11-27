import React, { FC } from 'react';
import { CulturalHighlights } from './components/CulturalHighlights';
import { CommunityStories } from './components/CommunityStories';
import { MarketUpdates } from './components/MarketUpdates';
import { PersonalizedContent } from './components/PersonalizedContent';

export const Feed: FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CulturalHighlights />
        <CommunityStories />
        <MarketUpdates />
        <PersonalizedContent />
      </div>
    </div>
  );
}; 