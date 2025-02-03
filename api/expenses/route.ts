import { NextResponse } from "next/server";

const staticExpenses = [
  {
    id: 1,
    amount: 50.00,
    description: "Groceries",
    date: new Date("2024-03-20"),
    category: {
      id: 1,
      name: "Food"
    }
  },
  {
    id: 2,
    amount: 30.00,
    description: "Gas",
    date: new Date("2024-03-19"),
    category: {
      id: 2,
      name: "Transportation"
    }
  },
  {
    id: 3,
    amount: 100.00,
    description: "Electricity Bill",
    date: new Date("2024-03-18"),
    category: {
      id: 3,
      name: "Utilities"
    }
  }
];

export async function GET() {
  try {
    return NextResponse.json(staticExpenses, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    );
  }
} 