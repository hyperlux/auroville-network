import React, { FC } from 'react';
import { MapPin } from 'lucide-react';

export const TransportGuide: FC = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Transport Guide</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          <span>Transport information here</span>
        </div>
      </div>
    </div>
  );
}; 