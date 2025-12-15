export type EnvironmentKey = "production" | "beta";

export type Incident = {
  id: string;
  startedAt: string;
  endedAt: string;
  durationMinutes: number;
  impact: "partial" | "major";
};

export type EnvironmentStats = {
  name: string;
  url: string;
  uptimePercent: number;
  totalDowntimeMinutes: number;
  incidents: Incident[];
};

export const MOCK_DATA: Record<EnvironmentKey, EnvironmentStats> = {
  production: {
    name: "HTV Production",
    url: "https://htv.vc",
    uptimePercent: 99.97,
    totalDowntimeMinutes: 13,
    incidents: [
      {
        id: "p1",
        startedAt: "2025-12-02T01:12:00Z",
        endedAt: "2025-12-02T01:19:00Z",
        durationMinutes: 7,
        impact: "partial",
      },
      {
        id: "p2",
        startedAt: "2025-11-28T17:43:00Z",
        endedAt: "2025-11-28T17:49:00Z",
        durationMinutes: 6,
        impact: "major",
      },
    ],
  },
  beta: {
    name: "HTV Beta",
    url: "https://beta-htv.vc",
    uptimePercent: 99.82,
    totalDowntimeMinutes: 79,
    incidents: [
      {
        id: "b1",
        startedAt: "2025-12-05T09:03:00Z",
        endedAt: "2025-12-05T09:27:00Z",
        durationMinutes: 24,
        impact: "partial",
      },
      {
        id: "b2",
        startedAt: "2025-11-26T22:11:00Z",
        endedAt: "2025-11-26T22:56:00Z",
        durationMinutes: 45,
        impact: "major",
      },
      {
        id: "b3",
        startedAt: "2025-11-23T14:18:00Z",
        endedAt: "2025-11-23T14:28:00Z",
        durationMinutes: 10,
        impact: "partial",
      },
    ],
  },
};
