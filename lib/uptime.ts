export type EnvironmentKey = "production" | "beta";

export type Incident = {
  id: string;
  startedAt: string;
  endedAt: string;
  durationMinutes: number;
  impact: "partial" | "major" | "minor";
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
    uptimePercent: 99.92,
    totalDowntimeMinutes: 36,
    incidents: [
      {
        id: "p1",
        startedAt: "2025-12-02T03:10:00Z",
        endedAt: "2025-12-02T03:18:00Z",
        durationMinutes: 8,
        impact: "minor",
      },
      {
        id: "p2",
        startedAt: "2025-12-05T11:40:00Z",
        endedAt: "2025-12-05T11:52:00Z",
        durationMinutes: 12,
        impact: "partial",
      },
      {
        id: "p3",
        startedAt: "2025-12-09T07:05:00Z",
        endedAt: "2025-12-09T07:11:00Z",
        durationMinutes: 6,
        impact: "partial",
      },
      {
        id: "p4",
        startedAt: "2025-12-14T19:40:00Z",
        endedAt: "2025-12-14T19:45:00Z",
        durationMinutes: 5,
        impact: "major",
      },
    ],
  },
  beta: {
    name: "HTV Beta",
    url: "https://beta-htv.vc",
    uptimePercent: 99.35,
    totalDowntimeMinutes: 120,
    incidents: [
      {
        id: "b1",
        startedAt: "2025-12-01T09:03:00Z",
        endedAt: "2025-12-01T09:33:00Z",
        durationMinutes: 30,
        impact: "minor",
      },
      {
        id: "b2",
        startedAt: "2025-12-06T22:11:00Z",
        endedAt: "2025-12-06T22:41:00Z",
        durationMinutes: 30,
        impact: "major",
      },
      {
        id: "b3",
        startedAt: "2025-12-10T14:18:00Z",
        endedAt: "2025-12-10T14:38:00Z",
        durationMinutes: 20,
        impact: "partial",
      },
      {
        id: "b4",
        startedAt: "2025-12-15T03:10:00Z",
        endedAt: "2025-12-15T03:30:00Z",
        durationMinutes: 20,
        impact: "partial",
      },
      {
        id: "b5",
        startedAt: "2025-12-20T18:20:00Z",
        endedAt: "2025-12-20T18:40:00Z",
        durationMinutes: 20,
        impact: "major",
      },
    ],
  },
};
