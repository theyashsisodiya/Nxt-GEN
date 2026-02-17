
import { useState } from "react";
import {
    Key, Shield, Plus, Lock, MoreVertical, Trash2, RefreshCw,
    CheckCircle, AlertCircle, Clock, KeyRound, ChevronRight,
    Copy, Eye, EyeOff, Download, Edit, Check, X, Settings,
    Container, Cog, Ship, GitBranch, Cloud, Github, GitlabIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Credential {
    id: string;
    name: string;
    service: string;
    type: string;
    status: 'active' | 'unused' | 'expired';
    lastUsed: string;
    created: string;
    value: string;
}

const initialCredentials: Credential[] = [
    { id: '1', name: 'Docker Hub Registry', service: 'Docker', type: 'API Token', status: 'active', lastUsed: '8/2/2026', created: '1/1/2026', value: 'dckr_pat_1234567890abcdefghijklmnopqrstuvwxyz' },
    { id: '2', name: 'Jenkins Admin', service: 'Jenkins', type: 'Username/Password', status: 'active', lastUsed: '9/2/2026', created: '15/1/2026', value: 'admin:J3nk1n$P@ssw0rd!2026' },
    { id: '3', name: 'K8s Cluster Access', service: 'Kubernetes', type: 'Kubeconfig', status: 'active', lastUsed: '9/2/2026', created: '20/1/2026', value: 'apiVersion: v1\nclusters:\n- cluster:\n    certificate-authority-data: LS0tLS1...\n    server: https://k8s.nxtgen.ai:6443\n  name: production' },
    { id: '4', name: 'GitLab Deploy Key', service: 'GitLab', type: 'SSH Key', status: 'unused', lastUsed: '2/2/2026', created: '5/2/2026', value: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGRq...' },
    { id: '5', name: 'AWS Production', service: 'AWS', type: 'Access Key', status: 'active', lastUsed: '9/2/2026', created: '10/1/2026', value: 'AKIAIOSFODNN7EXAMPLE:wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY' },
    { id: '6', name: 'GitHub Actions', service: 'GitHub', type: 'Personal Access Token', status: 'active', lastUsed: '9/2/2026', created: '5/1/2026', value: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' },
];

// Professional SVG icons for services
const ServiceIcon = ({ service }: { service: string }) => {
    const iconClass = "w-5 h-5";

    switch (service) {
        case 'Docker':
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.119a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" />
                </svg>
            );
        case 'Jenkins':
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.609 19.066c-1.016-.315-1.678-.89-2.137-1.861-.266-.563-.357-.882-.357-1.244 0-.3.038-.47.15-.662.144-.248.358-.385.635-.407.262-.02.502.122.693.41.066.1.197.378.29.616.203.519.352.79.567 1.026.284.31.617.464 1.043.482.25.01.321-.002.507-.09.259-.122.443-.336.523-.61.047-.16.052-.258.032-.54-.037-.487-.146-.846-.474-1.55-.32-.69-.37-.855-.37-1.245 0-.43.108-.728.397-1.086.315-.392.767-.668 1.263-.773.163-.034.22-.066.31-.17.123-.143.24-.462.24-.656 0-.078-.054-.24-.133-.4-.216-.434-.247-.622-.147-.887.098-.258.296-.436.557-.499.156-.037.16-.04.11-.13-.056-.106-.24-.3-.424-.447-.087-.07-.158-.14-.158-.157 0-.023.232-.054.67-.09.744-.06.91-.084 1.2-.173.155-.048.288-.082.297-.076.009.005-.05.1-.132.21-.116.153-.174.265-.22.427-.089.306-.068.617.06.893l.073.158.274-.203c.368-.273.702-.432 1.224-.581.34-.097.487-.117.962-.129.636-.015.97.032 1.51.212.254.085.688.287.688.32 0 .01-.042.05-.093.088-.22.164-.313.308-.347.534-.037.244.04.433.266.655.172.167.294.238.69.395.604.24.965.5 1.227.884.246.361.353.725.35 1.19-.003.587-.187 1.12-.558 1.622-.174.235-.63.698-.83.842l-.112.082.186.28c.227.342.59.77 1.026 1.21.68.686 1.26 1.088 2.086 1.447l.26.113-.048.178c-.068.256-.124.386-.245.567-.174.262-.487.564-.766.74-.66.416-1.527.595-2.72.56-.858-.025-1.498-.144-2.476-.46-.69-.223-.86-.267-1.01-.265-.187.003-.393.095-.53.236-.128.133-.24.334-.415.747l-.168.4.118.003c.233.007.58.117.81.257.21.127.487.405.625.625.204.324.367.847.36 1.155l-.004.163-.237-.062c-.498-.13-.71-.162-1.19-.176-.608-.018-.978.034-1.498.21l-.156.054v-.17c0-.235-.077-.515-.205-.745-.214-.384-.604-.674-1.05-.78-.103-.024-.198-.05-.21-.058-.03-.02.073-.314.185-.53.133-.256.187-.416.217-.639.041-.301-.008-.577-.164-.922-.13-.29-.165-.418-.165-.606 0-.234.06-.398.185-.502.095-.08.294-.144.434-.14.158.004.318.085.41.206.098.13.098.325 0 .476-.063.098-.07.136-.04.22.08.231.245.375.455.399.215.024.426-.1.53-.31.08-.164.086-.45.01-.614-.105-.232-.35-.445-.63-.547-.395-.146-.928-.04-1.28.253-.363.302-.523.69-.49 1.19.023.374.108.602.358 1.005.234.375.34.618.374.864.05.356-.028.553-.375 1.002-.2.26-.237.333-.237.472 0 .126.03.203.137.36.187.275.5.508.828.617.24.08.713.107.998.057.587-.104 1.035-.406 1.33-.896.226-.377.305-.702.305-1.25 0-.22.01-.275.055-.29.067-.024.604.18.91.346.523.283.89.605 1.13.994.086.139.226.425.226.462 0 .01-.117.055-.26.1-.552.174-.99.436-1.32.79-.433.464-.6 1.004-.523 1.692.032.285.05.334.147.389.33.19.715-.023.802-.444.04-.19.012-.47-.06-.63-.06-.134-.23-.315-.35-.376-.077-.04-.08-.047-.034-.075.28-.167.853-.25 1.184-.17.422.1.79.408 1.025.855.163.31.17.343.17.792 0 .4-.012.502-.097.762-.184.565-.62 1.14-1.09 1.436-.427.266-.998.394-1.64.366-.476-.02-.834-.1-1.343-.3-.494-.192-.798-.373-1.308-.776-.59-.467-.825-.607-1.132-.675-.41-.09-.728.007-1.32.403-.36.24-.47.297-.667.35-.258.068-.607.055-.85-.033z" />
                </svg>
            );
        case 'Kubernetes':
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.778zm1.5-2.449a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594H9.261a1.6 1.6 0 0 1-1.247-.594l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L3.823 5.75a1.6 1.6 0 0 1 .941-1.048L10.973.638a1.6 1.6 0 0 1 1.206 0l6.21 4.063a1.6 1.6 0 0 1 .94 1.049l1.892 7.441a1.584 1.584 0 0 1-.307 1.34zm-2.036-7.602l-1.766-6.96a.8.8 0 0 0-.47-.524L11.79.414a.8.8 0 0 0-.603 0l-6.236 4.074a.8.8 0 0 0-.47.524l-1.767 6.96a.8.8 0 0 0 .154.67l5.778 7.18a.8.8 0 0 0 .623.298h5.462a.8.8 0 0 0 .623-.297l5.778-7.18a.792.792 0 0 0 .153-.67z" />
                </svg>
            );
        case 'GitLab':
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="m23.6 9.593-.033-.086L20.3.98a.851.851 0 0 0-.336-.405.875.875 0 0 0-1.003.073.868.868 0 0 0-.254.457L16.67 7.492H7.33L5.293 1.105a.859.859 0 0 0-.255-.457.871.871 0 0 0-.545-.222.877.877 0 0 0-.458.148.858.858 0 0 0-.337.406L.433 9.507l-.032.086a6.066 6.066 0 0 0 2.012 7.01l.011.008.028.02 4.986 3.734 2.467 1.867 1.502 1.135a1.014 1.014 0 0 0 1.227 0l1.502-1.135 2.467-1.867 5.014-3.754.012-.01a6.072 6.072 0 0 0 2.011-7.008z" />
                </svg>
            );
        case 'AWS':
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.838.296zm6.41.862c-.144 0-.24-.024-.304-.08-.064-.048-.12-.16-.168-.311l-1.876-6.17a2.19 2.19 0 0 1-.08-.335c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.215l-1.923 6.17c-.048.159-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.216-.151-.24-.23a.598.598 0 0 1-.04-.2v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.216.878.28.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.415-.287-.806-.399l-1.157-.36c-.583-.183-1.014-.454-1.277-.807a1.856 1.856 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167zM21.698 16.207c-2.626 1.94-6.442 2.969-9.722 2.969-4.598 0-8.74-1.7-11.87-4.526-.247-.223-.024-.527.272-.351 3.384 1.963 7.559 3.153 11.877 3.153 2.914 0 6.114-.607 9.06-1.852.439-.2.814.287.383.607zM22.792 14.961c-.336-.43-2.22-.207-3.074-.103-.255.032-.295-.192-.063-.36 1.5-1.053 3.967-.75 4.254-.399.287.36-.08 2.826-1.485 4.007-.215.184-.423.088-.327-.151.32-.79 1.03-2.57.695-2.994z" />
                </svg>
            );
        case 'GitHub':
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
            );
        default:
            return <Key className={iconClass} />;
    }
};

