
import { useState } from "react";
import { Search, Settings, Check, Plus, ArrowUpRight, Puzzle, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Tool {
    id: string;
    name: string;
    category: string;
    description: string;
    iconType: string;
    connected: boolean;
    status: 'operational' | 'connecting' | 'error' | 'disconnected';
}

// Professional SVG icons for tools
const ToolIcon = ({ iconType, className = "w-5 h-5" }: { iconType: string; className?: string }) => {
    switch (iconType) {
        case 'argocd':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L2 6v12l10 6 10-6V6L12 0zm7.5 17.1L12 21l-7.5-3.9V7.1L12 3.2l7.5 3.9v10z" />
                    <path d="M12 6l-5 2.9v5.8l5 2.9 5-2.9V8.9L12 6zm3 7.5l-3 1.7-3-1.7V9.8l3-1.7 3 1.7v3.7z" />
                </svg>
            );
        case 'flux':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                    <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" />
                </svg>
            );
        case 'tekton':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 6v6l8 4 8-4V6l-8-4zm6 9l-6 3-6-3V7l6-3 6 3v4z" />
                    <path d="M4 14v4l8 4 8-4v-4l-8 4-8-4z" />
                </svg>
            );
        case 'terraform':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.283 3.125V9.58l5.48 3.167V6.292l-5.48-3.167zm6.334 3.653v6.457l5.48-3.167V3.61l-5.48 3.168zm-6.334 7.29v6.455l5.48 3.168v-6.457l-5.48-3.167zM1.903 6.292v6.457l5.48 3.167V9.458L1.903 6.292z" />
                </svg>
            );
        case 'pulumi':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18L18.82 7.5 12 10.82 5.18 7.5 12 4.18zM5 8.77l6 3.32v6.14l-6-3.32V8.77zm14 6.14l-6 3.32v-6.14l6-3.32v6.14z" />
                </svg>
            );
        case 'ansible':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" />
                    <path d="M12.7 7l3.8 9.7-5.7-4.5-2.4 1.8 6.6 4.8 1.5-1-4.8-12.3H10l2.7 1.5z" />
                </svg>
            );
        case 'github':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
            );
        case 'gitlab':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="m23.6 9.593-.033-.086L20.3.98a.851.851 0 0 0-.336-.405.875.875 0 0 0-1.003.073.868.868 0 0 0-.254.457L16.67 7.492H7.33L5.293 1.105a.859.859 0 0 0-.255-.457.871.871 0 0 0-.545-.222.877.877 0 0 0-.458.148.858.858 0 0 0-.337.406L.433 9.507l-.032.086a6.066 6.066 0 0 0 2.012 7.01l.011.008.028.02 4.986 3.734 2.467 1.867 1.502 1.135a1.014 1.014 0 0 0 1.227 0l1.502-1.135 2.467-1.867 5.014-3.754.012-.01a6.072 6.072 0 0 0 2.011-7.008z" />
                </svg>
            );
        case 'bitbucket':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.778 1.211a.768.768 0 0 0-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 0 0 .77-.646l3.27-20.03a.768.768 0 0 0-.768-.9zM14.52 15.53H9.522L8.17 8.466h7.561z" />
                </svg>
            );
        case 'docker':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
                </svg>
            );
        case 'podman':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <circle cx="8" cy="12" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <path d="M12 16c-2 0-3.5-1.5-3.5-1.5s1.5 2.5 3.5 2.5 3.5-2.5 3.5-2.5S14 16 12 16z" />
                </svg>
            );
        case 'jenkins':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.609 19.066c-1.016-.315-1.678-.89-2.137-1.861-.266-.563-.357-.882-.357-1.244 0-.3.038-.47.15-.662.144-.248.358-.385.635-.407.262-.02.502.122.693.41.066.1.197.378.29.616.203.519.352.79.567 1.026.284.31.617.464 1.043.482.25.01.321-.002.507-.09.259-.122.443-.336.523-.61.047-.16.052-.258.032-.54-.037-.487-.146-.846-.474-1.55-.32-.69-.37-.855-.37-1.245 0-.43.108-.728.397-1.086.315-.392.767-.668 1.263-.773.163-.034.22-.066.31-.17.123-.143.24-.462.24-.656 0-.078-.054-.24-.133-.4-.216-.434-.247-.622-.147-.887.098-.258.296-.436.557-.499.156-.037.16-.04.11-.13-.056-.106-.24-.3-.424-.447-.087-.07-.158-.14-.158-.157 0-.023.232-.054.67-.09.744-.06.91-.084 1.2-.173.155-.048.288-.082.297-.076.009.005-.05.1-.132.21-.116.153-.174.265-.22.427-.089.306-.068.617.06.893l.073.158.274-.203c.368-.273.702-.432 1.224-.581.34-.097.487-.117.962-.129.636-.015.97.032 1.51.212.254.085.688.287.688.32 0 .01-.042.05-.093.088-.22.164-.313.308-.347.534-.037.244.04.433.266.655.172.167.294.238.69.395.604.24.965.5 1.227.884.246.361.353.725.35 1.19-.003.587-.187 1.12-.558 1.622-.174.235-.63.698-.83.842l-.112.082.186.28c.227.342.59.77 1.026 1.21.68.686 1.26 1.088 2.086 1.447l.26.113-.048.178c-.068.256-.124.386-.245.567-.174.262-.487.564-.766.74-.66.416-1.527.595-2.72.56-.858-.025-1.498-.144-2.476-.46-.69-.223-.86-.267-1.01-.265-.187.003-.393.095-.53.236-.128.133-.24.334-.415.747l-.168.4.118.003c.233.007.58.117.81.257.21.127.487.405.625.625.204.324.367.847.36 1.155l-.004.163-.237-.062c-.498-.13-.71-.162-1.19-.176-.608-.018-.978.034-1.498.21l-.156.054v-.17c0-.235-.077-.515-.205-.745-.214-.384-.604-.674-1.05-.78-.103-.024-.198-.05-.21-.058-.03-.02.073-.314.185-.53.133-.256.187-.416.217-.639.041-.301-.008-.577-.164-.922-.13-.29-.165-.418-.165-.606 0-.234.06-.398.185-.502.095-.08.294-.144.434-.14.158.004.318.085.41.206.098.13.098.325 0 .476-.063.098-.07.136-.04.22.08.231.245.375.455.399.215.024.426-.1.53-.31.08-.164.086-.45.01-.614-.105-.232-.35-.445-.63-.547-.395-.146-.928-.04-1.28.253-.363.302-.523.69-.49 1.19.023.374.108.602.358 1.005.234.375.34.618.374.864.05.356-.028.553-.375 1.002-.2.26-.237.333-.237.472 0 .126.03.203.137.36.187.275.5.508.828.617.24.08.713.107.998.057.587-.104 1.035-.406 1.33-.896.226-.377.305-.702.305-1.25 0-.22.01-.275.055-.29.067-.024.604.18.91.346.523.283.89.605 1.13.994.086.139.226.425.226.462 0 .01-.117.055-.26.1-.552.174-.99.436-1.32.79-.433.464-.6 1.004-.523 1.692.032.285.05.334.147.389.33.19.715-.023.802-.444.04-.19.012-.47-.06-.63-.06-.134-.23-.315-.35-.376-.077-.04-.08-.047-.034-.075.28-.167.853-.25 1.184-.17.422.1.79.408 1.025.855.163.31.17.343.17.792 0 .4-.012.502-.097.762-.184.565-.62 1.14-1.09 1.436-.427.266-.998.394-1.64.366-.476-.02-.834-.1-1.343-.3-.494-.192-.798-.373-1.308-.776-.59-.467-.825-.607-1.132-.675-.41-.09-.728.007-1.32.403-.36.24-.47.297-.667.35-.258.068-.607.055-.85-.033z" />
                </svg>
            );
        case 'github-actions':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
            );
        case 'circleci':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.5 12a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0zm3.5-1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                </svg>
            );
        case 'kubernetes':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.778zm1.5-2.449a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594H9.261a1.6 1.6 0 0 1-1.247-.594l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L3.823 5.75a1.6 1.6 0 0 1 .941-1.048L10.973.638a1.6 1.6 0 0 1 1.206 0l6.21 4.063a1.6 1.6 0 0 1 .94 1.049l1.892 7.441a1.584 1.584 0 0 1-.307 1.34z" />
                </svg>
            );
        case 'nomad':
            return (
                <svg className={className} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.18L18.18 7 12 9.82 5.82 7 12 4.18zM5 8.82l6 3v6.36l-6-3V8.82zm14 6.36l-6 3V11.82l6-3v6.36z" />
                </svg>
            );
        default:
            return <Puzzle className={className} />;
    }
};

