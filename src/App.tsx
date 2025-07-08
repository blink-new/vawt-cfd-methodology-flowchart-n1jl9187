import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Wind, Settings, Activity, BarChart3, CheckCircle, ArrowRight, Zap, Target, Cpu, Database, TrendingUp, Shield } from 'lucide-react'
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
  ringColor: string
}

const flowSteps: FlowStep[] = [
  {
    id: '1',
    title: 'Turbulence Profiles',
    description: 'Define turbulence characteristics for accurate simulation',
    substeps: [
      'Select turbulence intensities for urban and open terrain',
      'Define inflow velocity and turbulence parameters',
      'Use suitable turbulence models for inflow conditions'
    ],
    icon: <Wind className="w-6 h-6" />,
    color: 'text-blue-700',
    bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200',
    borderColor: 'border-blue-300',
    iconBg: 'bg-gradient-to-br from-blue-600 to-blue-700',
    ringColor: 'ring-blue-200'
  },
  {
    id: '2',
    title: 'Geometry & Mesh',
    description: 'Create computational domain and mesh structure',
    substeps: [
      'Model VAWT and surrounding environment for both terrains',
      'Generate refined mesh near blades and wake regions',
      'Perform mesh independence check for grid convergence'
    ],
    icon: <Settings className="w-6 h-6" />,
    color: 'text-emerald-700',
    bgColor: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200',
    borderColor: 'border-emerald-300',
    iconBg: 'bg-gradient-to-br from-emerald-600 to-emerald-700',
    ringColor: 'ring-emerald-200'
  },
  {
    id: '3',
    title: 'CFD Setup',
    description: 'Configure ANSYS Fluent simulation parameters',
    substeps: [
      'Choose appropriate turbulence and solver models',
      'Set boundary conditions and initial conditions',
      'Implement blade rotation method and run to steady state'
    ],
    icon: <Activity className="w-6 h-6" />,
    color: 'text-purple-700',
    bgColor: 'bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200',
    borderColor: 'border-purple-300',
    iconBg: 'bg-gradient-to-br from-purple-600 to-purple-700',
    ringColor: 'ring-purple-200'
  },
  {
    id: '4',
    title: 'Post Processing',
    description: 'Analyze and visualize simulation results',
    substeps: [
      'Extract power, torque, and thrust coefficient data',
      'Analyse velocity and turbulence field distributions',
      'Visualize wake structures and flow pattern evolution'
    ],
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'text-orange-700',
    bgColor: 'bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200',
    borderColor: 'border-orange-300',
    iconBg: 'bg-gradient-to-br from-orange-600 to-orange-700',
    ringColor: 'ring-orange-200'
  },
  {
    id: '5',
    title: 'Validation',
    description: 'Verify and validate simulation accuracy',
    substeps: [
      'Compare results with experimental or literature data',
      'Perform sensitivity analysis on key parameters',
      'Discuss uncertainties and simulation limitations'
    ],
    icon: <CheckCircle className="w-6 h-6" />,
    color: 'text-red-700',
    bgColor: 'bg-gradient-to-br from-red-50 via-red-100 to-red-200',
    borderColor: 'border-red-300',
    iconBg: 'bg-gradient-to-br from-red-600 to-red-700',
    ringColor: 'ring-red-200'
  }
]

const ConnectorArrow = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
    className="flex items-center justify-center mx-4 relative"
  >
    <div className="w-14 h-14 bg-gradient-to-br from-gray-400 via-gray-500 to-gray-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-gray-200/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <ArrowRight className="w-7 h-7 text-white drop-shadow-sm" />
    </div>
    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse shadow-md" />
  </motion.div>
)

const FlowchartStep = ({ step, index }: { step: FlowStep; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="flex-1 min-w-0 group"
  >
    <Card className={cn(
      "h-full transition-all duration-500 hover:shadow-2xl border-2 overflow-hidden relative",
      step.borderColor,
      step.ringColor,
      "hover:scale-[1.02] hover:ring-4 hover:ring-opacity-50"
    )}>
      {/* Animated top accent */}
      <div className={cn("h-2 relative overflow-hidden", step.bgColor)}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer" />
      </div>
      
      <CardHeader className={cn("pb-4 relative", step.bgColor)}>
        <div className="flex items-center gap-4 mb-3">
          <div className={cn(
            "p-3 rounded-xl shadow-lg flex-shrink-0 relative overflow-hidden ring-2 ring-white/30",
            step.iconBg
          )}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <div className="text-white relative z-10">
              {step.icon}
            </div>
          </div>
          <Badge 
            variant="secondary" 
            className="text-sm font-bold px-3 py-1 bg-white/80 backdrop-blur-sm shadow-md"
          >
            Step {step.id}
          </Badge>
        </div>
        
        <CardTitle className={cn("text-xl font-bold mb-2 leading-tight", step.color)}>
          {step.title}
        </CardTitle>
        <p className="text-sm text-gray-600 leading-relaxed font-medium">
          {step.description}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0 pb-6">
        <div className="space-y-3">
          {step.substeps.map((substep, subIndex) => (
            <motion.div
              key={subIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + subIndex * 0.08 + 0.3 }}
              className="flex items-start gap-3 group/item"
            >
              <div className="relative flex-shrink-0 mt-1">
                <div className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300 group-hover/item:scale-125",
                  step.color.replace('text-', 'bg-')
                )} />
                <div className={cn(
                  "absolute inset-0 w-2 h-2 rounded-full animate-ping opacity-20",
                  step.color.replace('text-', 'bg-')
                )} />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed font-medium group-hover/item:text-gray-900 transition-colors duration-200">
                {substep}
              </p>
            </motion.div>
          ))}
        </div>
      </CardContent>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
        <div className={cn(
          "absolute top-0 right-0 w-8 h-8 transform rotate-45 translate-x-4 -translate-y-4 opacity-10",
          step.color.replace('text-', 'bg-')
        )} />
      </div>
    </Card>
  </motion.div>
)

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white/30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
                <Zap className="w-10 h-10 text-white drop-shadow-md" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full animate-pulse shadow-md" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            VAWT CFD Analysis
            <span className="block text-4xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Methodology Flowchart
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Complete methodology for <strong>Vertical Axis Wind Turbine</strong> CFD analysis
          </p>
        </motion.div>

        {/* Flowchart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-gray-200/50 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
          
          <div className="flex items-stretch gap-0 overflow-x-auto min-h-[450px] relative z-10">
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

        {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10"
        >
          <Card className="bg-gradient-to-r from-gray-50 via-white to-gray-50 shadow-2xl border border-gray-200/50 overflow-hidden">
            <CardContent className="p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-8 h-8 text-blue-600" />
                    <Cpu className="w-8 h-8 text-purple-600" />
                    <Database className="w-8 h-8 text-emerald-600" />
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                    <Shield className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Systematic CFD Analysis Approach
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  This comprehensive flowchart provides a <strong>proven methodology</strong> for VAWT CFD analysis, ensuring 
                  systematic coverage from turbulence characterization through rigorous validation for reliable simulation results.
                </p>
                
                <div className="mt-6 flex flex-wrap justify-center gap-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-sm" />
                    <span>Research Validated</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <div className="w-3 h-3 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-sm" />
                    <span>Industry Standard</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-sm" />
                    <span>Reproducible Method</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <div className="w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full shadow-sm" />
                    <span>ANSYS Fluent Ready</span>
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