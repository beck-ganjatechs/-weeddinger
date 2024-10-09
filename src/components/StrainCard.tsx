import React from 'react';
import { Strain } from '../types';
import { Edit, Share2 } from 'lucide-react';

interface StrainCardProps {
  strain: Strain;
  isAdmin: boolean;
  onEdit: (id: string) => void;
  onShare: (id: string) => void;
}

const StrainCard: React.FC<StrainCardProps> = ({ strain, isAdmin, onEdit, onShare }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{strain.name}</h2>
        <div className="flex space-x-2">
          {isAdmin && (
            <button onClick={() => onEdit(strain.id)} className="p-1 bg-blue-500 text-white rounded">
              <Edit size={16} />
            </button>
          )}
          <button onClick={() => onShare(strain.id)} className="p-1 bg-green-500 text-white rounded">
            <Share2 size={16} />
          </button>
        </div>
      </div>
      <div className="mb-2">
        <img src={strain.images[0]} alt={strain.name} className="w-full h-48 object-cover rounded" />
      </div>
      <div className="text-sm">
        <p>Batch Date: {strain.batchDate}</p>
        <p>Best By: {strain.bestByDate}</p>
        <p>Remaining: {strain.remainingGrams}g / {strain.totalGrams}g</p>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold">Lab Results:</h3>
        <p>THC: {strain.labResults.thc}%</p>
        <p>CBD: {strain.labResults.cbd}%</p>
      </div>
    </div>
  );
};

export default StrainCard;