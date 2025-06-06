'use client';

interface ActivityData {
  day: string;
  value: number;
}

interface ActivityChartProps {
  data: ActivityData[];
  maxValue?: number;
}

export function ActivityChart({ data, maxValue }: ActivityChartProps) {
  const chartMaxValue = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Activity</h3>
      <div className="flex items-end space-x-2 h-32">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-blue-600 rounded-t"
              style={{ 
                height: `${(item.value / chartMaxValue) * 100}%`,
                minHeight: '4px'
              }}
            />
            <span className="text-xs text-gray-500 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
