'use client';
import CardView from "@/components/comp-dashboard/CardView";
import BarChart from "@/components/comp-dashboard/Chart";
import Title from "@/components/comp-title/Title";
export default function Home() {
 
  return (
    <div>
      <Title title={"Dashboard"}/>
      <CardView/>
      <BarChart/>
    </div>
  );
}
