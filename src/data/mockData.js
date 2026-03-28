// Comprehensive Clinical Mock Dataset

export const patients = [
  {
    id: 1, name: 'Priya Sharma', age: 45, health_center: 'Gandhi Memorial',
    systolic_bp: 124, diastolic_bp: 83, heart_rate: 88, respiratory_rate: 20, oxygen_sat: 99,
    temperature: 98.6, blood_gluc: 116, height: 160, weight: 70, bmi: 27.3,
    waist_circ: 85, perfusion_index: 5.1, waist_to_height_ratio: 0.53, bmi_categ: 'Overweight',
    heart_risk: 'Moderate', diabetic_risk: 'Moderate', hypertension_risk: 'Moderate', overall_risk: 'Moderate',
    chest_discomfort: 'none', breathlessness: 'none', palpitation: 'none', fatigue: 'occasional',
    dizziness: 'never', sleep_duration: '5-6.5', stress_level: 'calm', physical_activity: 'active',
    diet_quality: 'balanced', family_history: 'none', avatar: 'PS', color: '#fcc419', updated_at: '2026-03-28 10:15',
  },
  {
    id: 2, name: 'Rajesh Kumar', age: 58, health_center: 'Disha Health Clinic',
    systolic_bp: 139, diastolic_bp: 89, heart_rate: 90, respiratory_rate: 22, oxygen_sat: 97,
    temperature: 98.8, blood_gluc: 145, height: 172, weight: 85, bmi: 28.7,
    waist_circ: 95, perfusion_index: 4.2, waist_to_height_ratio: 0.55, bmi_categ: 'Overweight',
    heart_risk: 'High', diabetic_risk: 'High', hypertension_risk: 'High', overall_risk: 'High',
    chest_discomfort: 'occasional', breathlessness: 'mild', palpitation: 'occasional', fatigue: 'daily',
    dizziness: 'rare', sleep_duration: '<5', stress_level: 'chronic', physical_activity: 'sedentary',
    diet_quality: 'moderate', family_history: 'multiple', avatar: 'RK', color: '#ff6b6b', updated_at: '2026-03-28 09:45',
  },
  {
    id: 3, name: 'Anita Devi', age: 34, health_center: 'Jilo Health Center',
    systolic_bp: 112, diastolic_bp: 72, heart_rate: 76, respiratory_rate: 18, oxygen_sat: 99,
    temperature: 98.4, blood_gluc: 95, height: 155, weight: 55, bmi: 22.9,
    waist_circ: 72, perfusion_index: 6.8, waist_to_height_ratio: 0.46, bmi_categ: 'Normal',
    heart_risk: 'Low', diabetic_risk: 'Low', hypertension_risk: 'Low', overall_risk: 'Low',
    chest_discomfort: 'none', breathlessness: 'none', palpitation: 'none', fatigue: 'never',
    dizziness: 'never', sleep_duration: '>7', stress_level: 'calm', physical_activity: 'active',
    diet_quality: 'balanced', family_history: 'none', avatar: 'AD', color: '#20c997', updated_at: '2026-03-28 11:20',
  },
  {
    id: 4, name: 'Mohammad Ismail', age: 67, health_center: 'Gandhi Memorial',
    systolic_bp: 148, diastolic_bp: 92, heart_rate: 102, respiratory_rate: 26, oxygen_sat: 94,
    temperature: 99.1, blood_gluc: 160, height: 168, weight: 92, bmi: 32.6,
    waist_circ: 105, perfusion_index: 3.1, waist_to_height_ratio: 0.62, bmi_categ: 'Obese',
    heart_risk: 'High', diabetic_risk: 'Moderate', hypertension_risk: 'High', overall_risk: 'High',
    chest_discomfort: 'heavy', breathlessness: 'rest', palpitation: 'frequent', fatigue: 'daily',
    dizziness: 'occasional', sleep_duration: '<5', stress_level: 'chronic', physical_activity: 'sedentary',
    diet_quality: 'poor', family_history: 'one', avatar: 'MI', color: '#ff6b6b', updated_at: '2026-03-27 16:30',
  },
  {
    id: 5, name: 'Lakshmi Narayan', age: 52, health_center: 'Disha Health Clinic',
    systolic_bp: 128, diastolic_bp: 82, heart_rate: 85, respiratory_rate: 20, oxygen_sat: 98,
    temperature: 98.6, blood_gluc: 125, height: 165, weight: 78, bmi: 28.6,
    waist_circ: 88, perfusion_index: 4.5, waist_to_height_ratio: 0.53, bmi_categ: 'Overweight',
    heart_risk: 'Moderate', diabetic_risk: 'Moderate', hypertension_risk: 'Low', overall_risk: 'Moderate',
    chest_discomfort: 'none', breathlessness: 'none', palpitation: 'rare', fatigue: 'occasional',
    dizziness: 'rare', sleep_duration: '5-6.5', stress_level: 'moderate', physical_activity: 'light',
    diet_quality: 'balanced', family_history: 'one', avatar: 'LN', color: '#fcc419', updated_at: '2026-03-27 14:15',
  },
];

export const dashboardClinicalStats = {
  totalPatients: '8', 
  avgOverallRisk: 'Moderate',
  avgBMI: '27.7',
  highRiskCount: '3',
  avgHeartRate: '87 bpm',
  avgBloodGluc: '123 mg/dL',
  avgSpO2: '97.4%',
  avgBP: '133/85',
};

export const riskDistribution = [
  { name: 'Low Risk', value: 2, color: '#20c997' },
  { name: 'Moderate Risk', value: 3, color: '#fcc419' },
  { name: 'High Risk', value: 3, color: '#ff6b6b' },
];

export const bmiDistribution = [
  { category: 'Underweight', value: 0 },
  { category: 'Normal', value: 2 },
  { category: 'Overweight', value: 4 },
  { category: 'Obese', value: 2 },
];

// Fallback dummy exports so the other pages don't crash
export const healthCenterStats = [
  { name: 'Gandhi Memorial', patients: 3, highRisk: 2, avgBMI: 30.3 },
  { name: 'Disha Health', patients: 3, highRisk: 1, avgBMI: 28.1 },
  { name: 'Jilo Center', patients: 2, highRisk: 0, avgBMI: 23.2 },
];

export const recentPatients = patients;
export const dashboardStats = [];
export const callLogs = [];
export const languageStats = [];
export const weeklyCallData = [];
export const monthlyTrendData = [];
export const supportedLanguages = [];
export const workflowTemplates = [];
export const campaigns = [];

export const alerts = [
  { id: 1, type: 'critical', title: 'High Overall Risk Alert', message: 'Mohammad Ismail showing high SpO2 drop (94%)', time: '15 min ago', read: false },
  { id: 2, type: 'warning', title: 'Elevated Blood Pressure', message: 'Deepak Verma reported BP 155/95.', time: '1 hour ago', read: false },
];