const toolsData: Tool[] = [
    // GitOps
    { id: 'argocd', name: 'ArgoCD', category: 'GitOps', description: 'Declarative GitOps continuous delivery tool for Kubernetes', iconType: 'argocd', connected: true, status: 'operational' },
    { id: 'flux', name: 'Flux', category: 'GitOps', description: 'GitOps toolkit for keeping Kubernetes clusters in sync', iconType: 'flux', connected: false, status: 'disconnected' },
    { id: 'tekton', name: 'Tekton', category: 'GitOps', description: 'Cloud native solution for building CI/CD systems', iconType: 'tekton', connected: false, status: 'disconnected' },

    // Infrastructure
    { id: 'terraform', name: 'Terraform', category: 'Infrastructure', description: 'Infrastructure as Code tool for building and managing infrastructure', iconType: 'terraform', connected: true, status: 'operational' },
    { id: 'pulumi', name: 'Pulumi', category: 'Infrastructure', description: 'Modern infrastructure as code platform using familiar languages', iconType: 'pulumi', connected: false, status: 'disconnected' },
    { id: 'ansible', name: 'Ansible', category: 'Infrastructure', description: 'Automation tool for configuration management and deployment', iconType: 'ansible', connected: false, status: 'disconnected' },

    // Source Code
    { id: 'github', name: 'GitHub', category: 'Source Code', description: 'Development platform for hosting and reviewing code', iconType: 'github', connected: true, status: 'operational' },
    { id: 'gitlab', name: 'GitLab', category: 'Source Code', description: 'Complete DevOps platform with Git repository management', iconType: 'gitlab', connected: false, status: 'disconnected' },
    { id: 'bitbucket', name: 'Bitbucket', category: 'Source Code', description: 'Git solution for professional teams with built-in CI/CD', iconType: 'bitbucket', connected: false, status: 'disconnected' },

    // Containerization
    { id: 'docker', name: 'Docker', category: 'Containerization', description: 'Platform for building, sharing, and running containerized applications', iconType: 'docker', connected: true, status: 'operational' },
    { id: 'podman', name: 'Podman', category: 'Containerization', description: 'Daemonless container engine for developing and managing containers', iconType: 'podman', connected: false, status: 'disconnected' },

    // CI/CD
    { id: 'jenkins', name: 'Jenkins', category: 'CI/CD', description: 'Open-source automation server for building and deploying', iconType: 'jenkins', connected: true, status: 'operational' },
    { id: 'github-actions', name: 'GitHub Actions', category: 'CI/CD', description: 'Workflow automation for GitHub repositories', iconType: 'github-actions', connected: false, status: 'disconnected' },
    { id: 'circleci', name: 'CircleCI', category: 'CI/CD', description: 'Continuous integration and delivery platform', iconType: 'circleci', connected: false, status: 'disconnected' },

    // Orchestration
    { id: 'kubernetes', name: 'Kubernetes', category: 'Orchestration', description: 'Container orchestration platform for automating deployment', iconType: 'kubernetes', connected: true, status: 'operational' },
    { id: 'nomad', name: 'Nomad', category: 'Orchestration', description: 'Flexible scheduler and orchestrator for containerized workloads', iconType: 'nomad', connected: false, status: 'disconnected' },
];

