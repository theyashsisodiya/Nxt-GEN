
import { useState } from "react";
import { Search, Clock, Star, Github, Award, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const categories = [
  { id: "all", name: "All Templates", count: 6 },
  { id: "cicd", name: "CI/CD", count: 1 },
  { id: "kubernetes", name: "Kubernetes", count: 1 },
  { id: "security", name: "Security", count: 1 },
  { id: "frontend", name: "Frontend", count: 1 },
  { id: "serverless", name: "Serverless", count: 1 },
  { id: "infrastructure", name: "Infrastructure", count: 1 }
];

const templates = [
  {
    id: 1,
    title: "CI/CD Pipeline for Python/Django",
    category: "cicd",
    difficulty: "intermediate",
    duration: "5-10 min",
    description: "Complete continuous integration and deployment pipeline for Django applications with testing, security scanning, and AWS deployment.",
    tools: ["GitHub", "Jenkins", "Docker", "AWS"],
    icon: Github,
    featured: true
  },
  {
    id: 2,
    title: "Microservices on Kubernetes with ArgoCD", 
    category: "kubernetes",
    difficulty: "advanced",
    duration: "15-20 min",
    description: "Deploy and manage microservices architecture on Kubernetes cluster with GitOps using ArgoCD for continuous deployment.",
    tools: ["GitHub", "Docker", "ArgoCD", "Kubernetes"],
    icon: Star,
    featured: false
  },
  {
    id: 3,
    title: "Security-First Node.js Deployment",
    category: "security", 
    difficulty: "intermediate",
    duration: "8-12 min",
    description: "Secure deployment pipeline with vulnerability scanning, code analysis, and hardened container deployment to production.",
    tools: ["GitHub", "Snyk", "Docker", "AWS"],
    icon: Shield,
    featured: false
  },
  {
    id: 4,
    title: "Multi-Environment React App",
    category: "frontend",
    difficulty: "beginner", 
    duration: "3-7 min",
    description: "Deploy React application to multiple environments (dev, staging, prod) with environment-specific configurations and approval gates.",
    tools: ["GitHub", "Netlify", "AWS", "Jenkins"],
    icon: Globe,
    featured: false
  },
  {
    id: 5,
    title: "Serverless API with AWS Lambda",
    category: "serverless",
    difficulty: "intermediate",
    duration: "6-10 min", 
    description: "Build and deploy serverless REST API using AWS Lambda, API Gateway, and DynamoDB with automated testing and monitoring.",
    tools: ["GitHub", "AWS Lambda", "API Gateway", "DynamoDB"],
    icon: Zap,
    featured: false
  },
  {
    id: 6,
    title: "Infrastructure as Code with Terraform",
    category: "infrastructure",
    difficulty: "advanced",
    duration: "12-18 min",
    description: "Provision and manage cloud infrastructure using Terraform with state management, modules, and multi-environment support.",
    tools: ["GitHub", "Terraform", "AWS", "Terraform Cloud"],
    icon: Award,
    featured: false
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner": return "status-success";
    case "intermediate": return "status-warning"; 
    case "advanced": return "status-error";
    default: return "status-pending";
  }
};

const UseCases = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tools.some(tool => tool.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Use Case Library</h1>
        <p className="text-xl text-muted-foreground">
          Get started quickly with pre-built workflow templates for common DevOps scenarios.
        </p>
      </div>

      {/* Search and Categories */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border rounded-xl h-12"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="rounded-xl"
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="template-card group">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                  <template.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                {template.featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors">
                {template.title}
              </CardTitle>
              
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
                  {template.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {template.duration}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <CardDescription className="text-muted-foreground">
                {template.description}
              </CardDescription>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Required Tools:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1 rounded-xl modern-button">
                    Use Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="modern-panel">
          <div className="modern-panel-content text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all templates.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 rounded-xl"
            >
              Clear Filters
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UseCases;
