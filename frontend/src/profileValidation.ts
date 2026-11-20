export type LandholdingStatus = 'owner' | 'landholder' | 'tenant' | 'tenant_sharecropper' | 'landless' | 'unknown';
export type SavedLandholdingStatus = 'owner' | 'tenant_sharecropper' | 'landless' | 'unknown';
export type SavedLandholdingForm = { landholding_status: SavedLandholdingStatus; land_size: string };
export type LandSizeInputRules = { min?: number; step: number; required: boolean; disabled: boolean };
export type ProfileSaveForm = {
  full_name: string;
  mobile_number: string;
  state: string;
  district: string;
  village: string;
  crops: string;
  land_size: string;
  land_unit: 'acre' | 'hectare';
  landholding_status: SavedLandholdingStatus;
};

export function isLandholdingStatus(value: string): value is LandholdingStatus {
  return ['owner', 'landholder', 'tenant', 'tenant_sharecropper', 'landless', 'unknown'].includes(value);
}

export function isSavedLandholdingStatus(value: string): value is SavedLandholdingStatus {
  return ['owner', 'tenant_sharecropper', 'landless', 'unknown'].includes(value);
}

export function updateSavedLandholdingStatus<T extends SavedLandholdingForm>(current: T, value: string): T {
  if (!isSavedLandholdingStatus(value)) return current;
  return {
    ...current,
    landholding_status: value,
    land_size: value === 'landless' ? '0' : current.landholding_status === 'landless' ? '' : current.land_size,
  };
}

export function getLandSizeInputRules(status: SavedLandholdingStatus): LandSizeInputRules {
  const landless = status === 'landless';
  return {
    min: landless ? undefined : 0.001,
    step: 0.001,
    required: !landless,
    disabled: landless,
  };
}

export function buildProfileSavePayload(form: ProfileSaveForm, crops: string[]) {
  return { ...form, crops, land_size: Number(form.land_size) };
}

export function isValidLandSize(landholdingType: LandholdingStatus, landSize: number): boolean {
  if (!Number.isFinite(landSize) || landSize < 0 || landSize > 100000) return false;
  return landholdingType === 'landless' ? landSize === 0 : landSize > 0;
}
