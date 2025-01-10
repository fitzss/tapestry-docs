// docs/components/monitoring/TaskMonitor.js

export class TaskMonitor {
  constructor(onStatusUpdate) {
    this.onStatusUpdate = onStatusUpdate;
    this.activeTasks = new Map();
  }
  
  startMonitoring(taskId, plan) {
    this.activeTasks.set(taskId, {
      plan,
      startTime: Date.now(),
      currentStep: 0,
      status: 'running'
    });
    
    this.monitorTask(taskId);
  }
  
  async monitorTask(taskId) {
    const task = this.activeTasks.get(taskId);
    if (!task) return;
    
    while (task.currentStep < task.plan.steps.length) {
      const step = task.plan.steps[task.currentStep];
      
      await new Promise(resolve => 
        setTimeout(resolve, step.estimatedDuration * 1000)
      );
      
      task.currentStep++;
      this.onStatusUpdate({
        taskId,
        progress: (task.currentStep / task.plan.steps.length) * 100,
        currentStep: step,
        timeElapsed: (Date.now() - task.startTime) / 1000
      });
    }
    
    this.activeTasks.delete(taskId);
    this.onStatusUpdate({
      taskId,
      status: 'completed',
      timeElapsed: (Date.now() - task.startTime) / 1000
    });
  }
}
