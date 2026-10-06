# ClinShield — Patient-Safety-Aware AI Cyber Defense Platform

## Project Name

**ClinShield — Patient-Safety-Aware AI Cyber Defense Platform**

## Team Name

**MTECH CSE**

## Selected Track

**Hospital Network + Infrastructure**

## Challenge Number & Title

**Challenge 21 — Patient-Safety-Aware Cyber Defense for Hospital Network & Infrastructure**

> **Note:** The official Challenge 21 title provided by the organizers should be used here if their official challenge document uses different wording.

## Problem Statement

Healthcare organizations depend on interconnected digital systems such as Electronic Health Records (EHR), medical imaging systems, laboratory systems, ICU monitoring networks, pharmacy systems, and hospital portals.

A cybersecurity incident affecting these systems can have consequences beyond data loss or service disruption. It can potentially affect the availability of healthcare services and create patient-safety risks.

Traditional cybersecurity monitoring generally focuses on detecting and prioritizing cyber threats. ClinShield extends this approach by connecting a simulated cyber incident with the affected hospital asset and estimating its potential patient-safety impact.

## Proposed Solution

ClinShield is a cybersecurity prototype designed for a **controlled and simulated hospital environment**.

The platform models a synthetic hospital infrastructure and evaluates simulated cyber threats against healthcare assets. It combines cyber-risk assessment with asset criticality and patient-impact information to produce a **Patient Safety Risk Score**.

The platform follows a human-in-the-loop approach:

**Threat Detection → Risk Assessment → Patient Safety Assessment → Human Review → Simulated Response**

ClinShield does not automatically perform consequential clinical actions. A human security analyst remains responsible for reviewing and approving the response.

## Key Features

- Synthetic Hospital Digital Twin
- Hospital infrastructure asset monitoring
- Cyber threat monitoring
- Patient Safety Risk Engine
- Clinical dependency and impact assessment
- Human-in-the-loop security review
- Controlled attack simulation
- Ransomware simulation
- Brute Force simulation
- Data Exfiltration simulation
- Insider Threat simulation
- Unauthorized Access assessment
- Incident management
- Risk prioritization
- Simulated security response
- Security audit-oriented workflow
- Explainable risk factors
- Controlled and safe demonstration environment

## System Architecture

```text
                    ┌──────────────────────────┐
                    │ Synthetic Hospital       │
                    │ Digital Twin             │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Synthetic Cyber Events   │
                    │ / Attack Simulation       │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Threat Assessment         │
                    │ Cyber Risk Evaluation     │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Clinical / Asset Impact   │
                    │ Analysis                  │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Patient Safety Risk       │
                    │ Engine                    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Human Security Review     │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │ Simulated Response &      │
                    │ Audit-Oriented Workflow   │
                    └──────────────────────────┘
```

## How ClinShield Works

### 1. Synthetic Hospital Environment

ClinShield uses simulated hospital assets instead of real hospital infrastructure or patient information.

Example assets include:

- **EHR-01** — Electronic Health Records
- **PACS-01** — Medical Imaging / PACS
- **LAB-01** — Laboratory Information System
- **ICU-01** — ICU Monitoring Network
- **PHARM-01** — Pharmacy Management System
- **PORTAL-01** — Doctor / Patient Portal
- **ADMIN-01** — Hospital Administration

Each asset is associated with characteristics such as:

- Asset criticality
- Data sensitivity
- Patient impact
- Cyber risk

### 2. Cyber Threat Assessment

The attack simulator provides controlled scenarios such as:

- Ransomware
- Brute Force
- Data Exfiltration
- Insider Threat
- Unauthorized Access

Each scenario is assigned a simulated cyber-risk value.

### 3. Patient Safety Risk Engine

ClinShield translates cyber risk into a patient-safety-oriented risk assessment.

The current prototype considers:

- Cyber risk
- Asset criticality
- Potential patient impact

The risk calculation uses weighted factors:

```text
Patient Safety Risk =
    Cyber Risk × 50%
  + Asset Criticality × 25%
  + Patient Impact × 25%
```

The resulting score is categorized into risk levels:

| Risk Score | Level | Response Priority |
|---|---|---|
| 80–100 | Critical | Immediate |
| 60–79 | High | Urgent |
| 40–59 | Moderate | Review |
| Below 40 | Low | Routine |

### 4. Human-in-the-Loop Protection

ClinShield does not autonomously execute consequential actions.

The workflow is:

```text
Alert
  ↓
Risk Assessment
  ↓
Patient Safety Assessment
  ↓
Human Security Review
  ↓
Approve / Reject / Investigate
  ↓
Simulated Response
```

This approach keeps a human security analyst in control of consequential decisions.

## Technology Stack

### Backend

- Python
- FastAPI
- REST API
- Uvicorn

### Frontend

- React
- JavaScript / JSX
- Vite
- Axios
- Lucide React

### Development Environment

- Visual Studio Code
- Git
- GitHub

## Project Structure

```text
ClinShield/
├── backend/
│   ├── main.py
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── docs/
├── tests/
├── public/
├── .env.example
├── .gitignore
├── LICENSE
└── README.md
```

## Setup / Installation

### Prerequisites

Install:

- Python 3.x
- Node.js and npm
- Git

### Backend Setup

Open a terminal in the project directory:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Start the backend:

```bash
uvicorn main:app --reload
```

The API will normally be available at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the URL displayed by Vite in the terminal.

## Usage Instructions

