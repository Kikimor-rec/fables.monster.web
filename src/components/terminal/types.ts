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
  /** Crew member rank or role */
  rank: string;
  /** Crew member name */
  name: string;
  /** Current status (e.g. ONLINE, CRYOPOD 2) */
  status: string;
  /** Render the name with a line-through effect */
  strike?: boolean;
  /** Optional timer in seconds that should increment every second */
  timer?: number;
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
