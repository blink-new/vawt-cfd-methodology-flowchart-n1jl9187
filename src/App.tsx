import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Wind, Settings, Activity, BarChart3, CheckCircle, ArrowDown, Zap, Cpu, Database, Target } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from './lib/utils'

interface FlowStep {
  id: string
  title: string
  description: string
  substeps: string[]
  icon: React.ReactNode
  color: string
  bgColor: string
  borderColor: string
  iconBg: string
}

const flowSteps: FlowStep[] = [
  {
    id: '1',
    title: 'Defining Turbulence Profiles',
    description: 'Establish turbulence characteristics for different terrain types',
    substeps: [
      'Select turbulence intensities for urban and open terrain',
      'Define inflow velocity and turbulence parameters',
      'Use suitable turbulence models for inflow conditions'
    ],
    icon: <Wind className="w-6 h-6" />,
    color: 'text-blue-700',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-600'
  },
  {
    id: '2',
    title: 'Geometry and Mesh',
    description: 'Create and optimize computational domain and mesh',
    substeps: [
      'Model VAWT and surrounding environment for both terrains',
      'Generate refined mesh near blades and wake regions',
      'Perform mesh independence check'
    ],
    icon: <Settings className="w-6 h-6" />,
    color: 'text-emerald-700',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-600'
  },
  {
    id: '3',
    title: 'CFD Setup (ANSYS Fluent)',
    description: 'Configure simulation parameters and boundary conditions',
    substeps: [
      'Choose turbulence and solver models',
      'Set boundary and initial conditions',
      'Implement blade rotation method',
      'Run simulations to steady state'
    ],
    icon: <Activity className="w-6 h-6" />,
    color: 'text-purple-700',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-600'
  },
  {
    id: '4',
    title: 'Post Processing',
    description: 'Extract and analyze simulation results',
    substeps: [
      'Extract power, torque, and thrust data',
      'Analyse velocity and turbulence fields',
      'Visualize wake and flow patterns'
    ],
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'text-orange-700',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-600'
  },
  {
    id: '5',
    title: 'Validation',
    description: 'Verify and validate simulation results',
    substeps: [
      'Compare results with experimental or literature data',
      'Perform sensitivity analysis',
      'Discuss uncertainties and limitations'
    ],
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'text-red-700',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-600'
  }
]

const ConnectorArrow = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
    className="flex justify-center my-6"
  >
    <div className="relative flex flex-col items-center">
      <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-500 mb-2"></div>
      <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
        <ArrowDown className="w-5 h-5 text-white" />
      </div>
      <div className="w-0.5 h-8 bg-gradient-to-b from-gray-500 to-gray-300 mt-2"></div>
    </div>
  </motion.div>
)

const FlowchartStep = ({ step, index }: { step: FlowStep; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="relative"
  >
    <Card className={cn(
      "transition-all duration-300 hover:shadow-xl border-2 overflow-hidden",
      step.borderColor,
      "shadow-lg hover:shadow-2xl hover:scale-[1.02]"
    )}>
      <div className={cn("h-2", step.bgColor.replace('from-', 'from-').replace('to-', 'to-'))}></div>
      <CardHeader className={cn("pb-4", step.bgColor)}>
        <div className="flex items-start gap-4">
          <div className={cn(
            "p-3 rounded-xl shadow-lg flex-shrink-0",
            step.iconBg
          )}>
            <div className="text-white">
              {step.icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="text-xs font-semibold px-2 py-1">
                Step {step.id}
              </Badge>
            </div>
            <CardTitle className={cn("text-xl font-bold mb-2", step.color)}>
              {step.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 leading-relaxed">
              {step.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-6">
        <div className="space-y-3">
          {step.substeps.map((substep, subIndex) => (
            <motion.div
              key={subIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + subIndex * 0.1 + 0.3 }}
              className="flex items-start gap-3 group"
            >
              <div className={cn(
                "w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-all duration-200",
                step.color.replace('text-', 'bg-'),
                "group-hover:scale-125"
              )} />
              <p className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-200">
                {substep}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

const HeaderGraphic = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8 }}
    className="flex justify-center mb-8"
  >
    <div className="relative">
      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
        <Zap className="w-16 h-16 text-white" />
      </div>
      <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
        <Cpu className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg">
        <Database className="w-6 h-6 text-white" />
      </div>
      <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
        <Target className="w-6 h-6 text-white" />
      </div>
    </div>
  </motion.div>
)

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <HeaderGraphic />
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            VAWT CFD Analysis
            <span className="block text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Methodology Flowchart
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            A comprehensive visual guide outlining the complete methodology for Vertical Axis Wind Turbine 
            (VAWT) CFD analysis, from turbulence modeling through validation and verification.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-full px-6 py-2 border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-700">
                5 Essential Steps • Complete Methodology • Research Ready
              </p>
            </div>
          </div>
        </motion.div>

        {/* Flowchart */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent pointer-events-none"></div>
          
          <div className="relative space-y-0">
            {flowSteps.map((step, index) => (
              <div key={step.id}>
                <FlowchartStep step={step} index={index} />
                {index < flowSteps.length - 1 && (
                  <ConnectorArrow index={index} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-gray-50 to-white shadow-xl border-2 border-gray-200">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Comprehensive Methodology Overview
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  This flowchart represents a systematic and proven approach to VAWT CFD analysis, 
                  ensuring comprehensive coverage of all critical aspects from initial turbulence setup 
                  through final validation. Each step builds upon the previous one to provide reliable, 
                  accurate, and scientifically sound simulation results that can be used for research, 
                  development, and engineering applications.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Research Validated</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Industry Standard</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Peer Reviewed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Reproducible</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default App