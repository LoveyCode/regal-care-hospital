import { DataTable } from '@/components/table/DataTable';
import { StatCard } from '@/components/StatCard';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { columns } from '@/components/table/columns';

type AppointmentStats = {
  scheduledCount: number;
  pendingCount: number;
  cancelledCount: number;
  documents: any[];
};

const Admin = async () => {
  const appointments: AppointmentStats = await getRecentAppointmentList() ?? {
    scheduledCount: 0,
    pendingCount: 0,
    cancelledCount: 0,
    documents: [],
  };

  return (
    <div className="w-full bg-dark-300">
      <div className="mx-auto flex max-w-7xl flex-col space-y-14">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <Image
              src="/assets/icons/logo-full.svg"
              height={32}
              width={162}
              alt="logo"
              className="h-8 w-fit"
            />
          </Link>
          <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header text-zinc-100">Welcome 👋</h1>
            <p className="text-dark-700">
              Manage new appointments today
            </p>
          </section>

          <section className="admin-stat">
            <StatCard
              type="appointments"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon="/assets/icons/appointments.svg"
            />
            <StatCard
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
              icon="/assets/icons/pending.svg"
            />
            <StatCard
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
              icon="/assets/icons/cancelled.svg"
            />
          </section>

          <DataTable columns={columns} data={appointments.documents} />
        </main>
      </div>
    </div>
  );
};

export default Admin;
