// Everything is optional since the schema can change without warning.

export type DeviceType = {
  sysids?: string[];
  icon?: {
    resolutions?: [number, number][];
    id?: string;
  };
  line?: {
    name?: string;
    id?: string;
  };
  guids?: string[];
  uisp?: {
    nameLegacy?: string[];
    bleServices?: Record<string, any>;
    line?: string;
    firmware?: {
      platform?: string | null;
      board?: string[];
    };
  };
  id?: string;
  product?: {
    abbrev?: string;
    name?: string;
  };
  shortnames?: string[];
  triplets?: any[]; // You can replace 'any' with a more specific type if needed
};

export type DevicesType = DeviceType[];
