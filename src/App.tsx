import './App.css'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-header1-b text-primary mb-4">Welcome to MOPL</h1>
        <p className="text-body2-m text-muted-foreground">
          프로젝트 초기 설정이 완료되었습니다.
        </p>
        <p className="text-caption1-m text-gray-500">
          Tailwind CSS와 shadcn/ui가 적용되었습니다.
        </p>
        <div className="flex gap-4 justify-center">
          <Button>Primary Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>
    </div>
  )
}

export default App