export function Credentials() {
    const [credentials, setCredentials] = useState<Credential[]>(initialCredentials);
    const [viewCredential, setViewCredential] = useState<Credential | null>(null);
    const [showValue, setShowValue] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'active': return { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/25' };
            case 'unused': return { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/25' };
            case 'expired': return { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/25' };
            default: return { bg: 'bg-slate-500/15', text: 'text-slate-400', border: 'border-slate-500/25' };
        }
    };

    const getServiceColor = (service: string) => {
        const colors: Record<string, string> = {
            'Docker': 'text-blue-400 bg-blue-500/10',
            'Jenkins': 'text-red-400 bg-red-500/10',
            'Kubernetes': 'text-cyan-400 bg-cyan-500/10',
            'GitLab': 'text-orange-400 bg-orange-500/10',
            'AWS': 'text-amber-400 bg-amber-500/10',
            'GitHub': 'text-purple-400 bg-purple-500/10',
        };
        return colors[service] || 'text-gray-400 bg-gray-500/10';
    };

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = (id: string) => {
        setCredentials(prev => prev.filter(c => c.id !== id));
    };

    const stats = [
        { label: 'Total', value: credentials.length.toString(), sublabel: 'Stored securely', icon: Lock, gradient: 'from-violet-500 to-purple-600' },
        { label: 'Active', value: credentials.filter(c => c.status === 'active').length.toString(), sublabel: 'Recently used', icon: CheckCircle, gradient: 'from-emerald-500 to-green-600' },
        { label: 'Unused', value: credentials.filter(c => c.status === 'unused').length.toString(), sublabel: 'Need attention', icon: AlertCircle, gradient: 'from-amber-500 to-orange-600' },
        { label: 'Services', value: new Set(credentials.map(c => c.service)).size.toString(), sublabel: 'Integrated', icon: Shield, gradient: 'from-cyan-500 to-blue-600' },
    ];

    return (
        <div className="space-y-6 animate-fade-in max-w-full">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-gradient-primary tracking-tight">
                                Credentials Vault
                            </h1>
                            <Badge variant="outline" className="text-[10px] border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold uppercase tracking-wider">
                                <Lock className="w-3 h-3 mr-1" />
                                Encrypted
                            </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Securely manage API keys, tokens, and access credentials
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="rounded-xl gap-2 btn-premium text-primary-foreground">
                                <Plus className="w-4 h-4" />
                                Add Credential
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-card/98 backdrop-blur-2xl border-border/30">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                    <KeyRound className="w-5 h-5 text-primary" />
                                    Add New Credential
                                </DialogTitle>
                                <DialogDescription>
                                    Add a new secret, key, or token to your vault.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-sm">Name</Label>
                                    <Input id="name" placeholder="e.g. Production AWS Key" className="bg-muted/30 border-border/40 rounded-xl" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="service" className="text-sm">Service</Label>
                                    <Select>
                                        <SelectTrigger className="bg-muted/30 border-border/40 rounded-xl">
                                            <SelectValue placeholder="Select service" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-popover/98 backdrop-blur-xl border-border/30">
                                            <SelectItem value="aws">AWS</SelectItem>
                                            <SelectItem value="docker">Docker</SelectItem>
                                            <SelectItem value="github">GitHub</SelectItem>
                                            <SelectItem value="gitlab">GitLab</SelectItem>
                                            <SelectItem value="jenkins">Jenkins</SelectItem>
                                            <SelectItem value="kubernetes">Kubernetes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="type" className="text-sm">Type</Label>
                                    <Select>
                                        <SelectTrigger className="bg-muted/30 border-border/40 rounded-xl">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-popover/98 backdrop-blur-xl border-border/30">
                                            <SelectItem value="api_key">API Key</SelectItem>
                                            <SelectItem value="ssh_key">SSH Key</SelectItem>
                                            <SelectItem value="token">Access Token</SelectItem>
                                            <SelectItem value="password">Password</SelectItem>
                                            <SelectItem value="file">Key File</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="value" className="text-sm">Value</Label>
                                    <Input id="value" type="password" placeholder="Enter secret value" className="bg-muted/30 border-border/40 rounded-xl" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="rounded-xl btn-premium text-primary-foreground">Save Credential</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Credentials List */}
                <div className="lg:col-span-2">
                    <Card className="gradient-card border-border/20">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10">
                                    <Key className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Stored Credentials</CardTitle>
                                    <CardDescription className="text-xs">
                                        All credentials are encrypted at rest and in transit
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-2">
                                {credentials.map((cred) => {
                                    const statusConfig = getStatusConfig(cred.status);
                                    const serviceColor = getServiceColor(cred.service);
                                    return (
                                        <div key={cred.id} className="p-4 rounded-xl border border-border/20 bg-muted/10 hover:bg-muted/20 transition-all duration-200 group">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2.5 rounded-xl border border-border/20 ${serviceColor}`}>
                                                        <ServiceIcon service={cred.service} />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{cred.name}</h3>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            <Badge variant="outline" className="text-[9px] border-border/30 text-muted-foreground font-medium">
                                                                {cred.service}
                                                            </Badge>
                                                            <span className="text-[9px] text-muted-foreground/50">•</span>
                                                            <span className="text-[9px] text-muted-foreground">{cred.type}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="text-right hidden sm:block">
                                                        <Badge variant="outline" className={`text-[9px] uppercase tracking-wider font-semibold ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                                                            {cred.status}
                                                        </Badge>
                                                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground justify-end mt-1">
                                                            <Clock className="w-3 h-3" />
                                                            {cred.lastUsed}
                                                        </div>
                                                    </div>

                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-popover/98 backdrop-blur-xl border-border/30 rounded-xl w-48">
                                                            <DropdownMenuItem
                                                                className="rounded-lg cursor-pointer"
                                                                onClick={() => setViewCredential(cred)}
                                                            >
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                View Credential
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="rounded-lg cursor-pointer"
                                                                onClick={() => copyToClipboard(cred.value, cred.id)}
                                                            >
                                                                {copiedId === cred.id ? (
                                                                    <>
                                                                        <Check className="w-4 h-4 mr-2 text-emerald-400" />
                                                                        Copied!
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <Copy className="w-4 h-4 mr-2" />
                                                                        Copy Value
                                                                    </>
                                                                )}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="rounded-lg cursor-pointer">
                                                                <Download className="w-4 h-4 mr-2" />
                                                                Export
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-border/30" />
                                                            <DropdownMenuItem className="rounded-lg cursor-pointer">
                                                                <Edit className="w-4 h-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="rounded-lg cursor-pointer">
                                                                <RefreshCw className="w-4 h-4 mr-2" />
                                                                Rotate Key
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-border/30" />
                                                            <DropdownMenuItem
                                                                className="rounded-lg cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/10"
                                                                onClick={() => handleDelete(cred.id)}
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>

                                                    <ChevronRight className="w-4 h-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Security Best Practices */}
                <div>
                    <Card className="gradient-card border-border/20 bg-gradient-to-br from-primary/5 to-accent/5">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                <CardTitle className="text-sm">Security Best Practices</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-0">
                            <div>
                                <h4 className="font-semibold text-xs mb-2 text-foreground uppercase tracking-wider">Management</h4>
                                <ul className="space-y-2">
                                    {[
                                        'Rotate credentials every 90 days',
                                        'Use least-privilege access',
                                        'Monitor usage and logs',
                                        'Remove unused credentials'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-semibold text-xs mb-2 text-foreground uppercase tracking-wider">Security Features</h4>
                                <ul className="space-y-2">
                                    {[
                                        'AES-256 encryption',
                                        'Zero-knowledge architecture',
                                        'Audit logs for all operations',
                                        'Automatic expiry detection'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                            <Shield className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* View Credential Modal */}
            {viewCredential && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg">
                        <CardHeader className="pb-4 border-b border-border/50">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2.5 rounded-xl border border-border/20 ${getServiceColor(viewCredential.service)}`}>
                                        <ServiceIcon service={viewCredential.service} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{viewCredential.name}</CardTitle>
                                        <CardDescription className="text-xs">{viewCredential.service} • {viewCredential.type}</CardDescription>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => { setViewCredential(null); setShowValue(false); }}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs text-muted-foreground">Credential Value</Label>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs gap-1"
                                            onClick={() => setShowValue(!showValue)}
                                        >
                                            {showValue ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                            {showValue ? 'Hide' : 'Show'}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs gap-1"
                                            onClick={() => copyToClipboard(viewCredential.value, 'modal')}
                                        >
                                            {copiedId === 'modal' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                            {copiedId === 'modal' ? 'Copied!' : 'Copy'}
                                        </Button>
                                    </div>
                                </div>
                                <div className="relative">
                                    {viewCredential.type === 'Kubeconfig' || viewCredential.value.includes('\n') ? (
                                        <Textarea
                                            value={showValue ? viewCredential.value : '•'.repeat(40)}
                                            readOnly
                                            className="bg-muted/30 border-border/40 rounded-xl font-mono text-sm min-h-[120px]"
                                        />
                                    ) : (
                                        <Input
                                            type={showValue ? 'text' : 'password'}
                                            value={viewCredential.value}
                                            readOnly
                                            className="bg-muted/30 border-border/40 rounded-xl font-mono text-sm"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground uppercase">Status</Label>
                                    <Badge variant="outline" className={`text-[10px] ${getStatusConfig(viewCredential.status).bg} ${getStatusConfig(viewCredential.status).text}`}>
                                        {viewCredential.status}
                                    </Badge>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground uppercase">Last Used</Label>
                                    <p className="text-sm font-medium">{viewCredential.lastUsed}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground uppercase">Created</Label>
                                    <p className="text-sm font-medium">{viewCredential.created}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] text-muted-foreground uppercase">Type</Label>
                                    <p className="text-sm font-medium">{viewCredential.type}</p>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2 border-t border-border/50">
                                <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-1">
                                    <RefreshCw className="w-3 h-3" />
                                    Rotate
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-1">
                                    <Download className="w-3 h-3" />
                                    Export
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 rounded-xl gap-1 text-red-400 hover:text-red-400 hover:bg-red-500/10" onClick={() => { handleDelete(viewCredential.id); setViewCredential(null); }}>
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default Credentials;
