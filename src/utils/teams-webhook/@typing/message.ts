export interface DefaultMessage {
  type: string;
  themeColor?: string;
  title: string;
  text: string;
};

interface Fact {
  name: string;
  value: string;
};

interface Section {
  activityTitle: string;
  activitySubtitle: string;
  markdown: boolean;
  facts: Fact[];
};

export interface ErrorMessage {
  type: string;
  themeColor?: string;
  title: string;
  text: string;
  message?: string;
  sections: Section[];
};