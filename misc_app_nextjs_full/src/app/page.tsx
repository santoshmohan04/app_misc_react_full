'use client';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import React, { useState } from "react";
import { Card } from 'primereact/card';

export default function Home() {
  const [date, setDate] = useState(null);
  return (
    <div>
      <Card title="Simple Card">
        <div className="flex justify-content-center">
          <Button label="Check" icon="pi pi-check" className='mr-2' />
          <Calendar value={date} onChange={(e) => setDate(e.value)} />
        </div>
      </Card>
    </div>
  );
}
