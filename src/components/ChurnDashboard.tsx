import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui/Button";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, TrendingDown, DollarSign, Users, Calendar, ArrowRight } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  score: number;
  status: "red" | "amber" | "green";
  churn: string;
  mrr: string;
  lastActive: string;
  risks: string[];
}

const customers: Customer[] = [
  {
    id: "1",
    name: "Acme Corp",
    score: 32,
    status: "red",
    churn: "78%",
    mrr: "$2,400",
    lastActive: "10 days ago",
    risks: ["No login in 10 days", "3 failed payments"]
  },
  {
    id: "2",
    name: "Beta Inc",
    score: 55,
    status: "amber",
    churn: "42%",
    mrr: "$1,200",
    lastActive: "3 days ago",
    risks: ["Feature usage dropped"]
  },
  {
    id: "3",
    name: "Gamma Systems",
    score: 88,
    status: "green",
    churn: "5%",
    mrr: "$5,600",
    lastActive: "2 hours ago",
    risks: []
  }
];

export default function ChurnDashboard() {
  const [selected, setSelected] = useState<Customer>(customers[0]);

  const getColor = (status: string) => {
    if (status === "red") return "bg-red-500";
    if (status === "amber") return "bg-yellow-400";
    return "bg-neon-green";
  };

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 bg-gallery-white font-mono">
      {/* Top Metrics */}
      <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase opacity-60">NRR Retention</p>
              <h3 className="text-3xl font-display uppercase italic">91%</h3>
            </div>
            <TrendingDown className="text-red-500" />
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase opacity-60">At-Risk Users</p>
              <h3 className="text-3xl font-display uppercase italic text-red-500">24</h3>
            </div>
            <Users className="text-brutal-black" />
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase opacity-60">Revenue at Risk</p>
              <h3 className="text-3xl font-display uppercase italic text-red-500">$48K</h3>
            </div>
            <DollarSign className="text-brutal-black" />
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card className="lg:col-span-3 bg-white">
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-2xl uppercase italic">At-Risk Customers</h2>
            <div className="text-[10px] uppercase opacity-40">Live Feed // Sync Active</div>
          </div>
          
          <div className="space-y-3">
            {customers.map((c) => (
              <motion.div
                key={c.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelected(c)}
                className={`p-4 border-2 cursor-pointer transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  selected.id === c.id ? 'border-brutal-black bg-zinc-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'border-zinc-100 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full border-2 border-black ${getColor(c.status)}`} />
                  <div>
                    <div className="font-bold uppercase tracking-tight">{c.name}</div>
                    <div className="text-[10px] opacity-50 flex items-center gap-1">
                      <Calendar size={10} /> {c.lastActive}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-8 items-center w-full md:w-auto justify-between md:justify-end">
                  <div className="text-center">
                    <p className="text-[8px] uppercase opacity-40">Score</p>
                    <p className={`font-bold ${c.score < 40 ? 'text-red-500' : ''}`}>{c.score}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] uppercase opacity-40">Churn</p>
                    <p className="font-bold">{c.churn}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[8px] uppercase opacity-40">MRR</p>
                    <p className="font-bold">{c.mrr}</p>
                  </div>
                  <ArrowRight size={16} className={selected.id === c.id ? 'opacity-100' : 'opacity-0'} />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sidebar - Details */}
      <div className="space-y-4">
        <Card className="bg-brutal-black text-white">
          <CardContent className="space-y-6">
            <div>
              <h2 className="font-display text-xl uppercase italic text-neon-green mb-1">Customer Intel</h2>
              <p className="text-[10px] uppercase opacity-60">Deep Dive Analysis</p>
            </div>

            <div className="p-4 border-2 border-neon-green/30 bg-zinc-900">
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-3 h-3 rounded-full border border-white ${getColor(selected.status)}`} />
                <span className="uppercase text-xs font-bold tracking-widest">{selected.status} Alert</span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-[10px] uppercase text-neon-green mb-2 flex items-center gap-1">
                    <AlertCircle size={10} /> Risk Factors
                  </h3>
                  {selected.risks.length > 0 ? (
                    <ul className="text-[11px] space-y-2 opacity-80">
                      {selected.risks.map((r, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-neon-green">»</span> {r}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[11px] opacity-40 italic">No critical risks detected.</p>
                  )}
                </div>
              </div>
            </div>

            <Button className="w-full py-4 text-sm">
              Trigger Retention Playbook
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-neon-green">
          <CardContent>
            <p className="text-[10px] uppercase font-bold mb-2">Next Best Action</p>
            <p className="text-xs leading-tight mb-4">
              {selected.status === 'red' 
                ? "Immediate executive outreach required. Schedule emergency sync." 
                : "Monitor usage patterns. Send feature re-engagement email."}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 text-[8px] p-2">Dismiss</Button>
              <Button className="flex-1 text-[8px] p-2 bg-white">Execute</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Panel */}
      <Card className="lg:col-span-4 bg-white border-t-4 border-brutal-black">
        <CardContent className="flex flex-wrap gap-4 items-center">
          <span className="font-display text-lg uppercase italic mr-4">Global Actions:</span>
          <Button variant="outline">Send Bulk Discount</Button>
          <Button variant="outline">Schedule QBRs</Button>
          <Button variant="outline">Export Risk Report</Button>
          <div className="flex-1" />
          <Button className="bg-brutal-black text-neon-green">Deploy New Playbook</Button>
        </CardContent>
      </Card>
    </div>
  );
}
