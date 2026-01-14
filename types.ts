
export interface MathBranch {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export enum MathTopic {
  ALGEBRA = 'الجبر',
  GEOMETRY = 'الهندسة',
  CALCULUS = 'التفاضل والتكامل',
  STATISTICS = 'الإحصاء',
  TRIGONOMETRY = 'حساب المثلثات'
}
