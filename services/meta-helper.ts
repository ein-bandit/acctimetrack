export const cleanName = (name: string): string => {
  return name.trim().replace(/[^a-zA-Z0-9_-]/g, "_").replace(/_+/g, "_");
};