1. Start the FastAPI backend.
2. Start the React frontend.
3. Open the ClinShield dashboard.
4. Review the hospital digital twin.
5. Open **Threat Monitor** to review simulated threats.
6. Open **Patient Safety** to review healthcare impact.
7. Open **Hospital Assets** to inspect synthetic infrastructure.
8. Open **Incidents** to perform human security review.
9. Open **Attack Simulator** to run a controlled attack scenario.
10. Review the resulting cyber risk and patient-safety risk.
11. Use the human review workflow to approve, reject, or investigate the simulated incident.

## Demo Instructions

For a safe demonstration:

### Demonstration Scenario

**Attack:** Ransomware

**Target:** ICU-01 — ICU Monitoring Network

The attack is simulated entirely within the ClinShield environment.

The demonstration shows:

```text
Ransomware Simulation
        ↓
ICU-01 Target
        ↓
Cyber Risk Assessment
        ↓
Patient Safety Risk Assessment
        ↓
Human Security Review
        ↓
Simulated Response
```

The demonstration does not attack or scan real hospital systems, medical devices, or third-party infrastructure.

## Testing & Evaluation

Testing is performed in a controlled local environment using synthetic hospital assets and simulated cybersecurity events.

The prototype has been tested for:

- API availability
- Hospital asset retrieval
- Threat event retrieval
- Patient safety risk calculation
- Attack simulation
- Risk prioritization
- Human review workflow
- Frontend/backend communication
- Simulated ransomware scenario
- Simulated data-exfiltration scenario
- Simulated brute-force scenario

Example controlled scenario:

```text
Attack:
Ransomware

Target:
ICU-01 — ICU Monitoring Network

Cyber Risk:
High

Patient Safety Assessment:
Elevated risk requiring human review
```

The values produced by the current prototype are simulation results and should not be interpreted as real-world clinical or cybersecurity guarantees.

## AI / ML Approach

The current ClinShield prototype primarily uses **rule-based and weighted risk assessment logic** for its patient-safety risk engine and controlled attack simulation.

The current prototype should therefore not be presented as a production machine-learning security detector.

Future versions may incorporate validated machine-learning anomaly detection models for identifying unusual network or system behavior.

Any future AI/ML component would require evaluation for:

- False positives
- False negatives
- Model accuracy
- Dataset quality
- Model limitations
- Explainability
- Human oversight

AI-generated or algorithmic outputs must not be treated as guaranteed clinical or security decisions.

## Security & Privacy

ClinShield follows a controlled demonstration model.

The project uses:

- Synthetic hospital assets
- Simulated cybersecurity events
- Controlled local testing
- No real patient records
- No real hospital infrastructure
- No unauthorized credentials
- No real medical-device attacks

The repository must not contain:

- API keys
- Passwords
- Access tokens
- Database credentials
- Private certificates
- Real `.env` files containing secrets
- Patient information
- Personally identifiable information
- Confidential hospital information
- Private organizational information

Environment-specific secrets, if ever required, should be stored locally and excluded from Git.

## Safety and Ethical Considerations

ClinShield is intended for authorized, controlled, and simulated cybersecurity demonstrations.

The project must not be used to:

- Attack real hospitals
- Access real patient records
- Attack real medical devices
- Disrupt clinical systems
- Scan unauthorized systems
- Exploit third-party infrastructure
- Use unauthorized credentials

The system is designed around human approval for consequential security decisions.

## Limitations

The current prototype has several limitations:

- The hospital environment is simulated.
- Cybersecurity events are simulated.
- Risk scores are designed for demonstration purposes.
- The current risk engine is rule-based rather than a validated clinical or production cybersecurity model.
- Risk scores should not be interpreted as medical or guaranteed security decisions.
- The system has not been validated on live hospital infrastructure.
- Real-world hospital environments contain additional dependencies and operational constraints.
- Future ML-based anomaly detection would require suitable datasets and extensive validation.

## Future Scope

Future development may include:

- Machine-learning-based anomaly detection
- Network traffic anomaly analysis
- SIEM integration
- More detailed clinical dependency mapping
- Real-time security event streaming in authorized environments
- Advanced explainable AI
- Automated security playbook recommendations
- Role-based access control
- More comprehensive audit logging
- Integration with simulated medical-device environments
- Security performance benchmarking

Any future integration with real healthcare infrastructure would require explicit authorization, security validation, privacy controls, and appropriate human oversight.

## Team Members

### MTECH CSE

- **MOHAMMED SUHAIL MK** — Project development, integration, cybersecurity prototype and documentation
- **JASIR R** — Team member
- **ANN MARIA JOSEPH** — Team member
- **MISBA BANU P** — Team member

Individual contribution descriptions can be refined before final submission based on the actual work performed by each member.

## Third-Party Components

ClinShield uses open-source software components including:

- Python
- FastAPI
- Uvicorn
- React
- Vite
- Axios
- Lucide React
- Node.js / npm

Each component remains subject to its respective open-source license.

No proprietary patient data or confidential hospital data is included in the project.

## License

This project is intended to be released as open-source software under the **MIT License**.

A `LICENSE` file will be included in the repository.

## Final Submission Information

**Team:** MTECH CSE

**Challenge:** 21

**Track:** Hospital Network + Infrastructure

**Repository:**  
`https://github.com/mohammedsuhailmk/ClinShield`

**Final Commit / Tag / Release:** To be identified before submission.

**Official KMCT Centre of Excellence GitHub Collaborator:** To be added using the official handle provided by the organizers.

## Disclaimer

ClinShield is a cybersecurity research and hackathon prototype designed for controlled and simulated environments.

It does not provide guaranteed cybersecurity protection, medical diagnosis, clinical decision-making, or autonomous clinical response.

All demonstrations should be performed using synthetic data and authorized environments with appropriate human oversight.
