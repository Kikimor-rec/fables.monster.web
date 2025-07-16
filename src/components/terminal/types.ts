/** Entry from the ship's system logs */
export interface ShipLog {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  details: string;
}

/** Flight log from the SILK STAR vessel */
export interface SilkStarLog {
  id: string;
  entry: string;
  content: string;
}

/** Status data for life support subsystems */
export interface LifeSupportSystem {
  id: string;
  name: string;
  status: string;
  description: string;
}

/** Single crew member entry */
export interface CrewMember {
  name: string;
  position: string;
}

/** Collection of crew members */
export interface CrewManifest {
  crew?: CrewMember[];
}

/** Cryocapsule protocol instructions */
export interface CryoProtocol {
  title: string;
  description?: string;
  authorization?: string;
  content?: string;
}
