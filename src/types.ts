export interface HardwareComponent {
  id: string;
  name: string;
  description: string;
  specs?: string[];
  iconName: string;
}

export interface FlowStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface TimelineEvent {
  phase: string;
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image?: string;
}

export interface LearningOutcome {
  title: string;
  description: string;
  category: string;
}

export interface FutureScopeItem {
  title: string;
  description: string;
  iconName: string;
}
