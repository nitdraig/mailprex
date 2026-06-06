"use client";

import React from "react";

const AuthDivider = ({ label = "or" }: { label?: string }) => (
  <div className="my-5 flex items-center gap-3">
    <span className="h-px flex-1 bg-secondary/15" />
    <span className="text-xs font-medium uppercase tracking-[0.14em] text-secondary/45">
      {label}
    </span>
    <span className="h-px flex-1 bg-secondary/15" />
  </div>
);

export default AuthDivider;
