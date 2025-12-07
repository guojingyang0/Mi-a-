export const getWebGlRenderer = (): string => {
  try {
    const canvas = document.createElement('canvas');
    // Try webgl2 first, fall back to webgl
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'Unknown GPU';

    const debugInfo = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!debugInfo) return 'Unknown GPU';

    const renderer = (gl as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return renderer || 'Unknown GPU';
  } catch (e) {
    return 'Unknown GPU';
  }
};

export const detectSystemSpecs = async (): Promise<string> => {
  const parts: string[] = [];

  // 1. Screen Resolution (Handle Scale Factors)
  // window.screen.width/height is logical pixels (affected by OS scaling like 150%)
  // window.devicePixelRatio is the scale factor
  const width = window.screen.width;
  const height = window.screen.height;
  const dpr = window.devicePixelRatio || 1;
  const physicalWidth = Math.round(width * dpr);
  const physicalHeight = Math.round(height * dpr);

  parts.push(`Monitor: ${physicalWidth}x${physicalHeight} (Logical: ${width}x${height}, Scale: ${(dpr * 100).toFixed(0)}%)`);

  // 2. GPU Extraction (WebGPU -> WebGL Fallback)
  let gpuName = 'Unknown GPU';

  // Try WebGPU first (Modern, gives actual card name often)
  if ('gpu' in navigator) {
    try {
      // @ts-ignore
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter) {
        // @ts-ignore
        const info = await adapter.requestAdapterInfo();
        // @ts-ignore
        if (info.description) gpuName = info.description;
        // @ts-ignore
        else if (info.device) gpuName = info.device;
      }
    } catch (e) {
      // Fail silently to fallback
    }
  }

  // Fallback to WebGL if WebGPU failed or returned nothing useful
  if (gpuName === 'Unknown GPU' || !gpuName) {
      gpuName = getWebGlRenderer();
  }
  
  // CLEANING LOGIC
  
  // Handle ANGLE string: "ANGLE (NVIDIA Corporation, NVIDIA GeForce RTX 3070 Direct3D11 vs_5_0 ps_5_0, D3D11)"
  const angleMatch = gpuName.match(/ANGLE \((.+)\)/);
  if (angleMatch) {
      // The content inside parens usually has comma separated values: Vendor, Renderer, Version
      const inner = angleMatch[1];
      const segments = inner.split(',').map(s => s.trim());
      
      // Look for the segment that looks like a GPU model
      // Prefer strings containing 'GeForce', 'Radeon', 'RTX', 'GTX', 'Intel', 'Arc'
      const model = segments.find(s => 
          /GeForce|Radeon|RTX|GTX|RX|Intel|Iris|Arc|Adreno|Mali/i.test(s) && 
          !/Corporation|Inc|Microsoft/i.test(s) // Avoid vendor names if possible
      );

      if (model) {
          gpuName = model;
      } else if (segments.length > 1) {
          // Fallback to 2nd segment which is usually the renderer in ANGLE strings
          gpuName = segments[1];
      } else {
          gpuName = inner;
      }
  }

  // Clean up suffix garbage often found in raw renderer strings (e.g. "Direct3D11 vs_5_0 ps_5_0")
  gpuName = gpuName.replace(/\s*(Direct3D|OpenGL|OpenGLES|vs_|ps_).*/i, '');

  // Clean up repeated vendor names e.g. "NVIDIA NVIDIA GeForce"
  ['NVIDIA', 'AMD', 'Intel'].forEach(vendor => {
      const re = new RegExp(`(${vendor})\\s+\\1`, 'ig');
      gpuName = gpuName.replace(re, '$1');
  });
  
  parts.push(`GPU: ${gpuName.trim()}`);

  // 3. CPU Threads
  if (navigator.hardwareConcurrency) {
    parts.push(`CPU Threads: ${navigator.hardwareConcurrency}`);
  }

  // 4. RAM (Browser API is capped at 8GB usually)
  // @ts-ignore
  if (navigator.deviceMemory) {
    // @ts-ignore
    const mem = navigator.deviceMemory;
    parts.push(`RAM: ${mem >= 8 ? '8GB+' : mem + 'GB'}`);
  }

  // 5. OS Hint
  const ua = navigator.userAgent;
  let os = "Unknown OS";
  if (ua.includes("Windows NT 10.0")) os = "Windows 10/11";
  else if (ua.includes("Windows NT 6.3")) os = "Windows 8.1";
  else if (ua.includes("Windows NT 6.2")) os = "Windows 8";
  else if (ua.includes("Mac")) os = "MacOS";
  else if (ua.includes("Linux")) os = "Linux";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  
  parts.push(`OS: ${os}`);

  return parts.join(' | ');
};