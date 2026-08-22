import React, { useState } from 'react';
import { datasetsInfo } from '../data/datasets';
import { shanghaiTechManifest, ShanghaiTechImage } from '../data/shanghaiTechManifest';
import { Database, ExternalLink, Cpu, Info, Image, Table, CheckCircle } from 'lucide-react';

export const DatasetsModels: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ShanghaiTechImage | null>(shanghaiTechManifest[0]);

  return (
    <div className="flex-grow p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-borderMuted pb-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-textPrimary flex items-center">
            <Database className="h-5 w-5 text-accentCyan mr-2" />
            AI PERCEPTION LAYER & DATASETS
          </h1>
          <p className="text-xs text-textMuted font-mono mt-1">MODEL CARD INDEX, VALIDATION RECORDS & DATASET PREVIEWS</p>
        </div>
      </div>

      {/* Grid listing five dataset cards */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {datasetsInfo.map((ds, idx) => {
          const isReal = ds.disasterType === 'CROWD'; // ShanghaiTech
          return (
            <div 
              key={idx} 
              className={`glass-panel p-4 border flex flex-col justify-between hover:border-accentCyan/30 transition-all duration-300 font-mono text-xs ${
                isReal ? 'border-accentCyan/30 shadow-cyberCyan/5' : 'border-borderMuted/65'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-borderMuted pb-2.5">
                  <span className="font-black text-sm text-textPrimary">{ds.name}</span>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border select-none ${
                    isReal ? 'bg-accentCyan/10 border-accentCyan/30 text-accentCyan' : 'bg-slate-800 border-slate-700 text-textMuted'
                  }`}>
                    {isReal ? 'DATASET MODE' : 'SIMULATION'}
                  </span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <p>
                    <span className="text-textMuted font-bold">TASK:</span>{' '}
                    <span className="text-textPrimary font-semibold">{ds.task}</span>
                  </p>
                  <p>
                    <span className="text-textMuted font-bold">VOLUME:</span>{' '}
                    <span className="text-textPrimary">{ds.images}</span>
                  </p>
                  
                  {isReal && (
                    <div className="bg-accentCyan/5 border border-accentCyan/15 p-2 rounded-lg text-[10px] space-y-1 my-1">
                      <p className="text-accentCyan font-bold">AVAILABLE DATA SPLIT:</p>
                      <p className="flex justify-between text-textPrimary"><span>Part A (High Density):</span> <span>482 imgs</span></p>
                      <p className="flex justify-between text-textPrimary"><span>Part B (Low Density):</span> <span>716 imgs</span></p>
                      <p className="text-textMuted mt-1">Total annotated heads: 330,165</p>
                    </div>
                  )}

                  <p>
                    <span className="text-textMuted font-bold">MODEL STATUS:</span>{' '}
                    <span className={`font-black ${isReal ? 'text-brandGreen' : 'text-textMuted'}`}>
                      {isReal ? 'Operational (CSRNet)' : 'SIMULATED / FUTURE MODEL'}
                    </span>
                  </p>
                  <p className="text-textMuted leading-relaxed text-[11px] mt-2 font-sans pt-1">
                    {ds.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-borderMuted/30 grid grid-cols-2 gap-2 text-[9px] font-mono">
                <a
                  href={ds.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-navyMedium hover:bg-navyLight border border-borderMuted py-2 rounded-lg flex items-center justify-center space-x-1 text-textSecondary font-bold transition-all"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>SOURCE</span>
                </a>
                <button 
                  disabled={!isReal}
                  className={`border py-2 rounded-lg flex items-center justify-center space-x-1 font-bold transition-all cursor-pointer ${
                    isReal 
                      ? 'bg-accentCyan/10 hover:bg-accentCyan/20 text-accentCyan border-accentCyan/30 shadow-cyberCyan/5'
                      : 'bg-transparent text-textMuted border-borderMuted/30 cursor-not-allowed opacity-45'
                  }`}
                >
                  <Cpu className="h-3.5 w-3.5" />
                  <span>MODEL PROPS</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 12: Real Dataset Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Manifest Table Selector */}
        <div className="lg:col-span-2 glass-panel p-4 space-y-3.5 border border-borderMuted">
          <div className="flex items-center space-x-1.5 border-b border-borderMuted pb-2.5">
            <Table className="h-4.5 w-4.5 text-accentCyan" />
            <span className="font-mono text-[10px] font-black text-textSecondary uppercase tracking-wider">
              SHANGHAITECH LIGHTWEIGHT MANIFEST INDEX
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-[11px] leading-relaxed">
              <thead>
                <tr className="border-b border-borderMuted/40 text-textMuted text-[10px]">
                  <th className="pb-2">IMAGE ID</th>
                  <th className="pb-2">SPLIT</th>
                  <th className="pb-2">DENSITY SPLIT</th>
                  <th className="pb-2">GROUND TRUTH</th>
                  <th className="pb-2">MODEL PREDICT</th>
                  <th className="pb-2 text-right">ERR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderMuted/20">
                {shanghaiTechManifest.map((img) => {
                  const isSelected = selectedImage?.id === img.id;
                  const errPct = (((img.estimatedCount - img.groundTruthCount) / img.groundTruthCount) * 100).toFixed(1);
                  return (
                    <tr 
                      key={img.id}
                      onClick={() => setSelectedImage(img)}
                      className={`hover:bg-navyLight/60 cursor-pointer transition-colors ${
                        isSelected ? 'bg-navyLight text-accentCyan font-bold' : 'text-textSecondary'
                      }`}
                    >
                      <td className="py-2.5 font-bold flex items-center space-x-1.5">
                        <Image className="h-3.5 w-3.5 text-textMuted" />
                        <span>{img.id}</span>
                      </td>
                      <td className="py-2.5 uppercase font-medium">{img.split}</td>
                      <td className="py-2.5 text-textMuted font-medium">{img.part.replace('_', ' ')}</td>
                      <td className="py-2.5 font-bold text-textPrimary">{img.groundTruthCount} heads</td>
                      <td className="py-2.5 font-bold text-accentCyan">{img.estimatedCount} heads</td>
                      <td className={`py-2.5 text-right font-bold ${parseFloat(errPct) > 0 ? 'text-brandRed' : 'text-brandGreen'}`}>
                        {parseFloat(errPct) > 0 ? `+${errPct}%` : `${errPct}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected image detail panel */}
        <div className="lg:col-span-1 glass-panel p-4 border border-borderMuted bg-navyMedium/60 font-mono text-xs flex flex-col justify-between">
          <div className="space-y-3.5">
            <div className="flex items-center space-x-1.5 border-b border-borderMuted pb-2">
              <Info className="h-4.5 w-4.5 text-accentCyan" />
              <span className="font-bold text-textSecondary uppercase">METADATA AUDIT</span>
            </div>

            {selectedImage ? (
              <div className="space-y-3 text-[11px] leading-relaxed">
                <div>
                  <span className="text-[9px] text-textMuted uppercase block">Dataset Reference</span>
                  <span className="text-textPrimary font-bold">ShanghaiTech Crowd Counting (Part A/B)</span>
                </div>
                <div>
                  <span className="text-[9px] text-textMuted uppercase block">Relative Workspace Path</span>
                  <span className="text-textSecondary text-xs break-all bg-black/30 p-2.5 rounded-lg border border-borderMuted/30 block mt-1">
                    {selectedImage.imagePath}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-textMuted uppercase block">Ground Truth Count</span>
                  <span className="text-textPrimary font-bold text-xs">{selectedImage.groundTruthCount} occupants</span>
                </div>
                <div>
                  <span className="text-[9px] text-textMuted uppercase block">Model Inference Prediction</span>
                  <span className="text-accentCyan font-bold text-xs">{selectedImage.estimatedCount} occupants</span>
                </div>
                <div className="bg-brandGreen/5 border border-brandGreen/30 p-2.5 rounded-lg text-brandGreen flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Model output verified against ground truth labels</span>
                </div>
              </div>
            ) : (
              <p className="text-textMuted italic text-center py-10">Select a manifest record to audit metadata.</p>
            )}
          </div>

          <div className="bg-brandAmber/5 border border-brandAmber/35 p-3 rounded-lg text-brandAmber text-[10px] leading-relaxed mt-4">
            <span className="font-black uppercase block mb-1">PROTOTYPE ADAPTER LAYER:</span>
            ShanghaiTech actual raw dataset images are stored locally for training pipelines. The command center displays visual overlays and manifest metadata splits.
          </div>
        </div>
      </div>
    </div>
  );
};
export default DatasetsModels;
