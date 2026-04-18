export const VTT_ESTIMATE_EVENT = 'fm:vtt-estimate';
export const VTT_ESTIMATE_STORAGE_KEY = 'fm:vtt-estimate:last';

export interface VttEstimateLeadData {
  service_type: string;
  service_type_label: string;
  platform: string;
  platform_label: string;
  project_size: string;
  project_size_label: string;
  automation_level: string;
  automation_level_label: string;
  material_state: string;
  material_state_label: string;
  post_release_support?: string;
  post_release_support_label?: string;
  estimated_range: string;
  support_note?: string;
  support_hours?: string;
}
