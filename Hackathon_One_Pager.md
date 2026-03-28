# JiloCare PS3: AI-Powered Patient Care Platform
### Hackathon One-Pager

**Team Name:** Alpha Team
**Team Leader:** Vivanshu Chauhan (6395293553)
**Participants:** Vivanshu Chauhan, Sudhanshu Bajpai, Utkarsh Pandey, Yash Aggarwal
**Dedicated Email:** [jhalphateam2026@gmail.com](mailto:jhalphateam2026@gmail.com)
**GitHub Profile:** [https://github.com/AlphaTeam92](https://github.com/AlphaTeam92)
**Selected Problem Statement (PS):** 3

---

### ● About Solution
SME hospitals currently face significant hurdles, including fragmented patient data, a lack of skilled care coordinators, and overwhelming manual administrative follow-ups. Our solution, **JiloCare PS3**, bridges these gaps by deploying a conversational AI platform. It automates multilingual follow-up calls in local dialects, collects unstructured voice interactions, and converts them into structured clinical data points. This radically improves patient care, boosts hospital workforce efficiency, and reduces operational costs.

### ● Different Use of AI
Our platform leverages AI in dual capacities:
1. **API-driven Generative NLP:** We utilize LLM audio-to-text and NLP APIs to facilitate real-time, multilingual conversational voice calls with patients in 22+ native Indian languages.
2. **Fine-Tuned Predictive ML:** We run a custom trained Risk Prediction Machine Learning model (`risk_prediction_model.pkl`) that analyzes structured patient vitals (BMI, Blood Pressure, SpO2, Heart Rate) to automatically stratify patients into low, moderate, and high risk categories.

### ● Technology Stack
- **Frontend:** React.js, Vite, HTML/CSS (Modular component architecture).
- **Data Visualization:** Recharts for dynamic clinical dashboards.
- **Backend & Database:** Supabase (PostgreSQL) handling robust authentication, Real-time RLS (Row Level Security), and scalable data storage.
- **AI/ML Engine:** Python, Django (for the prediction engine routing), scikit-learn.

### ● Backend Logics and Data Structure
The core backend runs on **Supabase** acting as a high-performance PostgreSQL repository. Patient data from health camps flows into the core `jilo_project` relation table. 
The backend securely serves this data to the React frontend utilizing RESTful API endpoints. Incoming voice data is transcribed, structurally mapped via our NLP pipeline into exact database schemas, and continuously passed through our predictive model to update patient risk flags dynamically.

### ● The Solution Economics (Cost and Scalability)
- **Scalability:** By shifting away from hiring multilingual human operators to automated API-driven LLM calls, hospitals scale their patient interactions infinitely without proportionally increasing payrolls. Our serverless architecture scales elastically.
- **Cost Efficiency:** Using open-source technologies (React, PostgreSQL) heavily subsidizes infrastructure costs. API costs for LLM voice processing amount to fractions of a cent per conversation compared to human hourly rates. SME hospitals can rapidly deploy this cloud-driven system for pennies on the dollar versus installing legacy, heavy on-premise EMR servers.

### ● Explain Solution in Workflow
1. **Intake:** Patient health camp basics are uploaded to the dashboard database via structured CSV files or manual entry.
2. **Analysis:** The backend’s ML model scans incoming data and stratifies the population risk (e.g., identifying individuals flagged for hypertension).
3. **Outreach:** The AI engine schedules and dials localized, automated voice calls based on the patient's flagged condition exactly when their medication or follow-up is due.
4. **Insight:** The patient's verbal responses are securely parsed and converted back into structured dashboard insights, giving doctors a live 360-degree view of their population's recovery on varying graphical charts.

### ● Innovation
Instead of forcing SME hospitals into rigid, modern tech interfaces they aren't equipped to handle, our solution works *where the patient is*—their basic phone. We blend cutting-edge predictive risk algorithms with deeply humanizing, multilingual generative voice technology, allowing rural & elderly patients to be continuously monitored without needing smart-device literacy.

### ● Demo URL
*(To be populated prior to submission—e.g., hosted on Vercel/Netlify connected to Supabase).*
