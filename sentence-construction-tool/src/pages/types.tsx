export interface Question {
    id: number;
    sentence: string; // e.g., "The ___ fox ___ over the ___ dog."
    blanks: number;
    options: string[];
    answer: string[];
  }
  