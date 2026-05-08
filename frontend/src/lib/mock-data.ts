export interface CaseFeature {
  name: string;
  value: string;
  delta: number;
  weight: number;
  baseline: string;
  note: string;
}

export interface CaseExplanation {
  flag: string;
  summary: string;
  citation: { pub: string; section: string; anchor: string };
  quote: string;
}

export interface CaseFairness {
  demographicParity: number;
  equalOpportunity: number;
  groupRates: Array<{ group: string; flagRate: number; n: number }>;
}

export interface DashboardCase {
  id: string;
  taxpayer: string;
  taxYear: number;
  filingStatus: string;
  agi: number;
  withheld: number;
  refund: number;
  submitted: string;
  score: number;
  tier: 'High' | 'Medium' | 'Low';
  tierLabel: string;
  demographics: { ageGroup: string; region: string; occupation: string };
  features?: CaseFeature[];
  explanations?: CaseExplanation[];
  fairness?: CaseFairness;
}

export interface QueueStats {
  open: number;
  high: number;
  medium: number;
  low: number;
  flaggedToday: number;
  avgScoreToday: number;
  modelLatencyMs: number;
  ragLatencyMs: number;
}

export interface DashboardData {
  cases: DashboardCase[];
  queueStats: QueueStats;
  scoreHistogram: number[];
  flaggedTrend: number[];
}

