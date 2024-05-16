"use client"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const CounterpartyFilter = () => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    const initialValue = new URLSearchParams(window.location.search).get('counterparty');
    setSelectedValue(initialValue);
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    const query = value ? `?counterparty=${value}` : '';
    router.push('/Admin/adone' + query);
  };

  return (
    <select
      name="counterparty"
      defaultValue="all"
      value={selectedValue}
      onChange={handleChange}
      id="counterparty"
      className="select select-bordered w-full"
    >
      <option value="all">Filter Counterparty</option>
      {/* <option value="all">All</option> */}
      <option value="Customer">Customer</option>
      <option value="Supplier">Supplier</option>
    </select>
  );
}

export default CounterpartyFilter;