const categories = ['All', 'GitOps', 'Infrastructure', 'Source Code', 'Containerization', 'CI/CD', 'Orchestration'];

const getIconColor = (iconType: string) => {
    const colors: Record<string, string> = {
        'argocd': 'text-orange-400',
        'flux': 'text-blue-400',
        'tekton': 'text-purple-400',
        'terraform': 'text-violet-400',
        'pulumi': 'text-yellow-400',
        'ansible': 'text-red-400',
        'github': 'text-gray-300',
        'gitlab': 'text-orange-500',
        'bitbucket': 'text-blue-500',
        'docker': 'text-blue-400',
        'podman': 'text-purple-400',
        'jenkins': 'text-red-500',
        'github-actions': 'text-gray-300',
        'circleci': 'text-green-400',
        'kubernetes': 'text-cyan-400',
        'nomad': 'text-green-500',
    };
    return colors[iconType] || 'text-primary';
};

export function ToolIntegrations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [tools, setTools] = useState(toolsData);

    const filteredTools = tools.filter(tool => {
        const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const connectedCount = tools.filter(t => t.connected).length;
    const availableCount = tools.length - connectedCount;

    const toggleConnection = (id: string) => {
        setTools(tools.map(tool => {
            if (tool.id === id) {
                return {
                    ...tool,
                    connected: !tool.connected,
                    status: !tool.connected ? 'operational' : 'disconnected'
                };
            }
            return tool;
        }));
    };

    const getCategoryStats = (category: string) => {
        const catTools = tools.filter(t => t.category === category);
        const connected = catTools.filter(t => t.connected).length;
        return { connected, total: catTools.length };
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-full">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-gradient-primary tracking-tight">
                                Integrations
                            </h1>
                            <Badge variant="outline" className="text-[10px] border-primary/30 bg-primary/10 text-primary font-semibold uppercase tracking-wider">
                                {connectedCount} Active
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Connect and manage your DevOps tools for automated workflows
                        </p>
                    </div>
                    <Button size="sm" className="rounded-xl gap-2 btn-premium text-primary-foreground">
                        <Plus className="w-4 h-4" />
                        Add Custom
                    </Button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search tools..."
                        className="pl-9 bg-muted/30 border-border/40 rounded-xl h-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-xl whitespace-nowrap transition-all ${activeCategory === category
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Category Stats */}
            {activeCategory === 'All' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {categories.filter(c => c !== 'All').map(category => {
                        const stats = getCategoryStats(category);
                        return (
                            <Card key={category} className="gradient-card border-border/20 group hover:border-primary/20 transition-all">
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-1">{category}</span>
                                    <span className="text-lg font-bold">
                                        <span className="text-primary">{stats.connected}</span>
                                        <span className="text-muted-foreground/40 mx-0.5">/</span>
                                        <span className="text-muted-foreground">{stats.total}</span>
                                    </span>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredTools.map((tool) => (
                    <Card
                        key={tool.id}
                        className={`group transition-all duration-300 border-border/20 hover:border-primary/30 overflow-hidden ${tool.connected
                            ? 'gradient-card shadow-lg shadow-primary/5'
                            : 'bg-card/40 hover:bg-card/60'
                            }`}
                    >
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-3">
                                    <div className={`p-2.5 rounded-xl border shadow-sm ${tool.connected
                                        ? 'bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20'
                                        : 'bg-muted/30 border-border/30'
                                        } ${getIconColor(tool.iconType)}`}>
                                        <ToolIcon iconType={tool.iconType} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                                            {tool.name}
                                            {tool.connected && (
                                                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                    <Check className="w-2.5 h-2.5 text-emerald-400" />
                                                </div>
                                            )}
                                        </CardTitle>
                                        <Badge variant="outline" className="mt-1 text-[9px] bg-muted/30 text-muted-foreground border-border/30 font-medium">
                                            {tool.category}
                                        </Badge>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <CardDescription className="min-h-[36px] mb-4 text-xs leading-relaxed text-muted-foreground/80">
                                {tool.description}
                            </CardDescription>

                            <div className="flex items-center justify-between pt-3 border-t border-border/20">
                                <div className="flex items-center gap-2">
                                    <Switch
                                        checked={tool.connected}
                                        onCheckedChange={() => toggleConnection(tool.id)}
                                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-primary data-[state=checked]:to-accent scale-90"
                                    />
                                    <span className={`text-xs font-medium ${tool.connected ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {tool.connected ? 'Connected' : 'Connect'}
                                    </span>
                                </div>

                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                    <Settings className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredTools.length === 0 && (
                <Card className="gradient-card border-border/20">
                    <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="p-4 rounded-2xl bg-muted/30 mb-4">
                            <Puzzle className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No tools found</h3>
                        <p className="text-muted-foreground text-sm max-w-sm">
                            Try adjusting your search or filter to find the tools you're looking for.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default ToolIntegrations;
