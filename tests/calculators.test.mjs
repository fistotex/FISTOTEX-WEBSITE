// Reference checks for the money maths. Expected values match widely used
// Indian calculators (Groww, SBI, India Post) for the same inputs.
// Run: npm test  (Node >= 22.18 strips TypeScript types natively)
import { test } from "node:test";
import assert from "node:assert/strict";
import * as c from "../src/lib/calculators/index.ts";

const rupees = (x) => Math.round(x);

test("SIP: Rs 10,000/month, 12%, 10 years", () => {
  assert.equal(rupees(c.calculateSIP({ monthlyInvestment: 10000, annualReturn: 12, years: 10 }).futureValue), 2323391);
});

test("EMI: Rs 10 lakh, 10%, 20 years", () => {
  assert.equal(rupees(c.calculateEMI({ loanAmount: 1000000, interestRate: 10, tenureYears: 20 }).monthlyEMI), 9650);
});

test("FD: Rs 1 lakh, 7%, 5 years, quarterly", () => {
  assert.equal(
    rupees(c.calculateFD({ principal: 100000, interestRate: 7, tenureYears: 5, compoundingFrequency: "quarterly" }).maturityAmount),
    141478
  );
});

test("PPF: Rs 1.5 lakh/year, 7.1%, 15 years", () => {
  assert.equal(rupees(c.calculatePPF({ annualInvestment: 150000, years: 15, interestRate: 7.1 }).maturityAmount), 4068209);
});

test("CAGR: Rs 1 lakh to Rs 2 lakh in 5 years", () => {
  assert.equal(c.calculateCAGR({ initialValue: 100000, finalValue: 200000, years: 5 }).cagr.toFixed(2), "14.87");
});

test("XIRR: -1,000 then +1,100 one (leap) year later", () => {
  const r = c.calculateXIRR({ cashFlows: [{ date: "2024-01-01", amount: -1000 }, { date: "2025-01-01", amount: 1100 }] });
  assert.equal(r.xirr.toFixed(2), "9.97");
});

test("XIRR: no positive cash flow reports an error instead of a number", () => {
  const r = c.calculateXIRR({ cashFlows: [{ date: "2024-01-01", amount: -1000 }, { date: "2025-01-01", amount: -1100 }] });
  assert.equal(r.xirr, null);
});

test("zero and negative inputs return zeros, never NaN", () => {
  assert.equal(c.calculateSIP({ monthlyInvestment: 0, annualReturn: 12, years: 10 }).futureValue, 0);
  assert.equal(c.calculateEMI({ loanAmount: 100000, interestRate: 10, tenureYears: 0 }).monthlyEMI, 0);
  assert.equal(c.calculateEMI({ loanAmount: 120000, interestRate: 0, tenureYears: 1 }).monthlyEMI, 10000);
});
