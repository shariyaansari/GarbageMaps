// The Math Formula: CI = (v*0.2) + (o*0.4) + (s*0.3) + (f*0.1)
export const calculateScore = (props) => {
  const { litter, overflow, smell, complaints } = props;
  const score = litter * 0.2 + overflow * 0.4 + smell * 0.3 + complaints * 0.1;
  return score; // Returns 0 to 10
};

// Function to return color based on score
export const getAreaColor = (score) => {
  if (score > 7) return "#bd0026"; // Dark Red (Dirty)
  if (score > 5) return "#f03b20"; // Red
  if (score > 3) return "#feb24c"; // Orange/Yellow
  return "#238443"; // Green (Clean)
};
