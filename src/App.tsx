import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Wind, Settings, Activity, BarChart3, CheckCircle, ArrowRight, Zap } from 'lucide-react'
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
    title: 'Turbulence Profiles',
    description: 'Define turbulence characteristics',
    substeps: [
      'Select turbulence intensities',
      'Define inflow parameters',
      'Choose turbulence models'
    ],
    icon: <Wind className="w-5 h-5" />,
    color: 'text-blue-700',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-600'
  },
  {
    id: '2',
    title: 'Geometry & Mesh',
    description: 'Create computational domain',
    substeps: [
      'Model VAWT environment',
      'Generate refined mesh',
      'Perform mesh independence'
    ],
    icon: <Settings className="w-5 h-5" />,
    color: 'text-emerald-700',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    borderColor: 'border-emerald-200',
    iconBg: 'bg-emerald-600'
  },
  {
    id: '3',
    title: 'CFD Setup',
    description: 'Configure ANSYS Fluent',
    substeps: [
      'Choose solver models',
      'Set boundary conditions',
      'Implement blade rotation'
    ],
    icon: <Activity className="w-5 h-5" />,
    color: 'text-purple-700',
    bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-600'
  },
  {
    id: '4',
    title: 'Post Processing',
    description: 'Analyze simulation results',
    substeps: [
      'Extract power/torque data',
      'Analyze velocity fields',
      'Visualize flow patterns'
    ],
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-orange-700',
    bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-600'
  },
  {
    id: '5',
    title: 'Validation',
    description: 'Verify simulation results',
    substeps: [
      'Compare with experimental data',
      'Perform sensitivity analysis',
      'Discuss limitations'
    ],
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-red-700',
    bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-600'
  }
]

const ConnectorArrow = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
    className="flex items-center justify-center mx-4"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-lg">
      <ArrowRight className="w-6 h-6 text-white" />
    </div>
  </motion.div>
)

const FlowchartStep = ({ step, index }: { step: FlowStep; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex-1 min-w-0"
  >
    <Card className={cn(
      "h-full transition-all duration-300 hover:shadow-lg border-2 overflow-hidden",
      step.borderColor,
      "hover:scale-105"
    )}>
      <div className={cn("h-1", step.bgColor)}></div>
      <CardHeader className={cn("pb-3", step.bgColor)}>
        <div className="flex items-center gap-3 mb-2">
          <div className={cn(
            "p-2 rounded-lg shadow-md flex-shrink-0",
            step.iconBg
          )}>
            <div className="text-white">
              {step.icon}
            </div>
          </div>
          <Badge variant="secondary" className="text-xs font-semibold">
            {step.id}
          </Badge>
        </div>
        <CardTitle className={cn("text-lg font-bold mb-1", step.color)}>
          {step.title}
        </CardTitle>
        <p className="text-sm text-gray-600 leading-tight">
          {step.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0 pb-4">
        <div className="space-y-2">
          {step.substeps.map((substep, subIndex) => (
            <motion.div
              key={subIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + subIndex * 0.05 + 0.2 }}
              className="flex items-start gap-2"
            >
              <div className={cn(
                "w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0",
                step.color.replace('text-', 'bg-')
              )} />
              <p className="text-xs text-gray-700 leading-relaxed">
                {substep}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            VAWT CFD Analysis
            <span className="block text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Methodology Flowchart
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Complete methodology for Vertical Axis Wind Turbine CFD analysis
          </p>
        </motion.div>

        {/* Flowchart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
          <div className="flex items-stretch gap-0 overflow-x-auto min-h-[400px]">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="flex items-stretch">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-gray-50 to-white shadow-lg border border-gray-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Systematic CFD Analysis Approach
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-sm">
                This flowchart provides a proven methodology for VAWT CFD analysis, ensuring comprehensive 
                coverage from turbulence setup through validation for reliable simulation results.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Research Validated</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span>Industry Standard</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Reproducible</span>
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