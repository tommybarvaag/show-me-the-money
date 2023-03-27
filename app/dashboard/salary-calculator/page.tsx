import { getEdgeFriendlyToken } from "@/lib/token";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { SalaryCalculator } from "./salary-calculator";

export const runtime = "experimental-edge";

export const metadata = {
  title: "Salary calculator"
};

export default async function SalaryCalculatorPage() {
  const token = await getEdgeFriendlyToken();
  const user = await getUser(token.id);

  if (!(user?.isAdmin ?? false)) {
    return redirect("/login");
  }

  return (
    <>
      <h1>Salary calculator</h1>
      <SalaryCalculator />
    </>
  );
}
