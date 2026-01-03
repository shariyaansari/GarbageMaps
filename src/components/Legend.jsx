// import React from 'react';

// const Legend = () => {
//   const grades = [
//     { label: 'Dirty (High Risk)', color: '#bd0026' },
//     { label: 'Warning', color: '#f03b20' },
//     { label: 'Moderate', color: '#feb24c' },
//     { label: 'Clean', color: '#238443' }
//   ];

//   return (
//     <div className="absolute bottom-10 right-10 bg-white p-4 shadow-2xl rounded-lg border border-gray-300 z-1000 min-w-150px">
//       <h4 className="font-bold text-sm mb-2 border-b pb-1">Cleanliness Status</h4>
//       {grades.map((item, index) => (
//         <div key={index} className="flex items-center gap-3 mb-1">
//           <i 
//             className="w-4 h-4 rounded-sm" 
//             style={{ backgroundColor: item.color, display: 'inline-block' }}
//           ></i>
//           <span className="text-xs font-medium text-gray-700">{item.label}</span>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Legend;

import React from 'react';

const Legend = () => {
  const grades = [
    { l: 'Dirty', c: '#bd0026' },
    { l: 'Warning', c: '#f03b20' },
    { l: 'Moderate', c: '#feb24c' },
    { l: 'Clean', c: '#238443' }
  ];

  return (
    <div style={{
      position: 'absolute', bottom: '20px', right: '20px',
      zIndex: 1000, backgroundColor: 'white', padding: '10px',
      borderRadius: '5px', boxShadow: '0 0 15px rgba(0,0,0,0.2)',
      fontSize: '12px'
    }}>
      <strong>Cleanliness</strong>
      {grades.map((g, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
          <i style={{ background: g.c, width: '12px', height: '12px', marginRight: '8px', display: 'block' }}></i>
          {g.l}
        </div>
      ))}
    </div>
  );
};

export default Legend;