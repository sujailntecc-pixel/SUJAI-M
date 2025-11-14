export interface TamilTranslation {
  plant_name: string;
  health_condition: string;
  future_outlook: string;
  advanced_disadvantages: string[];
  health_tips: string[];
  botanical_information: string;
  accuracy_report: string;
  botany_reaction_report: string;
}

export interface AnalysisResultData {
  plant_name: string;
  health_condition: string;
  future_outlook: string;
  advanced_disadvantages: string[];
  health_tips: string[];
  botanical_information: string;
  accuracy_report: string;
  botany_reaction_report: string;
  tamil_translation: TamilTranslation;
}