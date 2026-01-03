// src/utils/exportData.js

export const exportToCSV = (sectors) => {
  // Headers for the Excel/CSV file
  const headers = ["Neighborhood", "Litter Score", "Overflow Score", "Odor Score", "Complaints", "Total Dirty Score"];
  
  // Convert the JSON data into rows
  const rows = sectors.features.map(f => {
    const p = f.properties;
    // Recalculating score for the report
    const score = (p.litter * 0.2) + (p.overflow * 0.4) + (p.smell * 0.3) + (p.complaints * 0.1);
    
    return [
      p.name,
      p.litter,
      p.overflow,
      p.smell,
      p.complaints,
      score.toFixed(2)
    ];
  });

  // Create the CSV string
  const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

  // Create a virtual file and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "Mumbra_Cleanliness_Report.csv");
  link.click();
};