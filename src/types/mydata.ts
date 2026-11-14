export type SectionId = 'home' | 'rights' | 'steps' | 'authorities' | 'assistant';

export interface LegalNorm {
  id: string;
  code: string;
  actName: string;
  article: string;
  summary: string;
  relevanceForStudent: string;
  officialUrl: string;
  sourceLabel: string;
}

export interface DataCategoryItem {
  id: 'general' | 'biometric' | 'access';
  title: string;
  articleRef: string;
  definition: string;
  studentExamples: string[];
  keyRule: string;
}

export interface CitizenRightItem {
  number: string;
  title: string;
  legalBasis: string;
  plainExplanation: string;
}

export interface TypicalSituation {
  id: string;
  index: string;
  category: string;
  title: string;
  description: string;
  relevantLaw: string;
  presetAnswers: Partial<AssistantAnswers>;
}

export interface ActionStep {
  number: string;
  title: string;
  subtitle: string;
  details: string[];
  tip: string;
  templateText?: string;
}

export interface AuthorityResource {
  id: string;
  category: 'state' | 'legal' | 'emergency';
  categoryLabel: string;
  name: string;
  shortRole: string;
  whenToContact: string;
  howToSubmit: string[];
  officialUrl: string;
  urlLabel: string;
  hotline?: string;
}

export type DataTypeOption = 'photo_video' | 'contacts_docs' | 'private_life' | 'fake_profile';
export type PlatformOption = 'social_network' | 'messenger_chat' | 'website_portal' | 'unknown_forwarding';
export type ConsentOption = 'no_consent' | 'withdraw_consent' | 'uncertain_public' | 'leak_or_hack';
export type ResolutionOption = 'not_contacted' | 'refused_or_ignored' | 'cannot_contact_threat' | 'deleted_copies_remain';

export interface AssistantAnswers {
  dataType: DataTypeOption | '';
  platform: PlatformOption | '';
  consent: ConsentOption | '';
  resolution: ResolutionOption | '';
}

export interface AssistantQuestionOption<T extends string> {
  value: T;
  label: string;
  hint: string;
}

export interface AssistantQuestion<T extends string> {
  key: keyof AssistantAnswers;
  stepNumber: string;
  title: string;
  subtitle: string;
  options: AssistantQuestionOption<T>[];
}

export interface ScenarioStep {
  order: string;
  title: string;
  description: string;
}

export interface AssistantRecommendation {
  urgencyLabel: string;
  urgencyLevel: 'standard' | 'elevated' | 'urgent';
  headline: string;
  summary: string;
  steps: ScenarioStep[];
  legalRefs: {
    title: string;
    note: string;
    url: string;
  }[];
  recommendedChannels: {
    name: string;
    reason: string;
    targetSection?: SectionId;
    externalUrl?: string;
  }[];
  precautions: string[];
}
