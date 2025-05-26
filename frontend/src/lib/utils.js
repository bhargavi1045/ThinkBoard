export function formatDate(date) {
  const dt = new Date(date); 
  if (isNaN(dt.getTime())) {
    return "Invalid Date";
  }
  return dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
