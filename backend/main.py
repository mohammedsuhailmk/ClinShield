from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ClinShield API",
    description="Patient-Safety-Aware AI Cyber Defense Platform",
    version="0.1.0",
)

# Allow the React frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "status": "online",
        "service": "ClinShield API",
        "mode": "simulation",
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "system": "ClinShield",
        "simulation_mode": True,
    }
# ---------------------------------------------------------
# SYNTHETIC HOSPITAL ASSETS
# ---------------------------------------------------------

hospital_assets = [
    {
        "id": "EHR-01",
        "name": "Electronic Health Records",
        "type": "Clinical System",
        "criticality": "Critical",
        "status": "Protected",
        "patient_impact": "Very High",
    },
    {
        "id": "PACS-01",
        "name": "Medical Imaging / PACS",
        "type": "Clinical System",
        "criticality": "High",
        "status": "Protected",
        "patient_impact": "High",
    },
    {
        "id": "LAB-01",
        "name": "Laboratory Information System",
        "type": "Clinical System",
        "criticality": "High",
        "status": "Protected",
        "patient_impact": "High",
    },
    {
        "id": "ICU-01",
        "name": "ICU Monitoring Network",
        "type": "Medical Infrastructure",
        "criticality": "Critical",
        "status": "Protected",
        "patient_impact": "Very High",
    },
    {
        "id": "PHARM-01",
        "name": "Pharmacy Management System",
        "type": "Clinical System",
        "criticality": "High",
        "status": "Protected",
        "patient_impact": "High",
    },
    {
        "id": "PORTAL-01",
        "name": "Doctor / Patient Portal",
        "type": "Application",
        "criticality": "Medium",
        "status": "Protected",
        "patient_impact": "Medium",
    },
    {
        "id": "ADMIN-01",
        "name": "Hospital Administration",
        "type": "Business System",
        "criticality": "Medium",
        "status": "Monitored",
        "patient_impact": "Low",
    },
]


@app.get("/api/assets")
def get_assets():
    return {
        "total_assets": len(hospital_assets),
        "protected_assets": sum(
            1 for asset in hospital_assets
            if asset["status"] == "Protected"
        ),
        "assets": hospital_assets,
    }

@app.get("/api/threats")
def get_threats():
    return {
        "active_threats": 7,
        "critical": 2,
        "high": 3,
        "medium": 2
    }

@app.get("/api/risk")
def get_risk():
    return {
        "cyber_risk": 68,
        "patient_safety_risk": 42
    }

@app.get("/api/threat-events")
def get_threat_events():
    return {
        "events": [
            {
                "id": "THR-001",
                "type": "Brute Force",
                "source": "Admin Portal",
                "severity": "High",
                "cyber_risk": 82,
                "patient_impact": "Medium",
                "status": "Under Review"
            },
            {
                "id": "THR-002",
                "type": "Data Exfiltration",
                "source": "EHR System",
                "severity": "Critical",
                "cyber_risk": 94,
                "patient_impact": "Very High",
                "status": "Escalated"
            },
            {
                "id": "THR-003",
                "type": "Ransomware",
                "source": "Laboratory System",
                "severity": "Critical",
                "cyber_risk": 91,
                "patient_impact": "High",
                "status": "Under Review"
            },
            {
                "id": "THR-004",
                "type": "Unauthorized Access",
                "source": "Doctor Portal",
                "severity": "Medium",
                "cyber_risk": 64,
                "patient_impact": "Low",
                "status": "Monitoring"
            },
            {
                "id": "THR-005",
                "type": "Insider Threat",
                "source": "Pharmacy System",
                "severity": "High",
                "cyber_risk": 78,
                "patient_impact": "High",
                "status": "Under Review"
            }
        ]
    }

# ---------------------------------------------------------
# PATIENT SAFETY RISK
# ---------------------------------------------------------

@app.get("/api/patient-safety")
def get_patient_safety():
    return {
        "overall_risk": 42,
        "risk_level": "Moderate",
        "clinical_availability": "Low",
        "human_review_required": True,

        "clinical_services": [
            {
                "asset": "EHR-01",
                "service": "Electronic Health Records",
                "impact": "Very High",
                "risk": 78,
                "reason": "Disruption may delay access to patient records."
            },
            {
                "asset": "ICU-01",
                "service": "ICU Monitoring Network",
                "impact": "Very High",
                "risk": 86,
                "reason": "Disruption may affect continuous clinical monitoring."
            },
            {
                "asset": "LAB-01",
                "service": "Laboratory Information System",
                "impact": "High",
                "risk": 71,
                "reason": "Disruption may delay diagnostic results."
            },
            {
                "asset": "PHARM-01",
                "service": "Pharmacy Management System",
                "impact": "High",
                "risk": 64,
                "reason": "Disruption may delay medication workflow."
            }
        ]
    }

