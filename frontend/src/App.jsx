import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Cpu,
  Database,
  FileWarning,
  Hospital,
  LayoutDashboard,
  Lock,
  Menu,
  Network,
  Radio,
  Search,
  Shield,
  ShieldCheck,
  Siren,
  UserCheck,
  Users,
  X,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const trafficData = [
  { time: '08:00', threats: 12, events: 38 },
  { time: '09:00', threats: 18, events: 52 },
  { time: '10:00', threats: 14, events: 46 },
  { time: '11:00', threats: 27, events: 71 },
  { time: '12:00', threats: 21, events: 63 },
  { time: '13:00', threats: 34, events: 88 },
  { time: '14:00', threats: 26, events: 74 },
]

const incidents = [
  {
    name: 'Suspicious EHR Login',
    asset: 'EHR System',
    type: 'Brute Force',
    severity: 'High',
    time: '2 min ago',
  },
  {
    name: 'Unusual PACS Traffic',
    asset: 'PACS Server',
    type: 'Anomaly',
    severity: 'Medium',
    time: '8 min ago',
  },
  {
    name: 'Large Data Transfer',
    asset: 'Lab Database',
    type: 'Exfiltration',
    severity: 'Critical',
    time: '14 min ago',
  },
  {
    name: 'Admin Credential Alert',
    asset: 'Admin Portal',
    type: 'Identity',
    severity: 'High',
    time: '21 min ago',
  },
]

const assets = [
  { name: 'EHR System', type: 'Clinical', status: 'Protected', risk: 24, icon: Database },
  { name: 'PACS Server', type: 'Imaging', status: 'Protected', risk: 31, icon: Network },
  { name: 'ICU Monitoring', type: 'Patient Safety', status: 'Protected', risk: 18, icon: Activity },
  { name: 'Pharmacy System', type: 'Clinical', status: 'Protected', risk: 27, icon: ShieldCheck },
  { name: 'Lab Database', type: 'Diagnostics', status: 'Review', risk: 67, icon: Database },
  { name: 'Doctor Portal', type: 'Identity', status: 'Protected', risk: 22, icon: UserCheck },
]

