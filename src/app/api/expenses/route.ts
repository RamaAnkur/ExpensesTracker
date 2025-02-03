import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Expense from '@/models/Expense';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }


    await connectDB();
    
    const body = await req.json();
    const { amount, category, description, type } = body;

    const expense = await Expense.create({
      userId: session.user.id,
      amount,
      category,
      description,
      type,
    });

    return NextResponse.json(expense);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating expense' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session, "session");
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(session.user.id, "session.user.id");

    await connectDB();
    console.log("Connected to DB");

    console.log("Fetching expenses", Expense);
    
    const expenses = await Expense.find({ userId: session.user.id })
      .sort({ date: -1 });

    return NextResponse.json(expenses);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching expenses' }, { status: 500 });
  }
} 