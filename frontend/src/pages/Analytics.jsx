import React from 'react';
import { useFiles } from '@/contexts/FileContext';

const Analytics = () => {
  const { stats } = useFiles();

  if (!stats || !stats.categoryCounts) {
    return <p className="p-6 text-center">Loading analytics...</p>;
  }

  // Extract category entries safely
  const categories = Object.entries(stats.categoryCounts);

  // Storage usage calculation
  const usedMB = stats.totalSize / (1024 * 1024);
  const limitMB = 100;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold mb-6">Analytics & Insights</h1>

      {/* Storage Usage Bar */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Storage Usage</h2>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
          <div
            className="bg-blue-600 h-6"
            style={{ width: `${(usedMB / limitMB) * 100}%` }}
          />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {usedMB.toFixed(2)} MB used of {limitMB} MB available
        </p>
      </div>

      {/* Category Distribution */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Document Categories</h2>
        {categories.length ? (
          <ul className="space-y-3">
            {categories.map(([category, count]) => {
              const barWidth = Math.min((count / stats.totalFiles) * 100, 100);
              return (
                <li key={category} className="flex items-center space-x-4">
                  <span className="w-32 font-medium">{category}</span>
                  <div className="flex-1 bg-gray-200 rounded h-4 overflow-hidden">
                    <div
                      className="bg-purple-600 h-4"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-semibold">{count}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-muted-foreground">No documents available.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
