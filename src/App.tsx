import React, { useState } from 'react';
import { Plus, Camera } from 'lucide-react';
import StrainCard from './components/StrainCard';
import StrainForm from './components/StrainForm';
import { Strain, AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    strains: [],
    isAdmin: true, // For demo purposes, set to true. In a real app, this would be determined by authentication.
  });

  const [showForm, setShowForm] = useState(false);
  const [editingStrain, setEditingStrain] = useState<Strain | null>(null);

  const handleAddStrain = (newStrain: Strain) => {
    setState((prev) => ({
      ...prev,
      strains: [...prev.strains, newStrain],
    }));
    setShowForm(false);
  };

  const handleUpdateStrain = (updatedStrain: Strain) => {
    setState((prev) => ({
      ...prev,
      strains: prev.strains.map((strain) =>
        strain.id === updatedStrain.id ? updatedStrain : strain
      ),
    }));
    setEditingStrain(null);
  };

  const handleEdit = (id: string) => {
    const strainToEdit = state.strains.find((strain) => strain.id === id);
    if (strainToEdit) {
      setEditingStrain(strainToEdit);
      setShowForm(true);
    }
  };

  const handleShare = (id: string) => {
    const strain = state.strains.find((s) => s.id === id);
    if (strain) {
      const shareText = `Check out ${strain.name} from our menu!`;
      const shareUrl = `${window.location.origin}?strain=${id}`;
      if (navigator.share) {
        navigator.share({
          title: strain.name,
          text: shareText,
          url: shareUrl,
        }).catch((error) => console.log('Error sharing', error));
      } else {
        // Fallback for browsers that don't support the Web Share API
        prompt('Copy this link to share:', `${shareText} ${shareUrl}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Cannabis Strain Menu</h1>
      {state.isAdmin && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-green-500 text-white p-2 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" /> Add New Strain
        </button>
      )}
      {showForm && (
        <StrainForm
          strain={editingStrain || undefined}
          onSubmit={editingStrain ? handleUpdateStrain : handleAddStrain}
          onCancel={() => {
            setShowForm(false);
            setEditingStrain(null);
          }}
        />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.strains.map((strain) => (
          <StrainCard
            key={strain.id}
            strain={strain}
            isAdmin={state.isAdmin}
            onEdit={handleEdit}
            onShare={handleShare}
          />
        ))}
      </div>
    </div>
  );
};

export default App;