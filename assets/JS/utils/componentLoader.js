export async function loadComponent(containerId, filePath) {
  try {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.warn(`⚠️ Target element layout ID not found: "${containerId}"`);
      return null;
    }

    const response = await fetch(filePath);
    if (!response.ok) {
      // Create a visual fallback so you can see exactly which file failed on screen
      container.innerHTML = `<div style="color: red; padding: 20px; border: 1px dashed red;">❌ Failed to load component: ${filePath}</div>`;
      throw new Error(`Failed to fetch: ${filePath} (Status: ${response.status})`);
    }

    const htmlContent = await response.text();
    container.innerHTML = htmlContent;
    return container;
    
  } catch (error) {
    console.error(`❌ Component Loader Error:`, error);
  }
}