export const MOCK_DATA: DashboardData = {
  cases: [
    {
      id: 'TR-2024-04812',
      taxpayer: 'Sample · A. Reyes',
      taxYear: 2024,
      filingStatus: 'Single',
      agi: 184_220,
      withheld: 18_400,
      refund: 12_840,
      submitted: '2026-04-12',
      score: 0.91,
      tier: 'High',
      tierLabel: 'High risk',
      demographics: { ageGroup: '35–44', region: 'Northeast', occupation: 'Self-employed' },
      features: [
        { name: 'Schedule C deduction ratio', value: '47.2%', delta: +0.34, weight: 0.34, baseline: '12% peer median', note: 'Deductions claimed at 4× peer median for sole-proprietor consultants in this AGI band.' },
        { name: 'Charitable contributions / AGI', value: '18.1%', delta: +0.22, weight: 0.22, baseline: '3.4% peer median', note: 'Non-cash gifts above $500 require Form 8283; no Form 8283 attached.' },
        { name: 'Home office deduction', value: '$24,800', delta: +0.14, weight: 0.14, baseline: '$3,210 peer median', note: 'Square-footage method, but reported area exceeds Schedule E primary-residence sq ft.' },
        { name: 'Year-over-year income drop', value: '−38%', delta: +0.11, weight: 0.11, baseline: '−4% peer median', note: 'Income drop concurrent with Schedule C expansion.' },
        { name: 'Mileage deduction', value: '32,400 mi', delta: +0.07, weight: 0.07, baseline: '7,800 mi peer median', note: 'Implies ~89 mi/day every day of the year.' },
        { name: 'Dependents claimed', value: '2', delta: -0.04, weight: 0.04, baseline: '2 prior-year', note: 'Consistent with prior year.' },
        { name: 'W-2 income', value: '$84,000', delta: -0.06, weight: 0.06, baseline: 'Verified by employer filing', note: 'Reconciles cleanly with employer-side W-2.' },
      ],
      explanations: [
        {
          flag: 'Schedule C deductions exceed peer median',
          summary: 'Total Schedule C deductions of $87,250 against $184,720 gross receipts (47.2%) materially exceed the 12% median observed for sole-proprietor consultants in the $150K–$250K AGI band.',
          citation: { pub: 'Pub 334', section: 'Ch. 8 — Business Expenses', anchor: '§8.1, p. 41' },
          quote: 'You can deduct ordinary and necessary expenses for carrying on a trade or business.',
        },
        {
          flag: 'Non-cash charitable contribution missing Form 8283',
          summary: 'Non-cash contributions of $33,400 reported on Schedule A line 12, but Form 8283 (required when non-cash gifts exceed $500) is not attached.',
          citation: { pub: 'Pub 526', section: 'Records to Keep — Noncash Contributions', anchor: 'p. 22' },
          quote: 'If your total deduction for all noncash contributions is over $500, you must complete Form 8283.',
        },
        {
          flag: 'Home office area inconsistent with primary residence',
          summary: 'Form 8829 reports 480 sq ft of exclusive-use home office. Schedule E lists primary residence as 412 sq ft.',
          citation: { pub: 'Pub 587', section: 'Business Use of Your Home — Exclusive Use', anchor: '§2, p. 4' },
          quote: 'To qualify under the regular and exclusive use test, you must use a specific area of your home only for your trade or business.',
        },
      ],
      fairness: {
        demographicParity: 0.94,
        equalOpportunity: 0.91,
        groupRates: [
          { group: 'Age 25–34', flagRate: 0.061, n: 14_220 },
          { group: 'Age 35–44', flagRate: 0.072, n: 18_840 },
          { group: 'Age 45–54', flagRate: 0.064, n: 17_120 },
          { group: 'Age 55–64', flagRate: 0.058, n: 12_440 },
        ],
      },
    },
    {
      id: 'TR-2024-04811',
      taxpayer: 'Sample · M. Okonkwo',
      taxYear: 2024,
      filingStatus: 'MFJ',
      agi: 92_410,
      withheld: 11_120,
      refund: 1_240,
      submitted: '2026-04-11',
      score: 0.62,
      tier: 'Medium',
      tierLabel: 'Medium risk',
      demographics: { ageGroup: '45–54', region: 'Midwest', occupation: 'W-2 + side income' },
    },
    {
      id: 'TR-2024-04809',
      taxpayer: 'Sample · J. Park',
      taxYear: 2024,
      filingStatus: 'Single',
      agi: 56_300,
      withheld: 7_010,
      refund: 980,
      submitted: '2026-04-10',
      score: 0.18,
      tier: 'Low',
      tierLabel: 'Low risk',
      demographics: { ageGroup: '25–34', region: 'West', occupation: 'W-2' },
    },
    {
      id: 'TR-2024-04806',
      taxpayer: 'Sample · D. Vasquez',
      taxYear: 2024,
      filingStatus: 'HoH',
      agi: 138_900,
      withheld: 16_220,
      refund: 4_410,
      submitted: '2026-04-10',
      score: 0.74,
      tier: 'High',
      tierLabel: 'High risk',
      demographics: { ageGroup: '35–44', region: 'South', occupation: 'Self-employed' },
    },
    {
      id: 'TR-2024-04802',
      taxpayer: 'Sample · L. Brennan',
      taxYear: 2024,
      filingStatus: 'MFJ',
      agi: 211_400,
      withheld: 24_900,
      refund: 0,
      submitted: '2026-04-09',
      score: 0.41,
      tier: 'Medium',
      tierLabel: 'Medium risk',
      demographics: { ageGroup: '55–64', region: 'Northeast', occupation: 'W-2' },
    },
    {
      id: 'TR-2024-04798',
      taxpayer: 'Sample · K. Ahmed',
      taxYear: 2024,
      filingStatus: 'Single',
      agi: 71_200,
      withheld: 8_840,
      refund: 312,
      submitted: '2026-04-08',
      score: 0.09,
      tier: 'Low',
      tierLabel: 'Low risk',
      demographics: { ageGroup: '25–34', region: 'West', occupation: 'W-2' },
    },
    {
      id: 'TR-2024-04795',
      taxpayer: 'Sample · R. Calloway',
      taxYear: 2024,
      filingStatus: 'MFS',
      agi: 318_900,
      withheld: 41_120,
      refund: 8_400,
      submitted: '2026-04-08',
      score: 0.83,
      tier: 'High',
      tierLabel: 'High risk',
      demographics: { ageGroup: '45–54', region: 'Northeast', occupation: 'Self-employed' },
    },
    {
      id: 'TR-2024-04790',
      taxpayer: 'Sample · S. Iyer',
      taxYear: 2024,
      filingStatus: 'MFJ',
      agi: 102_400,
      withheld: 12_340,
      refund: 2_140,
      submitted: '2026-04-07',
      score: 0.32,
      tier: 'Low',
      tierLabel: 'Low risk',
      demographics: { ageGroup: '35–44', region: 'South', occupation: 'W-2 + side income' },
    },
  ],

  queueStats: {
    open: 1_284,
    high: 142,
    medium: 388,
    low: 754,
    flaggedToday: 38,
    avgScoreToday: 0.31,
    modelLatencyMs: 142,
    ragLatencyMs: 612,
  },

  scoreHistogram: [310, 220, 168, 124, 96, 78, 64, 52, 40, 28],

  flaggedTrend: [22, 18, 24, 31, 28, 19, 22, 26, 33, 29, 24, 31, 38, 38],
};
