declare namespace CodeClimbers {
  export interface WakatimePulseStatusDao {
    project: string;
    language: string;
    editor: string;
    operatingSystem: string;
    machine: string;
    branch: string;
    seconds: number | string;
    maxHeartbeatTime: string;
    minHeartbeatTime: string;
  }

  export interface Source {
    name: string;
    lastActive: string;
  }
}
