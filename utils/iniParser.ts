export interface IniLine {
  raw: string;
  key?: string;
  value?: string;
  isCommented?: boolean;
}

export interface IniSection {
  name: string;
  lines: IniLine[];
}

export type ParsedIni = IniSection[];

export const parseIni = (content: string): ParsedIni => {
  const lines = content.split(/\r?\n/);
  const sections: ParsedIni = [];
  
  let currentSection: IniSection = { name: '', lines: [] };
  sections.push(currentSection);

  const sectionRegex = /^\[(.*)\]\s*$/;
  // Matches "Key=Value" (key cannot contain = or ;)
  const activeKvRegex = /^([^=;]+)=(.*)$/;
  // Matches ";Key=Value" or "; Key=Value"
  const commentedKvRegex = /^;\s*([^=]+)=(.*)$/;

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Check for Section Header
    const sectionMatch = trimmed.match(sectionRegex);
    if (sectionMatch) {
      currentSection = { name: sectionMatch[1].trim(), lines: [] };
      sections.push(currentSection);
      continue;
    }

    // 1. Try Active Key match
    // Ensure we don't match lines starting with ; as active
    if (!trimmed.startsWith(';')) {
        const activeMatch = trimmed.match(activeKvRegex);
        if (activeMatch) {
            currentSection.lines.push({
                raw: line,
                key: activeMatch[1].trim(),
                value: activeMatch[2].trim(),
                isCommented: false
            });
            continue;
        }
    }

    // 2. Try Commented Key match
    if (trimmed.startsWith(';')) {
        const commentedMatch = trimmed.match(commentedKvRegex);
        if (commentedMatch) {
            currentSection.lines.push({
                raw: line,
                key: commentedMatch[1].trim(),
                value: commentedMatch[2].trim(),
                isCommented: true
            });
            continue;
        }
    }

    // 3. Fallback: Raw line (comments, empty lines, garbage)
    currentSection.lines.push({ raw: line });
  }

  return sections;
};

export const mergeIni = (original: ParsedIni, updates: { section: string; key: string; value: string }[]): string => {
  const sections = JSON.parse(JSON.stringify(original)) as ParsedIni;

  for (const update of updates) {
    // 1. Find Section (Case Insensitive)
    let section = sections.find(s => s.name.toLowerCase() === update.section.toLowerCase());
    
    // If section doesn't exist, create it
    if (!section) {
      section = { name: update.section, lines: [] };
      sections.push(section);
    }

    // 2. Find Key in Section
    // Strategy: Search backwards to find the *last* occurrence (effective value).
    // Priority: Active Key > Commented Key
    
    let activeIndex = -1;
    let commentedIndex = -1;

    for (let i = section.lines.length - 1; i >= 0; i--) {
        const line = section.lines[i];
        if (line.key && line.key.toLowerCase() === update.key.toLowerCase()) {
            if (line.isCommented) {
                if (commentedIndex === -1) commentedIndex = i;
            } else {
                if (activeIndex === -1) activeIndex = i;
            }
        }
    }

    // Prefer updating an active key, otherwise uncomment a commented key
    const targetIndex = activeIndex !== -1 ? activeIndex : commentedIndex;

    if (targetIndex !== -1) {
      // Update existing key (or uncomment it)
      const line = section.lines[targetIndex];
      line.key = update.key; // Normalize key casing to match our definition
      line.value = update.value;
      line.isCommented = false; // Ensure it's active
      line.raw = `${update.key}=${update.value}`;
    } else {
      // Append new key at the end of the section
      section.lines.push({
        key: update.key,
        value: update.value,
        raw: `${update.key}=${update.value}`,
        isCommented: false
      });
    }
  }

  // Serialize back to string
  let output = '';
  sections.forEach((section) => {
    if (section.name) {
      output += `[${section.name}]\n`;
    }
    
    section.lines.forEach(line => {
      output += line.raw + '\n';
    });
  });

  return output;
};