# ---------------------------------------------------------
# PATIENT SAFETY RISK ENGINE
# ---------------------------------------------------------

def calculate_patient_safety_risk(
    cyber_risk: int,
    asset_criticality: str,
    patient_impact: str,
):
    """
    Convert cyber risk into patient-safety risk.

    This is a simulation model using synthetic hospital data.
    It does not make clinical decisions.
    """

    criticality_weights = {
        "Critical": 1.00,
        "High": 0.85,
        "Medium": 0.60,
        "Low": 0.35,
    }

    impact_weights = {
        "Very High": 1.00,
        "High": 0.85,
        "Medium": 0.60,
        "Low": 0.35,
    }

    criticality_score = criticality_weights.get(
        asset_criticality,
        0.60
    )

    impact_score = impact_weights.get(
        patient_impact,
        0.60
    )

    # Weighted patient-safety calculation
    safety_risk = (
        (cyber_risk * 0.50)
        + (criticality_score * 100 * 0.25)
        + (impact_score * 100 * 0.25)
    )

    safety_risk = round(min(max(safety_risk, 0), 100))

    if safety_risk >= 80:
        risk_level = "Critical"
        review_priority = "Immediate"
    elif safety_risk >= 60:
        risk_level = "High"
        review_priority = "Urgent"
    elif safety_risk >= 40:
        risk_level = "Moderate"
        review_priority = "Review"
    else:
        risk_level = "Low"
        review_priority = "Routine"

    return {
        "patient_safety_risk": safety_risk,
        "risk_level": risk_level,
        "review_priority": review_priority,
        "human_review_required": safety_risk >= 40,
    }


@app.get("/api/calculate-risk")
def calculate_risk_demo(
    cyber_risk: int = 85,
    asset_criticality: str = "Critical",
    patient_impact: str = "Very High",
):
    """
    Demonstration endpoint for the ClinShield
    Patient Safety Risk Engine.
    """

    result = calculate_patient_safety_risk(
        cyber_risk=cyber_risk,
        asset_criticality=asset_criticality,
        patient_impact=patient_impact,
    )

    return {
        "simulation_mode": True,
        "input": {
            "cyber_risk": cyber_risk,
            "asset_criticality": asset_criticality,
            "patient_impact": patient_impact,
        },
        "assessment": result,
    }

# ---------------------------------------------------------
# ATTACK SIMULATOR
# ---------------------------------------------------------

attack_profiles = {
    "Brute Force": {
        "base_risk": 65,
        "description": "Simulated repeated authentication attempts.",
    },
    "Ransomware": {
        "base_risk": 88,
        "description": "Simulated encryption/disruption of a clinical service.",
    },
    "Data Exfiltration": {
        "base_risk": 82,
        "description": "Simulated unauthorized transfer of sensitive healthcare data.",
    },
    "Insider Threat": {
        "base_risk": 74,
        "description": "Simulated misuse of authorized access.",
    },
    "Unauthorized Access": {
        "base_risk": 60,
        "description": "Simulated unauthorized access to a hospital system.",
    },
}


@app.get("/api/attack-simulator")
def attack_simulator(
    attack_type: str = "Ransomware",
    asset_id: str = "ICU-01",
):
    # Find the selected synthetic hospital asset
    asset = next(
        (item for item in hospital_assets if item["id"] == asset_id),
        None
    )

    if asset is None:
        return {
            "success": False,
            "error": "Unknown synthetic hospital asset."
        }

    # Find attack profile
    attack = attack_profiles.get(attack_type)

    if attack is None:
        return {
            "success": False,
            "error": "Unknown simulated attack type."
        }

    cyber_risk = attack["base_risk"]

    # Small adjustment based on asset criticality
    if asset["criticality"] == "Critical":
        cyber_risk += 5
    elif asset["criticality"] == "High":
        cyber_risk += 2

    cyber_risk = min(cyber_risk, 100)

    # Calculate patient safety risk
    safety_result = calculate_patient_safety_risk(
        cyber_risk=cyber_risk,
        asset_criticality=asset["criticality"],
        patient_impact=asset["patient_impact"],
    )

    return {
        "success": True,
        "simulation_mode": True,

        "attack": {
            "type": attack_type,
            "description": attack["description"],
        },

        "target": {
            "id": asset["id"],
            "name": asset["name"],
            "type": asset["type"],
            "criticality": asset["criticality"],
            "patient_impact": asset["patient_impact"],
        },

        "cyber_assessment": {
            "cyber_risk": cyber_risk,
        },

        "patient_safety_assessment": safety_result,

        "recommended_action": (
            "Immediate human review required."
            if safety_result["review_priority"] == "Immediate"
            else "Security analyst review recommended."
        ),
    }