
import { useState } from "react";
import { MessageCircle, Star, Send, Lightbulb, Bug, Heart, ThumbsUp, ArrowUpRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Feedback = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: number) => {
    setRating(value);
  };

  const stats = [
    { label: 'Submitted', value: '1,247', sublabel: 'This month', icon: MessageCircle, gradient: 'from-violet-500 to-purple-600' },
    { label: 'Implemented', value: '23', sublabel: 'From requests', icon: Lightbulb, gradient: 'from-amber-500 to-orange-600' },
    { label: 'Bugs Fixed', value: '87', sublabel: 'Last 30 days', icon: Bug, gradient: 'from-emerald-500 to-green-600' },
    { label: 'Satisfaction', value: '4.8/5', sublabel: 'Average rating', icon: Heart, gradient: 'from-red-500 to-rose-600' },
  ];

  const recentFeedback = [
    { id: 1, type: "Feature", title: "Add support for GitLab runners", status: "In Progress", votes: 23, date: "2 days ago" },
    { id: 2, type: "Bug", title: "Docker build timeout issues", status: "Fixed", votes: 15, date: "1 week ago" },
    { id: 3, type: "Feature", title: "Workflow templates library", status: "Planned", votes: 31, date: "2 weeks ago" }
  ];

  const roadmapItems = {
    inProgress: ['GitLab CI/CD integration', 'Advanced workflow templates', 'Mobile app for monitoring'],
    planned: ['Multi-cloud deployment', 'AI-powered optimization', 'Custom integrations SDK'],
    completed: ['Real-time log streaming', 'Workflow error recovery', 'Enhanced security model']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Fixed': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25';
      case 'In Progress': return 'bg-blue-500/15 text-blue-400 border-blue-500/25';
      default: return 'bg-amber-500/15 text-amber-400 border-amber-500/25';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold text-gradient-primary tracking-tight">
                Feedback Center
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              Help us improve the Nxt-Gen platform with your valuable feedback
            </p>
          </div>
          <Badge variant="outline" className="text-[10px] border-primary/30 bg-primary/10 text-primary font-semibold uppercase tracking-wider">
            <Heart className="w-3 h-3 mr-1" />
            Your Voice Matters
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="gradient-card border-border/20 group overflow-hidden">
            <CardContent className="p-4 relative">
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${stat.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
              <div className="flex items-start justify-between relative">
                <div className="space-y-0.5">
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground">{stat.sublabel}</p>
                </div>
                <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <Card className="gradient-card border-border/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10">
                <Send className="w-4 h-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Submit Feedback</CardTitle>
                <CardDescription className="text-xs">
                  Share thoughts, report bugs, or request features
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4 bg-muted/30 rounded-xl p-1 h-10">
                <TabsTrigger value="general" className="rounded-lg text-xs data-[state=active]:bg-background">General</TabsTrigger>
                <TabsTrigger value="bug" className="rounded-lg text-xs data-[state=active]:bg-background">Bug Report</TabsTrigger>
                <TabsTrigger value="feature" className="rounded-lg text-xs data-[state=active]:bg-background">Feature</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-0">
                <div className="space-y-2">
                  <Label className="text-xs">How would you rate your experience?</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 cursor-pointer transition-all ${star <= rating ? "fill-amber-400 text-amber-400 scale-110" : "text-muted-foreground/30 hover:text-amber-400/50"
                          }`}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="general-feedback" className="text-xs">Your Feedback</Label>
                  <Textarea
                    id="general-feedback"
                    placeholder="Tell us about your experience..."
                    rows={4}
                    className="bg-muted/30 border-border/40 rounded-xl text-sm resize-none"
                  />
                </div>
                <Button className="w-full rounded-xl btn-premium text-primary-foreground h-9">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </Button>
              </TabsContent>

              <TabsContent value="bug" className="space-y-4 mt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="bug-title" className="text-xs">Bug Title</Label>
                  <Input id="bug-title" placeholder="Brief description of the bug" className="bg-muted/30 border-border/40 rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bug-steps" className="text-xs">Steps to Reproduce</Label>
                  <Textarea
                    id="bug-steps"
                    placeholder="1. Go to...&#10;2. Click on...&#10;3. Expected vs actual..."
                    rows={3}
                    className="bg-muted/30 border-border/40 rounded-xl text-sm resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Severity</Label>
                  <RadioGroup defaultValue="medium" className="flex gap-4">
                    {[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' }
                    ].map((item) => (
                      <div key={item.value} className="flex items-center gap-1.5">
                        <RadioGroupItem value={item.value} id={item.value} className="h-3.5 w-3.5" />
                        <Label htmlFor={item.value} className="text-xs text-muted-foreground cursor-pointer">{item.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button className="w-full rounded-xl bg-red-500 hover:bg-red-600 text-white h-9">
                  <Bug className="w-4 h-4 mr-2" />
                  Report Bug
                </Button>
              </TabsContent>

              <TabsContent value="feature" className="space-y-4 mt-0">
                <div className="space-y-1.5">
                  <Label htmlFor="feature-title" className="text-xs">Feature Title</Label>
                  <Input id="feature-title" placeholder="What feature would you like?" className="bg-muted/30 border-border/40 rounded-xl h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="feature-description" className="text-xs">Description</Label>
                  <Textarea
                    id="feature-description"
                    placeholder="Describe the feature and how it would help..."
                    rows={4}
                    className="bg-muted/30 border-border/40 rounded-xl text-sm resize-none"
                  />
                </div>
                <Button className="w-full rounded-xl bg-accent hover:bg-accent/90 text-white h-9">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Feedback */}
        <Card className="gradient-card border-border/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10">
                <Sparkles className="w-4 h-4 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg">Community Feedback</CardTitle>
                <CardDescription className="text-xs">
                  See what others are suggesting and vote
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {recentFeedback.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border border-border/20 rounded-xl hover:bg-muted/20 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`text-[9px] ${item.type === "Bug" ? "bg-red-500/15 text-red-400 border-red-500/25" : "bg-cyan-500/15 text-cyan-400 border-cyan-500/25"
                          }`}>
                          {item.type}
                        </Badge>
                        <Badge variant="outline" className={`text-[9px] ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-sm text-foreground truncate">{item.title}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{item.date}</p>
                    </div>
                    <div className="text-center ml-3 flex-shrink-0">
                      <div className="text-sm font-bold text-primary">{item.votes}</div>
                      <Button variant="ghost" size="sm" className="text-[10px] h-6 px-2 text-muted-foreground hover:text-primary">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        Vote
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 rounded-xl border-border/30 h-9 text-sm">
              View All Feedback
              <ArrowUpRight className="w-3.5 h-3.5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap */}
      <Card className="gradient-card border-border/20">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <CheckCircle2 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Development Roadmap</CardTitle>
              <CardDescription className="text-xs">
                See what we're working on based on your feedback
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'In Progress', items: roadmapItems.inProgress, color: 'blue', icon: Clock },
              { title: 'Planned', items: roadmapItems.planned, color: 'amber', icon: Lightbulb },
              { title: 'Completed', items: roadmapItems.completed, color: 'emerald', icon: CheckCircle2 }
            ].map((section) => (
              <div key={section.title}>
                <h4 className={`font-medium text-sm mb-3 text-${section.color}-400 flex items-center gap-2`}>
                  <div className={`w-2 h-2 bg-${section.color}-400 rounded-full ${section.title === 'In Progress' ? 'animate-pulse' : ''}`} />
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className={`w-1 h-1 bg-${section.color}-400/50 rounded-full mt-1.5 flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Feedback;