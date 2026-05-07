// Privacy posture: 100% synthetic, no real PII.
// Trust boundary: deterministic builder for synthetic fairness labels.
// Data handled: categorical fairness metadata only (explicitly synthetic enums).
import { faker } from '@faker-js/faker';
import {
  FAIRNESS_AGE_GROUPS,
  FAIRNESS_ETHNICITY_COHORTS,
  FAIRNESS_GENDER_CATEGORIES,
  FairnessMetadataSchema,
  type FairnessMetadata,
} from '@irs/shared';

export function buildFairnessMetadata(): FairnessMetadata {
  return FairnessMetadataSchema.parse({
    ageGroup: faker.helpers.arrayElement([...FAIRNESS_AGE_GROUPS]),
    gender: faker.helpers.arrayElement([...FAIRNESS_GENDER_CATEGORIES]),
    ethnicity: faker.helpers.arrayElement([...FAIRNESS_ETHNICITY_COHORTS]),
  });
}