function App() {
  const [assetData, setAssetData] = useState(null)
  const [threatData, setThreatData] = useState(null)
  const [riskData, setRiskData] = useState(null)
  const [threatEvents, setThreatEvents] = useState([])
  const [patientSafetyData, setPatientSafetyData] = useState([])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/assets')
      .then((response) => {
        setAssetData(response.data)
      })
      .catch((error) => {
        console.error('Failed to load assets:', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/threats')
      .then((response) => {
        setThreatData(response.data)
      })
      .catch((error) => {
        console.error('Failed to load threats:', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/risk')
      .then((response) => {
        setRiskData(response.data)
      })
      .catch((error) => {
        console.error('Failed to load risk data:', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/threat-events')
      .then((response) => {
        setThreatEvents(response.data.events)
      })
      .catch((error) => {
        console.error('Failed to load threat events:', error)
      })
  }, [])

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/patient-safety')
      .then((response) => {
        setPatientSafetyData(response.data.clinical_services || [])
      })
      .catch((error) => {
        console.error('Failed to load patient safety data:', error)
        setPatientSafetyData([])
      })
  }, [])


  const [apiStatus, setApiStatus] = useState('Checking...')

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/health')
      .then((response) => {
        setApiStatus(response.data.status)
      })
      .catch(() => {
        setApiStatus('Offline')
      })
  }, [])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activePage, setActivePage] = useState('Overview')

  const [decisions, setDecisions] = useState({})

  const handleDecision = (incidentId, decision) => {
    setDecisions((previous) => ({
      ...previous,
      [incidentId]: decision,
    }))
  }

  const navItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Threat Monitor', icon: Radio },
    { name: 'Patient Safety', icon: Siren },
    { name: 'Hospital Assets', icon: Hospital },
    { name: 'Incidents', icon: FileWarning },
    { name: 'Attack Simulator', icon: Zap },
  ]

  return (
    <div className="min-h-screen bg-[#060b14] text-slate-100">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-[#09111d] transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 ring-1 ring-cyan-400/20">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">ClinShield</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Cyber Defense
              </p>
            </div>
          </div>

          <button
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Security Operations
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = activePage === item.name

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActivePage(item.name)
                    setMobileOpen(false)
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    active
                      ? 'bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>

                  {item.name === 'Incidents' && (
                    <span className="ml-auto rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-semibold text-red-400">
                      4
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-xs font-semibold text-emerald-300">
                Defense Engine Online
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
              Monitoring synthetic hospital telemetry in simulation mode.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800">
              <Users size={17} className="text-slate-400" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs font-medium">Security Analyst</p>
              <p className="text-[10px] text-slate-500">Human Review Required</p>
            </div>

            <Lock size={14} className="ml-auto text-slate-600" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="min-h-screen lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#060b14]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2 text-slate-400 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">{activePage}</h2>
                <span className="hidden rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cyan-400 sm:inline">
                  Live
                </span>
              </div>

              <p className="hidden text-xs text-slate-500 sm:block">
                Hospital Cybersecurity Operations Center
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 md:flex">
              <Search size={15} className="text-slate-500" />
              <span className="text-xs text-slate-500">Search events...</span>
              <kbd className="rounded bg-white/5 px-1.5 py-0.5 text-[9px] text-slate-600">
                /
              </kbd>
            </div>

            <button className="relative rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-slate-400 hover:text-white">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-400" />
            </button>

            <div className="hidden h-9 w-px bg-white/10 sm:block" />

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/20 text-xs font-bold text-cyan-300 ring-1 ring-cyan-400/20">
              SA
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          {activePage !== 'Overview' ? (
          <div className="flex min-h-[500px] items-center justify-center">
            <div className="w-full">

              {activePage === 'Threat Monitor' ? (
                <div className="space-y-6">

                  {/* Threat Monitor Header */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                        <span>Security Operations</span>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">Threat Monitor</span>
                      </div>

                      <h2 className="text-3xl font-bold tracking-tight">
                        Threat Monitor
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Real-time monitoring of simulated hospital cyber threats.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-50" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      </span>

                      <span className="text-xs font-semibold text-cyan-300">
                        LIVE MONITORING
                      </span>
                    </div>
                  </div>

                  {/* Threat Summary */}
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-2xl border border-white/10 bg-[#0a121f] p-5">
                      <p className="text-xs text-slate-500">
                        Total Events
                      </p>

                      <p className="mt-2 text-3xl font-bold">
                        {threatEvents.length}
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Detected security events
                      </p>
                    </div>

                    <div className="rounded-2xl border border-red-400/10 bg-red-400/5 p-5">
                      <p className="text-xs text-slate-500">
                        Critical Threats
                      </p>

                      <p className="mt-2 text-3xl font-bold text-red-400">
                        {threatEvents.filter(
                          (event) => event.severity === 'Critical'
                        ).length}
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Requires immediate review
                      </p>
                    </div>

                    <div className="rounded-2xl border border-orange-400/10 bg-orange-400/5 p-5">
                      <p className="text-xs text-slate-500">
                        High Severity
                      </p>

                      <p className="mt-2 text-3xl font-bold text-orange-400">
                        {threatEvents.filter(
                          (event) => event.severity === 'High'
                        ).length}
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Elevated cyber risk
                      </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5">
                      <p className="text-xs text-slate-500">
                        Under Review
                      </p>

                      <p className="mt-2 text-3xl font-bold text-cyan-400">
                        {threatEvents.filter(
                          (event) => !decisions[event.id] &&
                          (event.status === 'Under Review' || event.status === 'Escalated')
                        ).length}
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Human review required
                      </p>
                    </div>

                  </div>

                  {/* Threat Events Table */}
                  <div className="rounded-2xl border border-white/10 bg-[#0a121f]">

                    <div className="flex flex-col justify-between gap-3 border-b border-white/5 p-5 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="font-semibold">
                          Detected Threat Events
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Synthetic hospital telemetry from the defense engine.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                        <Search size={14} className="text-slate-500" />

                        <span className="text-xs text-slate-500">
                          Monitoring all assets
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">

                      <table className="w-full min-w-[800px] text-left">

                        <thead>
                          <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-600">
                            <th className="px-5 py-4">Threat</th>
                            <th className="px-5 py-4">Source</th>
                            <th className="px-5 py-4">Severity</th>
                            <th className="px-5 py-4">Cyber Risk</th>
                            <th className="px-5 py-4">Patient Impact</th>
                            <th className="px-5 py-4">Status</th>
                          </tr>
                        </thead>

                        <tbody>

                          {threatEvents.map((event) => (

                            <tr
                              key={event.id}
                              className="border-b border-white/5 transition hover:bg-white/[0.02]"
                            >

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">

                                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-400/10">
                                    <AlertTriangle
                                      size={16}
                                      className="text-red-400"
                                    />
                                  </div>

                                  <div>
                                    <p className="text-sm font-medium">
                                      {event.type}
                                    </p>

                                    <p className="text-[10px] text-slate-600">
                                      {event.id}
                                    </p>
                                  </div>

                                </div>
                              </td>

                              <td className="px-5 py-4 text-xs text-slate-400">
                                {event.source}
                              </td>

                              <td className="px-5 py-4">

                                <span
                                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                    event.severity === 'Critical'
                                      ? 'bg-red-400/10 text-red-400'
                                      : event.severity === 'High'
                                        ? 'bg-orange-400/10 text-orange-400'
                                        : 'bg-amber-400/10 text-amber-400'
                                  }`}
                                >
                                  {event.severity}
                                </span>

                              </td>

                              <td className="px-5 py-4">

                                <div className="flex items-center gap-2">

                                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5">
                                    <div
                                      className="h-full rounded-full bg-cyan-400"
                                      style={{
                                        width: `${event.cyber_risk}%`,
                                      }}
                                    />
                                  </div>

                                  <span className="text-xs font-semibold">
                                    {event.cyber_risk}
                                  </span>

                                </div>

                              </td>

                              <td className="px-5 py-4 text-xs text-slate-400">
                                {event.patient_impact}
                              </td>

                              <td className="px-5 py-4">

                                <span className="flex items-center gap-2 text-xs">

                                  <CheckCircle2
                                    size={14}
                                    className={
                                      event.status === 'Escalated'
                                        ? 'text-red-400'
                                        : 'text-cyan-400'
                                    }
                                  />

                                  {decisions[event.id] || event.status}

                                </span>

                              </td>

                            </tr>

                          ))}

                        </tbody>

                      </table>

                    </div>

                  </div>

                </div>

              ) : activePage === 'Patient Safety' ? (

                <div className="space-y-6">

                  {/* Patient Safety Header */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                        <span>Security Operations</span>
                        <ChevronRight size={12} />
                        <span className="text-slate-300">Patient Safety</span>
                      </div>

                      <h2 className="text-3xl font-bold tracking-tight">
                        Patient Safety Center
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Cybersecurity events translated into potential clinical impact.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-2">
                      <Siren size={16} className="text-amber-400" />
                      <span className="text-xs font-semibold text-amber-300">
                        SAFETY MONITORING
                      </span>
                    </div>
                  </div>

                  {/* Safety Summary */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <div className="rounded-2xl border border-red-400/10 bg-red-400/5 p-5">
                      <p className="text-xs text-slate-500">
                        High Impact Assets
                      </p>

                      <p className="mt-2 text-3xl font-bold text-red-400">
                        {
                          patientSafetyData.filter(
                            (item) =>
                              item.impact === 'Very High' ||
                              item.impact === 'High' ||
                              item.patient_impact === 'Very High' ||
                              item.patient_impact === 'High'
                          ).length
                        }
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Requires safety attention
                      </p>
                    </div>

                    <div className="rounded-2xl border border-amber-400/10 bg-amber-400/5 p-5">
                      <p className="text-xs text-slate-500">
                        Safety Risk
                      </p>

                      <p className="mt-2 text-3xl font-bold text-amber-400">
                        {riskData?.patient_safety_risk ?? 42}
                        <span className="ml-1 text-xs text-slate-600">/100</span>
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Current patient safety score
                      </p>
                    </div>

                    <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5">
                      <p className="text-xs text-slate-500">
                        Monitored Services
                      </p>

                      <p className="mt-2 text-3xl font-bold text-cyan-400">
                        {patientSafetyData.length}
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Synthetic clinical services
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">
                      <p className="text-xs text-slate-500">
                        Human Oversight
                      </p>

                      <p className="mt-2 text-3xl font-bold text-emerald-400">
                        ON
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        Analyst approval required
                      </p>
                    </div>

                  </div>

                  {/* Risk explanation */}
                  <section className="rounded-2xl border border-white/10 bg-[#0a121f] p-5">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/10">
                        <Siren size={20} className="text-amber-400" />
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          Clinical Impact Assessment
                        </h3>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          ClinShield evaluates whether a cybersecurity incident could
                          disrupt clinical availability, expose patient information,
                          delay diagnosis, or affect critical care services.
                        </p>
                      </div>

                    </div>

                  </section>

                  {/* Clinical Services */}
                  <section className="rounded-2xl border border-white/10 bg-[#0a121f]">

                    <div className="border-b border-white/5 p-5">

                      <div className="flex items-center justify-between">

                        <div>
                          <h3 className="font-semibold">
                            Clinical Safety Assessment
                          </h3>

                          <p className="mt-1 text-xs text-slate-500">
                            Synthetic hospital services and their potential patient impact.
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-400">
                          SIMULATION
                        </span>

                      </div>

                    </div>

                    <div className="overflow-x-auto">

                      <table className="w-full min-w-[800px] text-left">

                        <thead>
                          <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider text-slate-600">

                            <th className="px-5 py-4">
                              Clinical Asset
                            </th>

                            <th className="px-5 py-4">
                              Service
                            </th>

                            <th className="px-5 py-4">
                              Impact
                            </th>

                            <th className="px-5 py-4">
                              Risk
                            </th>

                            <th className="px-5 py-4">
                              Safety Reason
                            </th>

                          </tr>
                        </thead>

                        <tbody>

                          {patientSafetyData.map((item, index) => {

                            const impact =
                              item.impact ||
                              item.patient_impact ||
                              'Medium'

                            const risk = Number(item.risk ?? 0)

                            return (
                              <tr
                                key={item.asset || item.id || index}
                                className="border-b border-white/5 transition hover:bg-white/[0.02]"
                              >

                                {/* Asset */}
                                <td className="px-5 py-4">

                                  <div className="flex items-center gap-3">

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
                                      <Hospital
                                        size={16}
                                        className="text-cyan-400"
                                      />
                                    </div>

                                    <div>
                                      <p className="text-sm font-medium">
                                        {item.asset || item.name || 'Clinical Asset'}
                                      </p>

                                      <p className="text-[10px] text-slate-600">
                                        Synthetic hospital infrastructure
                                      </p>
                                    </div>

                                  </div>

                                </td>

                                {/* Service */}
                                <td className="px-5 py-4 text-xs text-slate-400">
                                  {item.service || item.type || 'Clinical Service'}
                                </td>

                                {/* Impact */}
                                <td className="px-5 py-4">

                                  <span
                                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                      impact === 'Very High'
                                        ? 'bg-red-400/10 text-red-400'
                                        : impact === 'High'
                                          ? 'bg-orange-400/10 text-orange-400'
                                          : impact === 'Medium'
                                            ? 'bg-amber-400/10 text-amber-400'
                                            : 'bg-emerald-400/10 text-emerald-400'
                                    }`}
                                  >
                                    {impact}
                                  </span>

                                </td>

                                {/* Risk */}
                                <td className="px-5 py-4">

                                  <div className="flex items-center gap-2">

                                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/5">

                                      <div
                                        className={`h-full rounded-full ${
                                          risk >= 75
                                            ? 'bg-red-400'
                                            : risk >= 50
                                              ? 'bg-amber-400'
                                              : 'bg-emerald-400'
                                        }`}
                                        style={{
                                          width: `${Math.min(risk, 100)}%`,
                                        }}
                                      />

                                    </div>

                                    <span className="text-xs font-semibold">
                                      {risk}
                                    </span>

                                  </div>

                                </td>

                                {/* Reason */}
                                <td className="max-w-xs px-5 py-4 text-xs leading-relaxed text-slate-500">
                                  {item.reason ||
                                    'Potential disruption to clinical operations.'}
                                </td>

                              </tr>
                            )
                          })}

                        </tbody>

                      </table>

                    </div>

                  </section>

                  {/* Human Review */}
                  <section className="rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.06] to-transparent p-5">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                          <UserCheck size={19} className="text-cyan-400" />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold">
                            Human-in-the-Loop Safety Review
                          </h4>

                          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
                            Patient safety decisions require human security analyst
                            review. ClinShield provides risk recommendations but does
                            not execute autonomous clinical actions.
                          </p>
                        </div>

                      </div>

                      <button className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/15">
                        Review Safety Alerts
                        <ChevronRight size={14} />
                      </button>

                    </div>

                  </section>

                </div>
              ) : activePage === 'Hospital Assets' ? (

                <HospitalAssets />

              ) : activePage === 'Incidents' ? (

                <Incidents
                  threatEvents={threatEvents}
                  decisions={decisions}
                  handleDecision={handleDecision}
                />

              ) : activePage === 'Attack Simulator' ? (

              <AttackSimulator
                decisions={decisions}
                handleDecision={handleDecision}
              />

             ) : (

                <div className="flex min-h-[500px] items-center justify-center">
                  <div className="text-center">

                    <div className="mb-4 text-cyan-400">
                      <Radio size={40} className="mx-auto" />
                    </div>

                    <h3 className="text-2xl font-bold">
                      {activePage}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      This security module is ready for implementation.
                    </p>

                  </div>
                </div>

              )}

            </div>
          </div>
        ) : (
          <>
          
          {/* Page heading */}
          <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                <span>Security Operations</span>
                <ChevronRight size={12} />
                <span className="text-slate-300">Overview</span>
              </div>

              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Hospital Security Overview
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Real-time cyber risk translated into patient-safety impact.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-xl border border-amber-400/10 bg-amber-400/5 px-3 py-2 xl:self-auto">
              <CircleDot size={13} className="text-amber-400" />
              <span className="text-[11px] font-medium text-amber-300">
                SIMULATION MODE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-medium text-emerald-300">
              API: {apiStatus}
            </span>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Cyber Risk"
              value={riskData?.cyber_risk ?? 68}
              suffix="/100"
              subtitle="Elevated"
              icon={Shield}
              iconClass="text-red-400 bg-red-400/10"
              trend="+12%"
              trendClass="text-red-400"
            />

            <MetricCard
              title="Patient Safety Risk"
              value={riskData?.patient_safety_risk ?? 42}
              suffix="/100"
              subtitle="Moderate"
              icon={Siren}
              iconClass="text-amber-400 bg-amber-400/10"
              trend="-8%"
              trendClass="text-emerald-400"
            />

            <MetricCard
              title="Active Threats"
              value={String(threatData?.active_threats ?? 7).padStart(2, '0')}
              suffix=""
              subtitle="Requires review"
              icon={AlertTriangle}
              iconClass="text-orange-400 bg-orange-400/10"
              trend="+3"
            />

            <MetricCard
              title="Protected Assets"
              value={assetData?.protected_assets ?? 0}
              suffix={`/${assetData?.total_assets ?? 0}`}
              subtitle={
                assetData
                  ? `${Math.round((assetData.protected_assets / assetData.total_assets) * 100)}% coverage`
                  : "Loading..."
              }
              icon={ShieldCheck}
              iconClass="text-emerald-400 bg-emerald-400/10"
              trend="+2"
              trendClass="text-emerald-400"
            />
          </div>

          {/* Main grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Threat activity */}
            <section className="rounded-2xl border border-white/10 bg-[#0a121f] p-5 xl:col-span-2">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <BarChart3 size={17} className="text-cyan-400" />
                    <h4 className="font-semibold">Threat Activity</h4>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Detected security events over the last 7 hours
                  </p>
                </div>

                <div className="flex items-center gap-4 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    Events
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    Threats
                  </span>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="eventsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.22} />
                        <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                      </linearGradient>

                      <linearGradient id="threatFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f87171" stopOpacity={0.18} />
                        <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid stroke="#ffffff08" vertical={false} />

                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 10 }}
                    />

                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 10 }}
                    />

                    <Tooltip
                      contentStyle={{
                        background: '#0f172a',
                        border: '1px solid #ffffff15',
                        borderRadius: '10px',
                        fontSize: '11px',
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="events"
                      stroke="#22d3ee"
                      strokeWidth={2}
                      fill="url(#eventsFill)"
                    />

                    <Area
                      type="monotone"
                      dataKey="threats"
                      stroke="#f87171"
                      strokeWidth={2}
                      fill="url(#threatFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            {/* Patient safety */}
            <section className="rounded-2xl border border-white/10 bg-[#0a121f] p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Siren size={17} className="text-amber-400" />
                    <h4 className="font-semibold">Patient Safety</h4>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Clinical impact assessment
                  </p>
                </div>

                <span className="rounded-full bg-amber-400/10 px-2 py-1 text-[9px] font-semibold text-amber-400">
                  MODERATE
                </span>
              </div>

              <div className="my-7 flex justify-center">
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-amber-400/10">
                  <div className="absolute inset-[-10px] rounded-full border-[10px] border-transparent border-t-amber-400 border-r-amber-400" />

                  <div className="text-center">
                    <p className="text-4xl font-bold">42</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">
                      Risk Score
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <RiskRow label="Clinical availability" value="Low" />
                <RiskRow label="Patient data exposure" value="Medium" />
                <RiskRow label="Treatment disruption" value="Low" />
                <RiskRow label="Critical care impact" value="Low" />
              </div>
            </section>
          </div>

          {/* Digital twin + incidents */}
          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
            {/* Hospital assets */}
            <section className="rounded-2xl border border-white/10 bg-[#0a121f] p-5 xl:col-span-3">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Hospital size={17} className="text-cyan-400" />
                    <h4 className="font-semibold">Hospital Digital Twin</h4>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Synthetic clinical infrastructure
                  </p>
                </div>

                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {assetData?.protected_assets ?? 0} protected
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {assets.map((asset) => {
                  const Icon = asset.icon

                  return (
                    <div
                      key={asset.name}
                      className="group rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 group-hover:text-cyan-400">
                          <Icon size={17} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium">
                            {asset.name}
                          </p>
                          <p className="text-[10px] text-slate-600">
                            {asset.type}
                          </p>
                        </div>

                        <div
                          className={`h-2 w-2 rounded-full ${
                            asset.status === 'Review'
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <span
                          className={`text-[9px] font-medium ${
                            asset.status === 'Review'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {asset.status}
                        </span>

                        <span className="text-[9px] text-slate-600">
                          Risk {asset.risk}
                        </span>
                      </div>

                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            asset.risk > 50
                              ? 'bg-amber-400'
                              : 'bg-emerald-400'
                          }`}
                          style={{ width: `${asset.risk}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Incidents */}
            <section className="rounded-2xl border border-white/10 bg-[#0a121f] p-5 xl:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <FileWarning size={17} className="text-red-400" />
                    <h4 className="font-semibold">Recent Incidents</h4>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Awaiting analyst review
                  </p>
                </div>

                <button className="text-[10px] font-medium text-cyan-400 hover:text-cyan-300">
                  View all
                </button>
              </div>

              <div className="space-y-2">
                {incidents.map((incident) => (
                  <div
                    key={incident.name}
                    className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          incident.severity === 'Critical'
                            ? 'bg-red-500'
                            : incident.severity === 'High'
                              ? 'bg-orange-400'
                              : 'bg-amber-400'
                        }`}
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-xs font-medium">
                            {incident.name}
                          </p>

                          <span
                            className={`shrink-0 text-[8px] font-bold uppercase ${
                              incident.severity === 'Critical'
                                ? 'text-red-400'
                                : incident.severity === 'High'
                                  ? 'text-orange-400'
                                  : 'text-amber-400'
                            }`}
                          >
                            {incident.severity}
                          </span>
                        </div>

                        <div className="mt-1 flex gap-2 text-[9px] text-slate-600">
                          <span>{incident.asset}</span>
                          <span>•</span>
                          <span>{incident.type}</span>
                          <span>•</span>
                          <span>{incident.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Human approval banner */}
          <section className="mt-6 rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.06] to-transparent p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                  <UserCheck size={19} className="text-cyan-400" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold">
                    Human-in-the-Loop Protection
                  </h4>

                  <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
                    AI recommendations never execute autonomous clinical actions.
                    Security analysts review risk, approve containment, and record
                    the decision in the audit trail.
                  </p>
                </div>
              </div>

              <button
              onClick={() => setActivePage('Incidents')}
              className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/15"
            >
              Review Queue
              <ChevronRight size={14} />
            </button>
            </div>
          </section>
           
          <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-white/5 pt-5 text-[10px] text-slate-600 sm:flex-row">
            <span>ClinShield v0.1 • Hackathon Prototype</span>
            <span>All data shown is synthetic / simulated</span>
          </footer>
          </>
        )}
        </div>
      </main>
    </div>
  )
}

function MetricCard({
  title,
  value,
  suffix,
  subtitle,
  icon: Icon,
  iconClass,
  trend,
  trendClass,
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-[#0a121f] p-5 transition hover:border-white/15">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>

          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight">{value}</span>
            <span className="text-xs text-slate-600">{suffix}</span>
          </div>
        </div>

        <div className={`rounded-xl p-2.5 ${iconClass}`}>
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] text-slate-500">{subtitle}</span>
        <span className={`text-[10px] font-semibold ${trendClass}`}>
          {trend}
        </span>
      </div>
    </div>
  )
}

function RiskRow({ label, value }) {
  const classes = {
    Low: 'text-emerald-400 bg-emerald-400/10',
    Medium: 'text-amber-400 bg-amber-400/10',
    High: 'text-red-400 bg-red-400/10',
  }

  return (
    <div className="flex items-center justify-between rounded-lg bg-white/[0.02] px-3 py-2">
      <span className="text-[10px] text-slate-500">{label}</span>

      <span
        className={`rounded-md px-2 py-1 text-[9px] font-semibold ${classes[value]}`}
      >
        {value}
      </span>
    </div>
  )
}
function Incidents({ threatEvents, decisions, handleDecision }) {
  const criticalCount = threatEvents.filter(
    (event) => event.severity === 'Critical'
  ).length

  const highCount = threatEvents.filter(
    (event) => event.severity === 'High'
  ).length

  const reviewCount = threatEvents.filter(
    (event) =>
      event.status === 'Under Review' ||
      event.status === 'Escalated'
  ).length

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
            <span>Security Operations</span>
            <ChevronRight size={12} />
            <span className="text-slate-300">Incidents</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            Security Incidents
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Detected cybersecurity incidents across the synthetic hospital environment.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-2">
          <FileWarning size={15} className="text-red-400" />
          <span className="text-xs font-semibold text-red-300">
            {threatEvents.length} ACTIVE EVENTS
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-[#0a121f] p-5">
          <p className="text-xs text-slate-500">
            Total Incidents
          </p>

          <p className="mt-2 text-3xl font-bold">
            {threatEvents.length}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Detected security events
          </p>
        </div>

        <div className="rounded-2xl border border-red-400/10 bg-red-400/5 p-5">
          <p className="text-xs text-slate-500">
            Critical
          </p>

          <p className="mt-2 text-3xl font-bold text-red-400">
            {criticalCount}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Immediate attention
          </p>
        </div>

        <div className="rounded-2xl border border-orange-400/10 bg-orange-400/5 p-5">
          <p className="text-xs text-slate-500">
            High Severity
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-400">
            {highCount}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Elevated cyber risk
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-5">
          <p className="text-xs text-slate-500">
            Human Review
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {reviewCount}
          </p>

          <p className="mt-2 text-xs text-slate-600">
            Analyst attention required
          </p>
        </div>

      </div>

      {/* Incident List */}
      <section className="rounded-2xl border border-white/10 bg-[#0a121f]">

        <div className="flex flex-col justify-between gap-3 border-b border-white/5 p-5 sm:flex-row sm:items-center">

          <div>
            <h3 className="font-semibold">
              Detected Security Incidents
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Synthetic hospital telemetry requiring security analysis.
            </p>
          </div>

          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-400">
            SIMULATION
          </span>

        </div>

        <div className="divide-y divide-white/5">

          {threatEvents.length === 0 ? (

            <div className="flex min-h-[250px] flex-col items-center justify-center text-center">

              <CheckCircle2
                size={35}
                className="mb-4 text-emerald-400"
              />

              <h4 className="font-semibold">
                No Active Incidents
              </h4>

              <p className="mt-2 text-xs text-slate-500">
                The synthetic hospital environment currently has no detected incidents.
              </p>

            </div>

          ) : (

                        threatEvents.map((event) => (
              <div
                key={event.id}
                className="border-b border-white/5 p-5 transition hover:bg-white/[0.02]"
              >

                {/* Incident Header */}
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                  <div className="flex items-start gap-4">

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        event.severity === 'Critical'
                          ? 'bg-red-400/10'
                          : event.severity === 'High'
                            ? 'bg-orange-400/10'
                            : 'bg-amber-400/10'
                      }`}
                    >
                      <AlertTriangle
                        size={19}
                        className={
                          event.severity === 'Critical'
                            ? 'text-red-400'
                            : event.severity === 'High'
                              ? 'text-orange-400'
                              : 'text-amber-400'
                        }
                      />
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h4 className="text-sm font-semibold">
                          {event.type}
                        </h4>

                        <span
                          className={`rounded-full px-2 py-1 text-[9px] font-semibold ${
                            event.severity === 'Critical'
                              ? 'bg-red-400/10 text-red-400'
                              : event.severity === 'High'
                                ? 'bg-orange-400/10 text-orange-400'
                                : 'bg-amber-400/10 text-amber-400'
                          }`}
                        >
                          {event.severity}
                        </span>

                      </div>

                      <p className="mt-1 text-[10px] text-slate-600">
                        Incident ID: {event.id}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-slate-500">
                        <span>Source: {event.source}</span>
                        <span>Patient Impact: {event.patient_impact}</span>
                      </div>

                    </div>

                  </div>

                  {/* Risk Summary */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:w-[420px]">

                    <div className="rounded-xl bg-white/[0.02] p-3">
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Cyber Risk
                      </p>

                      <p className="mt-1 text-lg font-bold text-red-400">
                        {event.cyber_risk}
                        <span className="ml-1 text-[9px] text-slate-600">
                          /100
                        </span>
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.02] p-3">
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Patient Impact
                      </p>

                      <p className="mt-1 text-xs font-semibold text-amber-400">
                        {event.patient_impact}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.02] p-3">
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Status
                      </p>

                      <p className="mt-1 text-xs font-semibold text-cyan-400">
                        {decisions[event.id] || event.status}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Risk Bar */}
                <div className="mt-4">

                  <div className="mb-2 flex items-center justify-between">

                    <span className="text-[9px] text-slate-600">
                      Cyber Risk Level
                    </span>

                    <span className="text-[9px] font-semibold text-slate-500">
                      {event.cyber_risk}/100
                    </span>

                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">

                    <div
                      className={`h-full rounded-full ${
                        event.cyber_risk >= 80
                          ? 'bg-red-400'
                          : event.cyber_risk >= 60
                            ? 'bg-orange-400'
                            : 'bg-amber-400'
                      }`}
                      style={{
                        width: `${Math.min(event.cyber_risk, 100)}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Human Review Buttons */}
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">

                  <span className="mr-2 text-[9px] uppercase tracking-wider text-slate-600">
                    Human Review
                  </span>

                  <button
                    onClick={() => handleDecision(event.id, 'Approved')}
                    className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-[10px] font-semibold text-emerald-400 transition hover:bg-emerald-400/10"
                  >
                    <CheckCircle2 size={13} />
                    Approve
                  </button>

                  <button
                    onClick={() => handleDecision(event.id, 'Rejected')}
                    className="flex items-center gap-2 rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-[10px] font-semibold text-red-400 transition hover:bg-red-400/10"
                  >
                    <X size={13} />
                    Reject
                  </button>

                  <button
                    onClick={() => handleDecision(event.id, 'Investigating')}
                    className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-[10px] font-semibold text-amber-400 transition hover:bg-amber-400/10"
                  >
                    <Search size={13} />
                    Investigate
                  </button>

                  {decisions[event.id] && (
                    <span className="ml-auto rounded-lg bg-cyan-400/10 px-3 py-2 text-[10px] font-semibold text-cyan-300">
                      Analyst Decision: {decisions[event.id]}
                    </span>
                  )}

                </div>

              </div>
            ))

          )}

        </div>

      </section>

      {/* Human Review Notice */}
      <section className="rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.06] to-transparent p-5">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
            <UserCheck size={19} className="text-cyan-400" />
          </div>

          <div>

            <h4 className="text-sm font-semibold">
              Human Security Review Required
            </h4>

            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500">
              ClinShield identifies and prioritizes incidents but does not
              autonomously execute clinical or infrastructure actions.
              Security analysts must review the incident before simulated
              containment is approved.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}

function HospitalAssets() {
  const hospitalAssets = [
    {
      id: 'EHR-01',
      name: 'Electronic Health Records',
      type: 'Clinical',
      status: 'Protected',
      risk: 24,
      criticality: 'Critical',
      impact: 'Very High',
    },
    {
      id: 'PACS-01',
      name: 'Medical Imaging / PACS',
      type: 'Imaging',
      status: 'Protected',
      risk: 31,
      criticality: 'High',
      impact: 'High',
    },
    {
      id: 'ICU-01',
      name: 'ICU Monitoring Network',
      type: 'Patient Safety',
      status: 'Protected',
      risk: 18,
      criticality: 'Critical',
      impact: 'Very High',
    },
    {
      id: 'LAB-01',
      name: 'Laboratory Information System',
      type: 'Diagnostics',
      status: 'Review',
      risk: 67,
      criticality: 'High',
      impact: 'High',
    },
    {
      id: 'PHARM-01',
      name: 'Pharmacy Management System',
      type: 'Clinical',
      status: 'Protected',
      risk: 27,
      criticality: 'High',
      impact: 'High',
    },
    {
      id: 'PORTAL-01',
      name: 'Doctor / Patient Portal',
      type: 'Identity',
      status: 'Protected',
      risk: 22,
      criticality: 'Medium',
      impact: 'Medium',
    },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
            <span>Security Operations</span>
            <ChevronRight size={12} />
            <span className="text-slate-300">Hospital Assets</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            Hospital Asset Inventory
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Synthetic hospital infrastructure monitored by ClinShield.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2">
          <Hospital size={15} className="text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-300">
            6 ASSETS MONITORED
          </span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
            <ShieldCheck size={20} className="text-cyan-400" />
          </div>

          <div>
            <h3 className="font-semibold">
              Synthetic Hospital Digital Twin
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              These assets represent simulated healthcare infrastructure.
              No real hospital systems or patient records are connected.
            </p>
          </div>
        </div>
      </div>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

        {hospitalAssets.map((asset) => (
          <section
            key={asset.id}
            className={`rounded-2xl border bg-[#0a121f] p-5 transition ${
              asset.status === 'Review'
                ? 'border-amber-400/30 hover:border-amber-400/50'
                : 'border-white/10 hover:border-cyan-400/20'
            }`}
          >

            {/* Asset Header */}
            <div className="flex items-start justify-between gap-3">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10">
                  <Database size={19} className="text-cyan-400" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    {asset.name}
                  </h3>

                  <p className="mt-1 text-[10px] text-slate-600">
                    {asset.id}
                  </p>
                </div>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-[9px] font-semibold ${
                  asset.status === 'Review'
                    ? 'bg-amber-400/10 text-amber-400'
                    : 'bg-emerald-400/10 text-emerald-400'
                }`}
              >
                {asset.status}
              </span>

            </div>

            {/* Asset Information */}
            <div className="mt-5 grid grid-cols-2 gap-3">

              <div className="rounded-xl bg-white/[0.02] p-3">
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  Type
                </p>
                <p className="mt-1 text-xs font-medium text-slate-300">
                  {asset.type}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.02] p-3">
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  Criticality
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${
                    asset.criticality === 'Critical'
                      ? 'text-red-400'
                      : asset.criticality === 'High'
                        ? 'text-orange-400'
                        : 'text-amber-400'
                  }`}
                >
                  {asset.criticality}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.02] p-3">
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  Patient Impact
                </p>
                <p
                  className={`mt-1 text-xs font-semibold ${
                    asset.impact === 'Very High'
                      ? 'text-red-400'
                      : asset.impact === 'High'
                        ? 'text-orange-400'
                        : 'text-amber-400'
                  }`}
                >
                  {asset.impact}
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.02] p-3">
                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  Cyber Risk
                </p>
                <p className="mt-1 text-xs font-semibold text-cyan-400">
                  {asset.risk}/100
                </p>
              </div>

            </div>

            {/* Risk Bar */}
            <div className="mt-5">

              <div className="mb-2 flex items-center justify-between">
                <span className="text-[9px] text-slate-600">
                  Current Risk Level
                </span>

                <span className="text-[9px] font-semibold text-slate-400">
                  {asset.risk}
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className={`h-full rounded-full ${
                    asset.risk >= 60
                      ? 'bg-red-400'
                      : asset.risk >= 40
                        ? 'bg-amber-400'
                        : 'bg-emerald-400'
                  }`}
                  style={{ width: `${asset.risk}%` }}
                />
              </div>

            </div>

          </section>
        ))}

      </div>

      {/* Human Review */}
      <section className="rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.06] to-transparent p-5">

        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
            <UserCheck size={19} className="text-cyan-400" />
          </div>

          <div>
            <h4 className="text-sm font-semibold">
              Asset Risk Requires Human Oversight
            </h4>

            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-500">
              ClinShield continuously evaluates synthetic clinical assets.
              High-risk assets are flagged for security analyst review before
              any simulated containment action is considered.
            </p>
          </div>

        </div>

      </section>

    </div>
  )
}
function AttackSimulator({ decisions, handleDecision }) {
  const [attackType, setAttackType] = useState('Ransomware')
  const [assetId, setAssetId] = useState('ICU-01')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const attackTypes = [
    'Ransomware',
    'Brute Force',
    'Data Exfiltration',
    'Insider Threat',
  ]

  const hospitalAssets = [
    { id: 'EHR-01', name: 'Electronic Health Records' },
    { id: 'ICU-01', name: 'ICU Monitoring Network' },
    { id: 'LAB-01', name: 'Laboratory Information System' },
    { id: 'PHARM-01', name: 'Pharmacy Management System' },
  ]

  const runSimulation = async () => {
    setLoading(true)
    setResult(null)

    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/attack-simulator',
        {
          params: {
            attack_type: attackType,
            asset_id: assetId,
          },
        }
      )

      setResult(response.data)
    } catch (error) {
      console.error('Simulation failed:', error)
      setResult({
        success: false,
        error: 'Unable to connect to the defense engine.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
            <span>Security Operations</span>
            <ChevronRight size={12} />
            <span className="text-slate-300">Attack Simulator</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight">
            Attack Simulator
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Safely simulate cyber threats against synthetic hospital infrastructure.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-2">
          <CircleDot size={15} className="text-amber-400" />
          <span className="text-xs font-semibold text-amber-300">
            SIMULATION MODE
          </span>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">
        <div className="flex items-start gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
            <ShieldCheck size={20} className="text-cyan-400" />
          </div>

          <div>
            <h3 className="font-semibold">
              Controlled Cybersecurity Simulation
            </h3>

            <p className="mt-1 text-xs leading-relaxed text-slate-500">
              ClinShield uses synthetic hospital assets and simulated attack
              scenarios. No real hospital systems, patient records, or medical
              devices are accessed.
            </p>
          </div>

        </div>
      </div>

      {/* Simulator */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Configuration */}
        <section className="rounded-2xl border border-white/10 bg-[#0a121f] p-6 xl:col-span-1">

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10">
              <AlertTriangle size={20} className="text-red-400" />
            </div>

            <div>
              <h3 className="font-semibold">
                Threat Configuration
              </h3>

              <p className="text-xs text-slate-500">
                Select a synthetic attack scenario
              </p>
            </div>
          </div>

          {/* Attack Type */}
          <div className="mb-5">
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Attack Scenario
            </label>

            <select
              value={attackType}
              onChange={(e) => setAttackType(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111b2a] px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40"
            >
              {attackTypes.map((attack) => (
                <option key={attack} value={attack}>
                  {attack}
                </option>
              ))}
            </select>
          </div>

          {/* Target Asset */}
          <div className="mb-6">
            <label className="mb-2 block text-xs font-medium text-slate-400">
              Target Clinical Asset
            </label>

            <select
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#111b2a] px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-400/40"
            >
              {hospitalAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  {asset.id} — {asset.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={runSimulation}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Zap size={17} />

            {loading ? 'Running Simulation...' : 'Run Attack Simulation'}
          </button>

        </section>

        {/* Result */}
        <section className="rounded-2xl border border-white/10 bg-[#0a121f] p-6 xl:col-span-2">

          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Activity size={17} className="text-cyan-400" />
                <h3 className="font-semibold">
                  Security Assessment
                </h3>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                AI-assisted cyber and patient-safety risk analysis
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold text-emerald-400">
                SYNTHETIC
              </span>
            </div>
          </div>

          {/* Ready State */}
          {!result && !loading && (
            <div className="flex min-h-[360px] flex-col items-center justify-center text-center">

              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/10 bg-cyan-400/5">
                <Cpu size={34} className="text-cyan-400" />
              </div>

              <h4 className="text-lg font-semibold">
                Ready for Threat Simulation
              </h4>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                Select a simulated cyber attack and a synthetic hospital
                asset. ClinShield will evaluate cyber risk and translate
                the threat into potential patient-safety impact.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Ransomware', 'Brute Force', 'Data Exfiltration', 'Insider Threat'].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-[10px] text-slate-500"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>

            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[360px] flex-col items-center justify-center">

              <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 animate-ping rounded-full border border-cyan-400/20" />
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-400/10 border-t-cyan-400" />
                <Activity size={18} className="absolute text-cyan-400" />
              </div>

              <p className="text-sm font-semibold">
                Analyzing Simulated Threat
              </p>

              <p className="mt-2 text-xs text-slate-500">
                Calculating cyber risk and clinical impact...
              </p>

              <div className="mt-5 h-1.5 w-48 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-cyan-400" />
              </div>

            </div>
          )}

          {/* Successful Result */}
          {result && result.success && (
            <div className="space-y-5">

              {/* Threat Header */}
              <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.03] p-5">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      Simulated Threat
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10">
                        <AlertTriangle size={19} className="text-red-400" />
                      </div>

                      <div>
                        <h4 className="text-xl font-bold">
                          {result.attack?.type || attackType}
                        </h4>

                        <p className="mt-1 text-[10px] text-slate-500">
                          Target: {result.target?.asset || assetId}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-red-400/10 bg-red-400/10 px-5 py-3 text-center">
                    <p className="text-[9px] uppercase tracking-wider text-red-300/60">
                      Cyber Risk
                    </p>

                    <p className="mt-1 text-3xl font-bold text-red-400">
                      {result.cyber_assessment?.cyber_risk ?? '--'}
                      <span className="text-xs font-medium text-slate-600">
                        /100
                      </span>
                    </p>
                  </div>

                </div>

              </div>

              {/* Risk Cards */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-xl border border-red-400/10 bg-red-400/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Cyber Risk
                    </p>

                    <Shield size={15} className="text-red-400" />
                  </div>

                  <p className="mt-3 text-2xl font-bold text-red-400">
                    {result.cyber_assessment?.cyber_risk ?? '--'}
                    <span className="ml-1 text-xs text-slate-600">
                      /100
                    </span>
                  </p>

                  <p className="mt-1 text-[10px] text-red-300/50">
                    Threat severity
                  </p>
                </div>

                <div className="rounded-xl border border-amber-400/10 bg-amber-400/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Patient Impact
                    </p>

                    <Siren size={15} className="text-amber-400" />
                  </div>

                  <p className="mt-3 text-lg font-bold text-amber-400">
                    {result.target?.patient_impact ?? '--'}
                  </p>

                  <p className="mt-1 text-[10px] text-amber-300/50">
                    Potential clinical consequence
                  </p>
                </div>

                <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">
                      Review Priority
                    </p>

                    <UserCheck size={15} className="text-cyan-400" />
                  </div>

                  <p className="mt-3 text-lg font-bold text-cyan-400">
                    {result.patient_safety_assessment?.review_priority ?? '--'}
                  </p>

                  <p className="mt-1 text-[10px] text-cyan-300/50">
                    Human review required
                  </p>
                </div>

              </div>

              {/* AI Assessment */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">

                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10">
                    <Activity size={17} className="text-cyan-400" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold">
                      AI Risk Assessment
                    </h4>

                    <p className="text-[10px] text-slate-600">
                      Cybersecurity → Clinical Impact
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-[#070d17] p-4">

                  <p className="text-xs leading-relaxed text-slate-400">
                    {result.patient_safety_assessment?.recommended_action ||
                      'The simulated threat requires security analyst review before any containment action.'}
                  </p>

                </div>

              </div>

              {/* Human-in-the-Loop */}
              <div className="rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-5">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                    <UserCheck size={19} className="text-cyan-400" />
                  </div>

                  <div className="flex-1">

                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                      <div>
                        <h4 className="text-sm font-semibold">
                          Human-in-the-Loop Protection
                        </h4>

                        <p className="mt-1 text-xs leading-relaxed text-slate-500">
                          ClinShield provides a recommendation but never
                          performs autonomous clinical or infrastructure
                          actions.
                        </p>
                      </div>

                      <span className="h-fit rounded-full bg-amber-400/10 px-3 py-1 text-[9px] font-semibold text-amber-400">
                        REVIEW REQUIRED
                      </span>
                    </div>

                    {/* Review Actions */}
                    <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">

                      <button
                        onClick={() => handleDecision('SIMULATOR', 'Approved')}
                        className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-400/10"
                      >
                        <CheckCircle2 size={14} />
                        Approve
                      </button>

                      <button
                        onClick={() => handleDecision('SIMULATOR', 'Rejected')}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-400/10"
                      >
                        <X size={14} />
                        Reject
                      </button>

                      <button
                        onClick={() => handleDecision('SIMULATOR', 'Investigating')}
                        className="flex items-center justify-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-2.5 text-xs font-semibold text-amber-400 transition hover:bg-amber-400/10"
                      >
                        <Search size={14} />
                        Investigate
                      </button>

                    </div>

                  </div>

                </div>

              </div>

              {/* Safety Footer */}
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">

                <Lock size={14} className="shrink-0 text-emerald-400" />

                <p className="text-[10px] leading-relaxed text-slate-600">
                  Simulation completed using synthetic hospital infrastructure.
                  No real hospital systems, patient records, or medical devices
                  were accessed.
                </p>

              </div>

            </div>
          )}

          {/* Error */}
          {result && !result.success && (
            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-400/10">
                <AlertTriangle size={28} className="text-red-400" />
              </div>

              <h4 className="font-semibold text-red-400">
                Simulation Error
              </h4>

              <p className="mt-2 max-w-md text-xs leading-relaxed text-slate-500">
                {result.error || 'Unable to complete the simulation.'}
              </p>

            </div>
          )}

        </section>

      </div>

    </div>
  )
}

export default App