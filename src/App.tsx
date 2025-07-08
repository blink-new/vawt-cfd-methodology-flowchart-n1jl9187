import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Button } from './components/ui/button'
import { ChevronRight, ChevronDown, Wind, Settings, BarChart3, CheckCircle, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from './lib/utils'

interface FlowStep {
  id: string
  title: string
  description: string
  substeps: string[]
  icon: React.ReactNode
  color: string
  bgColor: string
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
    icon: <Wind className="w-5 h-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
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
    icon: <Settings className="w-5 h-5" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
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
    icon: <Activity className="w-5 h-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
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
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
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
    icon: <CheckCircle className="w-5 h-5" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
]

function FlowchartStep({ step, index, isExpanded, onToggle }: {
  step: FlowStep
  index: number
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="relative"
      >
        <Card className={cn(
          "transition-all duration-300 hover:shadow-lg cursor-pointer border-2",
          isExpanded ? "shadow-lg border-primary" : "border-gray-200 hover:border-gray-300"
        )}>
          <CardHeader 
            className={cn("pb-3", step.bgColor)}
            onClick={onToggle}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-full bg-white shadow-sm", step.color)}>
                  {step.icon}
                </div>
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      Step {step.id}
                    </Badge>
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1">
                    {step.description}
                  </CardDescription>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.div>
            </div>
          </CardHeader>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {step.substeps.map((substep, subIndex) => (
                      <motion.div
                        key={subIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: subIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", step.color.replace('text-', 'bg-'))} />
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {substep}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
      
      {/* Connection Arrow */}
      {index < flowSteps.length - 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
          className="flex justify-center my-4"
        >
          <div className="w-8 h-8 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full flex items-center justify-center shadow-sm">
            <ChevronDown className="w-4 h-4 text-white" />
          </div>
        </motion.div>
      )}
    </div>
  )
}

function App() {
  const [expandedStep, setExpandedStep] = useState<string | null>(null)
  const [expandAll, setExpandAll] = useState(false)

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId)
  }

  const toggleAll = () => {
    setExpandAll(!expandAll)
    setExpandedStep(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VAWT CFD Analysis Methodology
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            A comprehensive flowchart outlining the complete methodology for Vertical Axis Wind Turbine 
            (VAWT) CFD analysis, from turbulence modeling to validation.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={toggleAll}
              className="flex items-center gap-2"
            >
              {expandAll ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {expandAll ? 'Collapse All' : 'Expand All'}
            </Button>
          </div>
        </motion.div>

        {/* Flowchart */}
        <div className="space-y-0">
          {flowSteps.map((step, index) => (
            <FlowchartStep
              key={step.id}
              step={step}
              index={index}
              isExpanded={expandAll || expandedStep === step.id}
              onToggle={() => toggleStep(step.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-lg shadow-sm p-6 border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Methodology Overview
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              This flowchart represents a systematic approach to VAWT CFD analysis, ensuring comprehensive 
              coverage of all critical aspects from initial setup through validation. Each step builds upon 
              the previous one to provide reliable and accurate simulation results.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App