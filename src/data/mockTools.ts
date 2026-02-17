
export interface MockTool {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error' | 'warning';
  progress: number;
  commands: string[];
  logs: string[];
  metadata: Record<string, string>;
  error?: string;
}

export const mockTools: MockTool[] = [
  {
    name: "GitHub",
    status: "success",
    progress: 100,
    commands: [
      "git clone https://github.com/user/react-app.git",
      "git checkout main",
      "git pull origin main",
      "git status"
    ],
    logs: [
      "Successfully cloned repository",
      "Switched to branch 'main'",
      "Already up to date",
      "Working tree clean"
    ],
    metadata: {
      "Repository": "user/react-app",
      "Branch": "main",
      "Last Commit": "a1b2c3d",
      "Author": "John Doe"
    }
  },
  {
    name: "Docker",
    status: "success",
    progress: 100,
    commands: [
      "docker build -t react-app:latest .",
      "docker tag react-app:latest registry.io/react-app:v1.0",
      "docker push registry.io/react-app:v1.0",
      "docker images"
    ],
    logs: [
      "Building Docker image...",
      "Successfully built image",
      "Tagged react-app:latest",
      "Pushed to registry successfully"
    ],
    metadata: {
      "Image ID": "sha256:abc123...",
      "Size": "245 MB",
      "Registry": "registry.io",
      "Tag": "v1.0"
    }
  },
  {
    name: "Jenkins",
    status: "running",
    progress: 65,
    commands: [
      "jenkins-cli build ReactApp-Pipeline",
      "jenkins-cli console ReactApp-Pipeline #42",
      "jenkins-cli get-job ReactApp-Pipeline"
    ],
    logs: [
      "Started build #42",
      "Running unit tests...",
      "Tests passed (18/18)",
      "Starting integration tests..."
    ],
    metadata: {
      "Build Number": "#42",
      "Started By": "SCM Change",
      "Duration": "4m 32s",
      "Workspace": "/var/jenkins/workspace/ReactApp"
    }
  },
  {
    name: "Kubernetes",
    status: "pending",
    progress: 0,
    commands: [
      "kubectl apply -f deployment.yaml",
      "kubectl apply -f service.yaml",
      "kubectl get pods -n production",
      "kubectl rollout status deployment/react-app"
    ],
    logs: [
      "Waiting for Jenkins build to complete...",
      "Deployment queued",
      "Waiting for Docker image"
    ],
    metadata: {
      "Namespace": "production",
      "Replicas": "3",
      "Service Type": "LoadBalancer",
      "Port": "80"
    }
  }
];
