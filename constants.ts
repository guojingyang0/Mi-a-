import { CVarDefinition, Preset, ConfigCategory } from './types';

export const CVAR_DEFINITIONS: CVarDefinition[] = [
  // --- GAME USER SETTINGS (Primary) ---

  // SCALABILITY
  {
    id: 'sgGraphic',
    name: 'Graphic Quality (Overall)',
    command: 'sg.GraphicQuality',
    description: 'Overall graphics quality preset.',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 4,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgResolution',
    name: 'Resolution Quality (Scalability)',
    command: 'sg.ResolutionQuality',
    description: 'Internal rendering resolution percentage (Scalability Group).',
    type: 'slider',
    min: 50,
    max: 100,
    step: 1,
    category: 'scalability',
    defaultValue: 100,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgViewDistance',
    name: 'View Distance Quality',
    command: 'sg.ViewDistanceQuality',
    description: 'Controls distance at which objects are culled. 0=Low, 3=Epic, 4=Cinematic.',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgShadows',
    name: 'Shadow Quality (Base)',
    command: 'sg.ShadowQuality',
    description: 'Base shadow resolution and distance.',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgAntiAliasing',
    name: 'Anti-Aliasing Quality',
    command: 'sg.AntiAliasingQuality',
    description: 'Quality of edge smoothing (TAA/FXAA).',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgPostProcess',
    name: 'Post-Process Quality',
    command: 'sg.PostProcessQuality',
    description: 'Base quality for bloom, DOF, motion blur, etc.',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgTexture',
    name: 'Texture Quality',
    command: 'sg.TextureQuality',
    description: 'Quality of textures (Sharpness/Resolution).',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgEffects',
    name: 'Effects Quality',
    command: 'sg.EffectsQuality',
    description: 'Quality of visual effects and particles.',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgFoliage',
    name: 'Foliage Quality',
    command: 'sg.FoliageQuality',
    description: 'Density and quality of grass and trees.',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'sgShading',
    name: 'Shading Quality',
    command: 'sg.ShadingQuality',
    description: 'Quality of material shading models.',
    type: 'select',
    options: [
      { label: 'Low', value: 0 },
      { label: 'Medium', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Epic', value: 3 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'scalability',
    defaultValue: 3,
    section: 'ScalabilityGroups',
    fileName: 'GameUserSettings.ini'
  },

  // QRSL SETTINGS & RESOLUTION
  {
    id: 'resolutionX',
    name: 'Resolution Width',
    command: 'ResolutionSizeX',
    description: 'Horizontal resolution (e.g., 1920, 2560, 3440).',
    type: 'number',
    category: 'rendering',
    defaultValue: 1920,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'resolutionY',
    name: 'Resolution Height',
    command: 'ResolutionSizeY',
    description: 'Vertical resolution (e.g., 1080, 1440).',
    type: 'number',
    category: 'rendering',
    defaultValue: 1080,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'fullscreenMode',
    name: 'Window Mode',
    command: 'FullscreenMode',
    description: 'Display mode.',
    type: 'select',
    options: [
        { label: 'Exclusive Fullscreen', value: 0 },
        { label: 'Windowed Fullscreen', value: 1 },
        { label: 'Windowed', value: 2 }
    ],
    category: 'rendering',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'frameRateLimit',
    name: 'Frame Rate Limit (Game)',
    command: 'FrameRateLimit',
    description: 'Primary FPS limit. 0 = Unlimited.',
    type: 'slider',
    min: 0,
    max: 240,
    step: 15,
    category: 'rendering',
    defaultValue: 0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bIsShowFPS',
    name: 'Show FPS',
    command: 'bIsShowFPS',
    description: 'Show in-game frame rate counter.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'rendering',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'fFightCameraDistance',
    name: 'Combat Camera Distance',
    command: 'fFightCameraDistance',
    description: 'Max zoom-out distance during combat. Default is 1.0.',
    type: 'slider',
    min: 1.0,
    max: 3.0,
    step: 0.1,
    category: 'rendering',
    defaultValue: 1.0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'FieldOfViewScale',
    name: 'Field of View (FOV)',
    command: 'FieldOfViewScale',
    description: 'Camera field of view. Default ~90.',
    type: 'slider',
    min: 70,
    max: 120,
    step: 1,
    category: 'rendering',
    defaultValue: 90,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bUseVSync',
    name: 'Vertical Sync (Game)',
    command: 'bUseVSync',
    description: 'Prevents tearing but adds latency. Preferred over Engine VSync.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'rendering',
    defaultValue: 0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bUseDynamicResolution',
    name: 'Dynamic Resolution',
    command: 'bUseDynamicResolution',
    description: 'Automatically adjust resolution to maintain framerate.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'rendering',
    defaultValue: 0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'resolutionScale',
    name: 'Resolution Scale (Game)',
    command: 'ResolutionScale',
    description: 'In-game resolution slider. 100 is native.',
    type: 'slider',
    min: 50,
    max: 100,
    step: 5,
    category: 'rendering',
    defaultValue: 100,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'dlssEnabled',
    name: 'DLSS Enabled',
    command: 'bDLSSEnabled',
    description: 'Enable Nvidia DLSS (Requires RTX card).',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'rendering',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'dlssMode',
    name: 'DLSS Mode',
    command: 'DLSSMode',
    description: '0=Off, 1=Auto, 2=DLAA, 3=HighQuality, 4=Quality, 5=Balanced, 6=Performance.',
    type: 'select',
    options: [
        { label: 'Off', value: 0 },
        { label: 'Auto', value: 1 },
        { label: 'DLAA', value: 2 },
        { label: 'HighQuality', value: 3 },
        { label: 'Quality', value: 4 },
        { label: 'Balanced', value: 5 },
        { label: 'Performance', value: 6 }
    ],
    category: 'rendering',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'dlssFrameGen',
    name: 'DLSS Frame Gen (DLSS 3)',
    command: 'bStreamlineDLSSGEnabled',
    description: 'Generates extra frames using AI. Requires RTX 40 series.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'rendering',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bEnableShadow',
    name: 'Enable Shadows',
    command: 'bEnableShadow',
    description: 'Master switch for shadows. OFF gives massive FPS boost but looks flat.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'rendering',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'MaxVisibilityPlayer',
    name: 'Max Visible Players',
    command: 'MaxVisibilityPlayer',
    description: 'Limit number of visible players to improve CPU performance.',
    type: 'slider',
    min: 5,
    max: 60,
    step: 1,
    category: 'streaming',
    defaultValue: 20,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bShowPlayerDigest',
    name: 'Show Player Names',
    command: 'bShowPlayerDigest',
    description: 'Toggle other players\' nameplates.',
    type: 'toggle',
    options: [
        { label: 'Hide', value: 0 },
        { label: 'Show', value: 1 }
    ],
    category: 'streaming',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'BloomIntensity',
    name: 'Bloom Intensity',
    command: 'BloomIntensity',
    description: 'Strength of the bloom (glow) effect.',
    type: 'slider',
    min: 0,
    max: 3.0,
    step: 0.1,
    category: 'postprocess',
    defaultValue: 1.0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'GammaScale',
    name: 'Gamma (Brightness)',
    command: 'GammaScale',
    description: 'Scene brightness. Lower is darker.',
    type: 'slider',
    min: 0.5,
    max: 2.5,
    step: 0.1,
    category: 'postprocess',
    defaultValue: 1.0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bUseHDRDisplayOutput',
    name: 'HDR Output',
    command: 'bUseHDRDisplayOutput',
    description: 'High Dynamic Range output for compatible monitors.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'postprocess',
    defaultValue: 0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bOpenShowParticleInTeamClone',
    name: 'Teammate Effects',
    command: 'bOpenShowParticleInTeamClone',
    description: 'Show skill effects of teammates.',
    type: 'toggle',
    options: [
        { label: 'Hide', value: 0 },
        { label: 'Show', value: 1 }
    ],
    category: 'effects',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bShowThirdEffect',
    name: 'Other Player Effects',
    command: 'bShowThirdEffect',
    description: 'Show effects from other players (non-teammates).',
    type: 'toggle',
    options: [
        { label: 'Hide', value: 0 },
        { label: 'Show', value: 1 }
    ],
    category: 'effects',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bShowLingyuEffect',
    name: 'Skill Field Effects',
    command: 'bShowLingyuEffect',
    description: 'Show field skills (e.g., Lin/Nemesis/Fiona zones).',
    type: 'toggle',
    options: [
        { label: 'Hide', value: 0 },
        { label: 'Show', value: 1 }
    ],
    category: 'effects',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'ThirdParticleRate_UI',
    name: 'Other Player Opacity',
    command: 'ThirdParticleRate_UI',
    description: 'Opacity of other players\' effects (0-100).',
    type: 'slider',
    min: 0,
    max: 100,
    step: 5,
    category: 'effects',
    defaultValue: 100,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'SelfParticleRate_UI',
    name: 'Self Effect Opacity',
    command: 'SelfParticleRate_UI',
    description: 'Opacity of your own effects (0-100).',
    type: 'slider',
    min: 0,
    max: 100,
    step: 5,
    category: 'effects',
    defaultValue: 100,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'bUseFashionAnimation',
    name: 'Cloth Physics',
    command: 'bUseFashionAnimation',
    description: 'Enable physics for character clothes and hair.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'effects',
    defaultValue: 1,
    section: '/Script/QRSL.QRSLGameUserSettings',
    valueType: 'boolean',
    fileName: 'GameUserSettings.ini'
  },
  {
    id: 'DamageFloatiesSize',
    name: 'Damage Text Size',
    command: 'DamageFloatiesSize',
    description: 'Scale of floating damage numbers.',
    type: 'slider',
    min: 0.5,
    max: 2.0,
    step: 0.1,
    category: 'rendering',
    defaultValue: 1.0,
    section: '/Script/QRSL.QRSLGameUserSettings',
    fileName: 'GameUserSettings.ini'
  },

  // --- ENGINE.INI (Advanced / Override) ---

  // RENDERING
  {
    id: 'frameSmoothing',
    name: 'Frame Smoothing (Engine)',
    command: 'bSmoothFrameRate',
    description: 'Must be OFF to truly unlock FPS beyond 60 in some cases.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'rendering',
    defaultValue: 0,
    section: '/Script/Engine.Engine',
    valueType: 'boolean',
    fileName: 'Engine.ini'
  },
  {
    id: 'screenPercentage',
    name: 'Resolution Scale (Engine Override)',
    command: 'r.ScreenPercentage',
    description: 'Advanced: Can go above 100 for Supersampling (Crisper image).',
    type: 'slider',
    min: 50,
    max: 200,
    step: 5,
    category: 'rendering',
    defaultValue: 100,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'viewDistance',
    name: 'View Distance Multiplier',
    command: 'r.ViewDistanceScale',
    description: 'Multiplies the base scalability distance.',
    type: 'slider',
    min: 0.5,
    max: 5.0,
    step: 0.1,
    category: 'rendering',
    defaultValue: 1.0,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'vegetationDensity',
    name: 'Vegetation Density',
    command: 'foliage.DensityScale',
    description: 'Controls the density of grass. 0 = No grass.',
    type: 'slider',
    min: 0,
    max: 2.0,
    step: 0.1,
    category: 'rendering',
    defaultValue: 1.0,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'maxAnisotropy',
    name: 'Texture Anisotropy',
    command: 'r.MaxAnisotropy',
    description: 'Texture sharpness at angles.',
    type: 'slider',
    min: 0,
    max: 16,
    step: 2,
    category: 'rendering',
    defaultValue: 8,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  
  // SHADOWS (Advanced)
  {
    id: 'shadowQuality',
    name: 'Shadow Quality (Engine)',
    command: 'r.ShadowQuality',
    description: 'Advanced shadow resolution scale (0-5).',
    type: 'select',
    options: [
      { label: 'Off', value: 0 },
      { label: 'Low', value: 1 },
      { label: 'Medium', value: 2 },
      { label: 'High', value: 3 },
      { label: 'Epic', value: 4 },
      { label: 'Cinematic', value: 5 }
    ],
    category: 'shadows',
    defaultValue: 5,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'contactShadows',
    name: 'Contact Shadows',
    command: 'r.ContactShadows',
    description: 'Small scale detailed shadows.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'shadows',
    defaultValue: 1,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },

  // POST PROCESS
  {
    id: 'volumetricFog',
    name: 'Volumetric Fog',
    command: 'r.VolumetricFog',
    description: 'Atmospheric light shafts. Performance heavy.',
    type: 'toggle',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 1 }
    ],
    category: 'postprocess',
    defaultValue: 1,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'chromaticAberration',
    name: 'Chromatic Aberration',
    command: 'r.SceneColorFringeQuality',
    description: 'Lens color fringing effect.',
    type: 'select',
    options: [
      { label: 'Off (Clean)', value: 0 },
      { label: 'On', value: 1 }
    ],
    category: 'postprocess',
    defaultValue: 1,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'motionBlur',
    name: 'Motion Blur',
    command: 'r.MotionBlurQuality',
    description: 'Blurring of moving objects.',
    type: 'select',
    options: [
      { label: 'Off', value: 0 },
      { label: 'Low', value: 1 },
      { label: 'High', value: 3 },
      { label: 'Ultra', value: 4 }
    ],
    category: 'postprocess',
    defaultValue: 3,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'dofQuality',
    name: 'Depth of Field',
    command: 'r.DepthOfFieldQuality',
    description: 'Background blur.',
    type: 'select',
    options: [
      { label: 'Off', value: 0 },
      { label: 'Low', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Cinematic', value: 4 }
    ],
    category: 'postprocess',
    defaultValue: 2,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'tonemapperSharpen',
    name: 'Sharpening',
    command: 'r.Tonemapper.Sharpen',
    description: 'Post-process sharpening strength.',
    type: 'slider',
    min: 0,
    max: 5,
    step: 0.1,
    category: 'postprocess',
    defaultValue: 1.0,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'bloomQuality',
    name: 'Bloom Quality',
    command: 'r.BloomQuality',
    description: 'Quality of the bloom effect.',
    type: 'select',
    options: [
        { label: 'Off', value: 0 },
        { label: 'Low', value: 1 },
        { label: 'High', value: 5 }
    ],
    category: 'postprocess',
    defaultValue: 5,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'lensFlares',
    name: 'Lens Flares',
    command: 'r.LensFlareQuality',
    description: 'Lens flare quality.',
    type: 'select',
    options: [
        { label: 'Off', value: 0 },
        { label: 'On', value: 2 }
    ],
    category: 'postprocess',
    defaultValue: 2,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'ssrQuality',
    name: 'Screen Space Reflections',
    command: 'r.SSR.Quality',
    description: 'Quality of reflections.',
    type: 'select',
    options: [
        { label: 'Off', value: 0 },
        { label: 'Low', value: 1 },
        { label: 'High', value: 3 },
        { label: 'Epic', value: 4 }
    ],
    category: 'rendering',
    defaultValue: 3,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'particleQuality',
    name: 'Particle Light Quality',
    command: 'r.ParticleLightQuality',
    description: 'Quality of lighting on particles.',
    type: 'select',
    options: [
        { label: 'Low', value: 0 },
        { label: 'Medium', value: 1 },
        { label: 'High', value: 2 }
    ],
    category: 'effects',
    defaultValue: 2,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  },
  {
    id: 'streamingPoolSize',
    name: 'Texture Streaming Pool',
    command: 'r.Streaming.PoolSize',
    description: 'VRAM reserved for textures (MB). Set to ~60% of VRAM.',
    type: 'number',
    category: 'streaming',
    defaultValue: 3000,
    section: 'SystemSettings',
    fileName: 'Engine.ini'
  }
];

export const CATEGORIES: { id: ConfigCategory; label: string }[] = [
  { id: 'scalability', label: 'Base Quality (GUS)' },
  { id: 'rendering', label: 'Rendering' },
  { id: 'shadows', label: 'Light & Shadow' },
  { id: 'postprocess', label: 'Post-Process' },
  { id: 'effects', label: 'VFX & Particles' },
  { id: 'streaming', label: 'System & VRAM' },
  { id: 'automation', label: 'Automation & Macros' }
];

export const PRESETS: Preset[] = [
  {
    name: 'low',
    description: 'Low / Potato',
    values: {
      sgGraphic: 0,
      sgResolution: 75,
      sgViewDistance: 0,
      sgShadows: 0,
      sgAntiAliasing: 0,
      sgPostProcess: 0,
      sgTexture: 0,
      sgEffects: 0,
      sgFoliage: 0,
      sgShading: 0,
      resolutionScale: 75,
      dlssMode: 6, // Performance
      dlssFrameGen: 0,
      fFightCameraDistance: 1.0,
      volumetricFog: 0,
      motionBlur: 0,
      dofQuality: 0,
      contactShadows: 0,
      chromaticAberration: 0,
      vegetationDensity: 0.5,
      frameSmoothing: 0,
      bUseVSync: 0,
      bloomQuality: 1,
      ssrQuality: 0,
      lensFlares: 0,
      particleQuality: 0,
      shadowQuality: 1,
      bUseDynamicResolution: 1,
      MaxVisibilityPlayer: 5,
      bOpenShowParticleInTeamClone: 0,
      bShowThirdEffect: 0,
      bEnableShadow: 0,
      bUseFashionAnimation: 0,
      ThirdParticleRate_UI: 0
    }
  },
  {
    name: 'medium',
    description: 'Medium / Balanced',
    values: {
      sgGraphic: 1,
      sgResolution: 90,
      sgViewDistance: 1,
      sgShadows: 1,
      sgAntiAliasing: 1,
      sgPostProcess: 1,
      sgTexture: 1,
      sgEffects: 1,
      sgFoliage: 1,
      sgShading: 1,
      resolutionScale: 90,
      dlssMode: 5, // Balanced
      dlssFrameGen: 0,
      fFightCameraDistance: 1.2,
      volumetricFog: 0,
      motionBlur: 1,
      dofQuality: 1,
      contactShadows: 1,
      chromaticAberration: 1,
      vegetationDensity: 1.0,
      frameSmoothing: 0,
      bUseVSync: 0,
      bloomQuality: 1,
      ssrQuality: 1,
      lensFlares: 2,
      particleQuality: 1,
      shadowQuality: 2,
      bUseDynamicResolution: 1,
      MaxVisibilityPlayer: 15,
      bOpenShowParticleInTeamClone: 1,
      bShowThirdEffect: 0,
      bEnableShadow: 1,
      bUseFashionAnimation: 1,
      ThirdParticleRate_UI: 50
    }
  },
  {
    name: 'high',
    description: 'High / Quality',
    values: {
      sgGraphic: 2,
      sgResolution: 100,
      sgViewDistance: 2,
      sgShadows: 2,
      sgAntiAliasing: 2,
      sgPostProcess: 2,
      sgTexture: 2,
      sgEffects: 2,
      sgFoliage: 2,
      sgShading: 2,
      resolutionScale: 100,
      dlssMode: 4, // Quality
      dlssFrameGen: 1,
      fFightCameraDistance: 1.5,
      volumetricFog: 1,
      motionBlur: 1,
      dofQuality: 2,
      contactShadows: 1,
      chromaticAberration: 1,
      vegetationDensity: 1.5,
      frameSmoothing: 0,
      bUseVSync: 0,
      bloomQuality: 5,
      ssrQuality: 3,
      lensFlares: 2,
      particleQuality: 2,
      shadowQuality: 3,
      bUseDynamicResolution: 0,
      MaxVisibilityPlayer: 30,
      bOpenShowParticleInTeamClone: 1,
      bShowThirdEffect: 1,
      bEnableShadow: 1,
      bUseFashionAnimation: 1,
      ThirdParticleRate_UI: 100
    }
  },
  {
    name: 'ultra',
    description: 'Ultra / Cinematic',
    values: {
      sgGraphic: 4,
      sgResolution: 100,
      sgViewDistance: 4,
      sgShadows: 4,
      sgAntiAliasing: 4,
      sgPostProcess: 4,
      sgTexture: 4,
      sgEffects: 4,
      sgFoliage: 4,
      sgShading: 4,
      resolutionScale: 100,
      dlssMode: 2, // DLAA or Auto
      dlssFrameGen: 1,
      fFightCameraDistance: 2.0,
      volumetricFog: 1,
      motionBlur: 3,
      dofQuality: 4,
      contactShadows: 1,
      chromaticAberration: 1,
      vegetationDensity: 2.0,
      frameSmoothing: 0,
      bUseVSync: 0,
      bloomQuality: 5,
      ssrQuality: 4,
      lensFlares: 2,
      particleQuality: 2,
      shadowQuality: 5,
      bUseDynamicResolution: 0,
      MaxVisibilityPlayer: 60,
      bOpenShowParticleInTeamClone: 1,
      bShowThirdEffect: 1,
      bEnableShadow: 1,
      bUseFashionAnimation: 1,
      ThirdParticleRate_UI: 100
    }
  }
];