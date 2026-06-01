import React from 'react';

interface RevenueData {
  month: string;
  amount: number;
}

interface DoughnutData {
  category: string;
  value: number;
  color: string;
}

export function RevenueLineChart({ data }: { data: RevenueData[] }) {
  const maxVal = Math.max(...data.map((d) => d.amount)) * 1.1;
  const width = 500;
  const height = 240;
  const padding = 40;

  // Compute points
  const points = data.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (d.amount / maxVal) * (height - 2 * padding);
    return { x, y, label: d.month, amount: d.amount };
  });

  const pathD = points.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`),
    ''
  );

  const fillD = `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
        {/* Gradients */}
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#007f5f" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#007f5f" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + ratio * (height - 2 * padding);
          const gridVal = Math.round(maxVal * (1 - ratio));
          return (
            <g key={index}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#e1e3df"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding - 5}
                y={y + 4}
                className="text-[10px] fill-gray-500 font-sans"
                textAnchor="end"
              >
                ₹{gridVal >= 1000 ? `${(gridVal / 1000).toFixed(0)}k` : gridVal}
              </text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <path d={fillD} fill="url(#chartGradient)" />

        {/* Main Line */}
        <path d={pathD} fill="none" stroke="#007f5f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i} className="group cursor-pointer">
            <circle
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#ffffff"
              stroke="#007f5f"
              strokeWidth="2"
              className="transition-all duration-200 group-hover:r-6"
            />
            {/* Tooltip on hover */}
            <title>{`${p.label}: ₹${p.amount.toLocaleString()}`}</title>
          </g>
        ))}

        {/* X labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={height - padding + 15}
            className="text-[10px] fill-gray-500 font-sans"
            textAnchor="middle"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function ServiceDistributionChart({ data }: { data: DoughnutData[] }) {
  const total = data.reduce((acc, d) => acc + d.value, 0);
  const size = 200;
  const radius = 70;
  const strokeWidth = 24;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedAngle = 0;

  return (
    <div className="flex flex-col items-center justify-center p-md">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full transform -rotate-90">
          {data.map((item, index) => {
            const percentage = item.value / total;
            const strokeDashoffset = circumference - percentage * circumference;
            const strokeDasharray = `${circumference} ${circumference}`;
            const rotation = (accumulatedAngle / total) * 360;
            accumulatedAngle += item.value;

            return (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                transform={`rotate(${rotation} ${center} ${center})`}
                className="transition-all duration-300 hover:opacity-90 cursor-pointer"
              >
                <title>{`${item.category}: ${item.value}%`}</title>
              </circle>
            );
          })}
        </svg>

        {/* Centered Absolute Stats overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <span className="font-sans text-[22px] font-bold text-gray-800">100%</span>
          <span className="text-[10px] uppercase font-sans text-gray-400 font-medium tracking-wider">Organic</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-md flex flex-wrap gap-md justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-gray-600 font-sans">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span>
              {item.category} ({item.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
